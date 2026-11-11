using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Analytics;

public class DevDataSeeder
{
    private record CountryProfile(string Code, string Name, string[] Regions, string TimeZone, int Weight);

    private record ClientProfileSeed(string Browser, string Os, string? Brand, string? Model, int Width, int Height, double Ratio);

    private static readonly CountryProfile[] Countries =
    [
        new("RU", "Russia", ["Moscow", "Saint Petersburg", "Novosibirsk Oblast", "Sverdlovsk Oblast", "Tatarstan"], "Europe/Moscow", 55),
        new("US", "United States", ["California", "New York", "Texas", "Washington"], "America/New_York", 8),
        new("DE", "Germany", ["Berlin", "Bavaria", "Hesse"], "Europe/Berlin", 6),
        new("UA", "Ukraine", ["Kyiv", "Lviv Oblast"], "Europe/Kyiv", 5),
        new("BY", "Belarus", ["Minsk Region"], "Europe/Minsk", 4),
        new("KZ", "Kazakhstan", ["Almaty", "Astana"], "Asia/Almaty", 4),
        new("GB", "United Kingdom", ["England", "Scotland"], "Europe/London", 3),
        new("FR", "France", ["Ile-de-France"], "Europe/Paris", 3),
        new("NL", "Netherlands", ["North Holland"], "Europe/Amsterdam", 2),
        new("PL", "Poland", ["Masovian"], "Europe/Warsaw", 2),
    ];

    private readonly ApplicationDBContext context;

    public DevDataSeeder(ApplicationDBContext context)
    {
        this.context = context;
    }

    public async Task<int> SeedAsync(int days, CancellationToken ct)
    {
        Random rng = new(42);

        DateTime now = DateTime.UtcNow;
        DateTime today = now.Date;
        List<Visitor> pool = [];
        List<Guid> articleIds = Enumerable.Range(0, 6).Select(_ => Guid.NewGuid()).ToList();
        int created = 0;

        for (int offset = days - 1; offset >= 0; offset--)
        {
            DateTime day = today.AddDays(-offset);

            double growth = 1 + (days - offset) / (double)days;
            double weekend = day.DayOfWeek is DayOfWeek.Saturday or DayOfWeek.Sunday ? 0.7 : 1.0;
            int count = (int)Math.Round((8 + rng.Next(0, 18)) * growth * weekend);

            List<DateTime> times = [];

            for (int i = 0; i < count; i++)
            {
                int localHour = Pick(rng,
                    (0, 2), (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 2),
                    (8, 3), (9, 5), (10, 7), (11, 8), (12, 8), (13, 7), (14, 7), (15, 7),
                    (16, 7), (17, 6), (18, 6), (19, 7), (20, 8), (21, 8), (22, 6), (23, 4));

                DateTime startedAt = day
                    .AddHours(localHour - 3)
                    .AddMinutes(rng.Next(60))
                    .AddSeconds(rng.Next(60));

                if (startedAt <= now)
                {
                    times.Add(startedAt);
                }
            }

            times.Sort();

            foreach (DateTime startedAt in times)
            {
                Visitor visitor;

                if (pool.Count > 0 && rng.NextDouble() < 0.3)
                {
                    visitor = pool[rng.Next(pool.Count)];
                }
                else
                {
                    visitor = new Visitor
                    {
                        Id = Guid.NewGuid(),
                        FirstSeenAt = startedAt,
                        LastSeenAt = startedAt
                    };

                    pool.Add(visitor);
                    context.Visitors.Add(visitor);
                }

                visitor.SessionsCount++;
                visitor.LastSeenAt = startedAt;

                context.Sessions.Add(BuildSession(rng, visitor, startedAt, articleIds));
                created++;
            }

            await context.SaveChangesAsync(ct);
        }

        return created;
    }

    public async Task ClearAsync(CancellationToken ct)
    {
        await context.PageViews.ExecuteDeleteAsync(ct);
        await context.Sessions.ExecuteDeleteAsync(ct);
        await context.Visitors.ExecuteDeleteAsync(ct);
    }

