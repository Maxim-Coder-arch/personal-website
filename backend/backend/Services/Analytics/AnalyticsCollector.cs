using backend.Data;
using backend.Dtos.Analytics;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Analytics;

public class AnalyticsCollector
{
    private const int MaxPageSeconds = 4 * 60 * 60;

    private readonly ApplicationDBContext context;
    private readonly GeoLocator geoLocator;
    private readonly TimeSpan sessionTimeout;

    public AnalyticsCollector(
        ApplicationDBContext context,
        GeoLocator geoLocator,
        IConfiguration configuration)
    {
        this.context = context;
        this.geoLocator = geoLocator;

        sessionTimeout = TimeSpan.FromMinutes(
            configuration.GetValue("Analytics:SessionTimeoutMinutes", 30));
    }

    public async Task<TrackPageViewResponse?> TrackPageViewAsync(
        TrackPageViewRequest request,
        HttpContext http,
        CancellationToken ct)
    {
        string userAgent = http.Request.Headers.UserAgent.ToString();

        if (request.VisitorId == Guid.Empty || UserAgentClassifier.IsBot(userAgent))
        {
            return null;
        }

        string path = NormalizePath(request.Path);

        if (path.StartsWith("/admin", StringComparison.OrdinalIgnoreCase))
        {
            return null;
        }

        DateTime now = DateTime.UtcNow;

        await context.Database.ExecuteSqlInterpolatedAsync(
            $"""
            INSERT INTO "Visitors" ("Id", "FirstSeenAt", "LastSeenAt", "SessionsCount")
            VALUES ({request.VisitorId}, {now}, {now}, 0)
            ON CONFLICT ("Id") DO NOTHING
            """,
            ct);

        Visitor visitor = await context.Visitors.FirstAsync(v => v.Id == request.VisitorId, ct);

        visitor.LastSeenAt = now;

        VisitSession? session = null;

        if (request.SessionId is Guid sessionId)
        {
            DateTime threshold = now - sessionTimeout;

            session = await context.Sessions.FirstOrDefaultAsync(
                s => s.Id == sessionId
                    && s.VisitorId == visitor.Id
                    && s.LastActivityAt >= threshold,
                ct);
        }

        if (session is null)
        {
            session = CreateSession(request, http, userAgent, visitor, path, now);

            context.Sessions.Add(session);
        }

        session.LastActivityAt = now;
        session.LastPath = path;
        session.PageViewsCount++;

        PageView pageView = new()
        {
            Id = Guid.NewGuid(),
            SessionId = session.Id,
            Path = path,
            ViewedAt = now
        };

        context.PageViews.Add(pageView);

        await context.SaveChangesAsync(ct);

        return new TrackPageViewResponse(session.Id, pageView.Id);
    }

    public async Task TrackDurationAsync(TrackDurationRequest request, CancellationToken ct)
    {
        int seconds = Math.Clamp(request.Seconds, 0, MaxPageSeconds);

        PageView? pageView = await context.PageViews
            .Include(p => p.Session)
            .FirstOrDefaultAsync(p => p.Id == request.PageViewId, ct);

        if (pageView is null || seconds <= pageView.DurationSeconds)
        {
            return;
        }

        int delta = seconds - pageView.DurationSeconds;

        pageView.DurationSeconds = seconds;
        pageView.Session.TotalDurationSeconds += delta;
        pageView.Session.LastActivityAt = DateTime.UtcNow;

        await context.SaveChangesAsync(ct);
    }

    private VisitSession CreateSession(
        TrackPageViewRequest request,
        HttpContext http,
        string userAgent,
        Visitor visitor,
        string path,
        DateTime now)
    {
        GeoResult geo = geoLocator.Locate(http);
        ClientProfile client = UserAgentClassifier.Classify(userAgent, request.MaxTouchPoints);

        visitor.SessionsCount++;

        return new VisitSession
        {
            Id = Guid.NewGuid(),
            VisitorId = visitor.Id,
            StartedAt = now,
            LastActivityAt = now,
            SessionNumber = visitor.SessionsCount,
            EntryPath = path,
            LastPath = path,
            CountryCode = geo.CountryCode,
            Country = Limit(geo.Country, 100),
            Region = Limit(geo.Region, 128),
            DeviceType = client.DeviceType,
            DeviceBrand = Limit(client.DeviceBrand, 64),
            DeviceModel = Limit(client.DeviceModel, 64),
            Browser = Limit(client.Browser, 64) ?? "Unknown",
            BrowserVersion = Limit(client.BrowserVersion, 32),
            Os = Limit(client.Os, 64) ?? "Unknown",
            OsVersion = Limit(client.OsVersion, 32),
            ScreenWidth = Dimension(request.ScreenWidth),
            ScreenHeight = Dimension(request.ScreenHeight),
            ViewportWidth = Dimension(request.ViewportWidth),
            ViewportHeight = Dimension(request.ViewportHeight),
            PixelRatio = request.PixelRatio is > 0 and <= 10 ? Math.Round(request.PixelRatio.Value, 2) : null,
            Language = Limit(request.Language, 32),
            TimeZone = Limit(request.TimeZone, 64),
            ReferrerHost = Limit(ExtractHost(request.Referrer), 256),
            UtmSource = Limit(request.UtmSource, 128)
        };
    }

    private static string NormalizePath(string? path)
    {
        if (string.IsNullOrWhiteSpace(path))
        {
            return "/";
        }

        string result = path.Trim();

        int cut = result.IndexOfAny(['?', '#']);

        if (cut >= 0)
        {
            result = result[..cut];
        }

        if (!result.StartsWith('/'))
        {
            result = "/" + result;
        }

        if (result.Length > 1)
        {
            result = result.TrimEnd('/');
        }

        return result.Length > 300 ? result[..300] : result;
    }

    private static string? ExtractHost(string? referrer)
    {
        bool valid = Uri.TryCreate(referrer, UriKind.Absolute, out Uri? uri)
            && (uri.Scheme == Uri.UriSchemeHttp || uri.Scheme == Uri.UriSchemeHttps);

        return valid ? uri!.Host.ToLowerInvariant() : null;
    }

    private static int? Dimension(int? value)
    {
        return value is > 0 and <= 20000 ? value : null;
    }

    private static string? Limit(string? value, int max)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Length > max ? value[..max] : value;
    }
}