    private static VisitSession BuildSession(
        Random rng,
        Visitor visitor,
        DateTime startedAt,
        List<Guid> articleIds)
    {
        CountryProfile country = Pick(rng, Countries.Select(c => (c, c.Weight)).ToArray());
        string region = country.Regions[rng.Next(country.Regions.Length)];

        string deviceType = Pick(rng, ("mobile", 58), ("desktop", 35), ("tablet", 7));
        ClientProfileSeed client = BuildClient(rng, deviceType);

        string? referrer = Pick<string?>(rng,
            (null, 45), ("t.me", 14), ("github.com", 12), ("google.com", 12),
            ("linkedin.com", 6), ("habr.com", 6), ("vk.com", 5));

        string entry = RandomPath(rng, articleIds, true);
        int pageCount = Pick(rng, (1, 40), (2, 25), (3, 18), (4, 10), (5, 7));

        VisitSession session = new()
        {
            Id = Guid.NewGuid(),
            VisitorId = visitor.Id,
            StartedAt = startedAt,
            SessionNumber = visitor.SessionsCount,
            EntryPath = entry,
            CountryCode = country.Code,
            Country = country.Name,
            Region = region,
            DeviceType = deviceType,
            DeviceBrand = client.Brand,
            DeviceModel = client.Model,
            Browser = client.Browser,
            BrowserVersion = rng.Next(118, 132).ToString(),
            Os = client.Os,
            OsVersion = rng.Next(10, 18).ToString(),
            ScreenWidth = client.Width,
            ScreenHeight = client.Height,
            ViewportWidth = client.Width,
            ViewportHeight = client.Height - rng.Next(60, 140),
            PixelRatio = client.Ratio,
            Language = country.Code == "RU"
                ? Pick(rng, ("ru-RU", 90), ("en-US", 10))
                : Pick(rng, ("en-US", 70), ("de-DE", 10), ("fr-FR", 10), ("uk-UA", 10)),
            TimeZone = country.TimeZone,
            ReferrerHost = referrer
        };

        DateTime cursor = startedAt;
        string path = entry;
        int total = 0;

        for (int i = 0; i < pageCount; i++)
        {
            int duration = rng.NextDouble() < 0.15 ? rng.Next(90, 420) : rng.Next(4, 75);

            session.PageViews.Add(new PageView
            {
                Id = Guid.NewGuid(),
                Path = path,
                ViewedAt = cursor,
                DurationSeconds = duration
            });

            total += duration;
            cursor = cursor.AddSeconds(duration);
            session.LastPath = path;
            path = RandomPath(rng, articleIds, false);
        }

        session.PageViewsCount = pageCount;
        session.TotalDurationSeconds = total;
        session.LastActivityAt = cursor;

        return session;
    }

    private static ClientProfileSeed BuildClient(Random rng, string deviceType)
    {
        if (deviceType == "mobile")
        {
            string os = Pick(rng, ("iOS", 45), ("Android", 55));

            if (os == "iOS")
            {
                (int w, int h) = Pick(rng, ((390, 844), 4), ((393, 852), 4), ((414, 896), 2));

                return new ClientProfileSeed(
                    Pick(rng, ("Mobile Safari", 75), ("Chrome Mobile iOS", 25)),
                    os, "Apple", "iPhone", w, h, 3);
            }

            (int aw, int ah) = Pick(rng, ((412, 915), 4), ((360, 800), 4), ((393, 873), 2));

            return new ClientProfileSeed(
                Pick(rng, ("Chrome Mobile", 65), ("Yandex Browser", 20), ("Samsung Internet", 15)),
                os, Pick(rng, ("Samsung", 50), ("Xiaomi", 30), ("Google", 20)), null, aw, ah, 2.75);
        }

        if (deviceType == "tablet")
        {
            (int tw, int th) = Pick(rng, ((820, 1180), 6), ((1024, 1366), 4));

            return new ClientProfileSeed("Mobile Safari", "iOS", "Apple", "iPad", tw, th, 2);
        }

        (int dw, int dh) = Pick(rng,
            ((1920, 1080), 40), ((1536, 864), 20), ((1440, 900), 15), ((2560, 1440), 15), ((1366, 768), 10));

        return new ClientProfileSeed(
            Pick(rng, ("Chrome", 60), ("Yandex Browser", 15), ("Firefox", 10), ("Edge", 10), ("Safari", 5)),
            Pick(rng, ("Windows", 62), ("Mac OS X", 28), ("Linux", 10)),
            null, null, dw, dh, 1);
    }

    private static string RandomPath(Random rng, List<Guid> articleIds, bool entry)
    {
        string path = Pick(rng, ("/", entry ? 55 : 15), ("/projects", 25), ("/articles", 25), ("/article", 20));

        return path == "/article"
            ? "/articles/" + articleIds[rng.Next(articleIds.Count)]
            : path;
    }

    private static T Pick<T>(Random rng, params (T Item, int Weight)[] options)
    {
        int roll = rng.Next(options.Sum(o => o.Weight));

        foreach ((T item, int weight) in options)
        {
            if (roll < weight)
            {
                return item;
            }

            roll -= weight;
        }

        return options[^1].Item;
    }
}