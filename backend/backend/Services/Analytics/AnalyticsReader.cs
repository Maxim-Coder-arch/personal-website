using System.Globalization;
using backend.Data;
using backend.Dtos.Analytics;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Analytics;

public class AnalyticsReader
{
    private const int MaxRangeDays = 3660;
    private const string Unknown = "Unknown";

    private static readonly HashSet<string> Intervals = ["hour", "day", "week", "month", "year"];

    private static readonly string[] Weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    public static readonly HashSet<string> BreakdownKeys =
    [
        "country", "region", "device", "browser", "os", "screen",
        "language", "referrer", "entry", "hour", "weekday"
    ];

    private readonly ApplicationDBContext context;
    private readonly IConfiguration configuration;

    public AnalyticsReader(ApplicationDBContext context, IConfiguration configuration)
    {
        this.context = context;
        this.configuration = configuration;
    }

    public bool TryResolveRange(
        DateOnly? from,
        DateOnly? to,
        string? timeZone,
        out RangeInfo range,
        out string error)
    {
        range = default!;
        error = string.Empty;

        string zoneId = string.IsNullOrWhiteSpace(timeZone)
            ? configuration["Analytics:TimeZone"] ?? "UTC"
            : timeZone;

        TimeZoneInfo zone;

        try
        {
            zone = TimeZoneInfo.FindSystemTimeZoneById(zoneId);
        }
        catch (Exception ex) when (ex is TimeZoneNotFoundException or InvalidTimeZoneException)
        {
            error = "Unknown time zone";
            return false;
        }

        DateOnly today = DateOnly.FromDateTime(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, zone));
        DateOnly end = to ?? today;
        DateOnly start = from ?? end.AddDays(-29);

        if (end < start)
        {
            error = "'to' must not be earlier than 'from'";
            return false;
        }

        if (end.DayNumber - start.DayNumber >= MaxRangeDays)
        {
            error = "Range is too large";
            return false;
        }

        DateTime fromUtc = TimeZoneInfo.ConvertTimeToUtc(start.ToDateTime(TimeOnly.MinValue), zone);
        DateTime toUtc = TimeZoneInfo.ConvertTimeToUtc(end.AddDays(1).ToDateTime(TimeOnly.MinValue), zone);

        range = new RangeInfo(start, end, fromUtc, toUtc, zone);

        return true;
    }

    public async Task<SummaryResponse> GetSummaryAsync(RangeInfo range, CancellationToken ct)
    {
        List<SessionRow> currentRows = await LoadRowsAsync(range.FromUtc, range.ToUtc, ct);

        TimeSpan length = range.ToUtc - range.FromUtc;
        DateTime previousFrom = range.FromUtc - length;

        List<SessionRow> previousRows = await LoadRowsAsync(previousFrom, range.FromUtc, ct);

        return new SummaryResponse(
            range.From,
            range.To,
            range.TimeZone.Id,
            ComputeMetrics(currentRows, range.FromUtc),
            ComputeMetrics(previousRows, previousFrom));
    }

    public async Task<TimeseriesResponse> GetTimeseriesAsync(
        RangeInfo range,
        string? interval,
        CancellationToken ct)
    {
        string resolved = ResolveInterval(range, interval);
        TimeZoneInfo zone = range.TimeZone;

        List<SessionRow> rows = await LoadRowsAsync(range.FromUtc, range.ToUtc, ct);

        Dictionary<DateTime, List<SessionRow>> grouped = rows
            .GroupBy(r => Floor(ToLocal(r.StartedAt, zone), resolved))
            .ToDictionary(g => g.Key, g => g.ToList());

        DateTime cursor = Floor(ToLocal(range.FromUtc, zone), resolved);
        DateTime end = ToLocal(range.ToUtc, zone);

        List<TimeseriesPoint> points = [];

        while (cursor < end)
        {
            DateTime bucketStart = cursor;

            grouped.TryGetValue(bucketStart, out List<SessionRow>? bucket);
            bucket ??= [];

            int visitors = bucket.Select(r => r.VisitorId).Distinct().Count();

            int newVisitors = bucket
                .Where(r => Floor(ToLocal(r.VisitorFirstSeenAt, zone), resolved) == bucketStart)
                .Select(r => r.VisitorId)
                .Distinct()
                .Count();

            double avgDuration = bucket.Count == 0
                ? 0
                : bucket.Average(r => (double)r.TotalDurationSeconds);

            points.Add(new TimeseriesPoint(
                TimeZoneInfo.ConvertTimeToUtc(bucketStart, zone),
                Label(bucketStart, resolved),
                visitors,
                newVisitors,
                visitors - newVisitors,
                bucket.Count,
                bucket.Sum(r => r.PageViewsCount),
                Math.Round(avgDuration, 1)));

            cursor = Next(cursor, resolved);
        }

        return new TimeseriesResponse(resolved, zone.Id, points);
    }

    public async Task<List<BreakdownItem>> GetBreakdownAsync(
        RangeInfo range,
        string by,
        int limit,
        CancellationToken ct)
    {
        List<SessionRow> rows = await LoadRowsAsync(range.FromUtc, range.ToUtc, ct);
        int total = rows.Count;

        IEnumerable<BreakdownItem> items = rows
            .GroupBy(r => KeyOf(r, by, range.TimeZone))
            .Select(g => new BreakdownItem(
                g.Key,
                g.Count(),
                g.Select(r => r.VisitorId).Distinct().Count(),
                total == 0 ? 0 : Math.Round((double)g.Count() / total, 4)));

        items = by switch
        {
            "hour" => items.OrderBy(i => i.Key, StringComparer.Ordinal),
            "weekday" => items.OrderBy(i => Array.IndexOf(Weekdays, i.Key)),
            _ => items
                .OrderByDescending(i => i.Sessions)
                .ThenBy(i => i.Key, StringComparer.Ordinal)
                .Take(limit),
        };

        return items.ToList();
    }

    public async Task<List<PageStat>> GetPagesAsync(RangeInfo range, int limit, CancellationToken ct)
    {
        var rows = await context.PageViews
            .AsNoTracking()
            .Where(p => p.ViewedAt >= range.FromUtc && p.ViewedAt < range.ToUtc)
            .Select(p => new { p.Path, p.SessionId, p.DurationSeconds })
            .ToListAsync(ct);

        return rows
            .GroupBy(r => r.Path)
            .Select(g => new PageStat(
                g.Key,
                g.Count(),
                g.Select(r => r.SessionId).Distinct().Count(),
                Math.Round(g.Average(r => (double)r.DurationSeconds), 1)))
            .OrderByDescending(p => p.Views)
            .Take(limit)
            .ToList();
    }

    public async Task<SessionListResponse> GetSessionsAsync(
        RangeInfo range,
        int page,
        int pageSize,
        CancellationToken ct)
    {
        IQueryable<VisitSession> query = context.Sessions
            .AsNoTracking()
            .Where(s => s.StartedAt >= range.FromUtc && s.StartedAt < range.ToUtc);

        int total = await query.CountAsync(ct);

        List<SessionListItem> items = await query
            .OrderByDescending(s => s.StartedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(s => new SessionListItem(
                s.Id,
                s.VisitorId,
                s.StartedAt,
                s.SessionNumber,
                s.SessionNumber > 1,
                s.PageViewsCount,
                s.TotalDurationSeconds,
                s.EntryPath,
                s.Country,
                s.CountryCode,
                s.Region,
                s.DeviceType,
                s.DeviceBrand,
                s.DeviceModel,
                s.Browser,
                s.BrowserVersion,
                s.Os,
                s.OsVersion,
                s.ScreenWidth,
                s.ScreenHeight,
                s.ViewportWidth,
                s.ViewportHeight,
                s.PixelRatio,
                s.Language,
                s.TimeZone,
                s.ReferrerHost,
                s.UtmSource))
            .ToListAsync(ct);

        return new SessionListResponse(total, page, pageSize, items);
    }

    public async Task<RealtimeResponse> GetRealtimeAsync(CancellationToken ct)
    {
        DateTime threshold = DateTime.UtcNow.AddMinutes(-5);

        var active = await context.Sessions
            .AsNoTracking()
            .Where(s => s.LastActivityAt >= threshold)
            .Select(s => new { s.VisitorId, s.LastPath })
            .ToListAsync(ct);

        List<RealtimePage> pages = active
            .GroupBy(a => a.LastPath)
            .Select(g => new RealtimePage(g.Key, g.Select(a => a.VisitorId).Distinct().Count()))
            .OrderByDescending(p => p.Visitors)
            .ToList();

        return new RealtimeResponse(active.Select(a => a.VisitorId).Distinct().Count(), pages);
    }

    private async Task<List<SessionRow>> LoadRowsAsync(DateTime fromUtc, DateTime toUtc, CancellationToken ct)
    {
        return await context.Sessions
            .AsNoTracking()
            .Where(s => s.StartedAt >= fromUtc && s.StartedAt < toUtc)
            .Select(s => new SessionRow
            {
                VisitorId = s.VisitorId,
                StartedAt = s.StartedAt,
                VisitorFirstSeenAt = s.Visitor.FirstSeenAt,
                PageViewsCount = s.PageViewsCount,
                TotalDurationSeconds = s.TotalDurationSeconds,
                Country = s.Country,
                Region = s.Region,
                DeviceType = s.DeviceType,
                Browser = s.Browser,
                Os = s.Os,
                ScreenWidth = s.ScreenWidth,
                ScreenHeight = s.ScreenHeight,
                Language = s.Language,
                ReferrerHost = s.ReferrerHost,
                EntryPath = s.EntryPath
            })
            .ToListAsync(ct);
    }

    private static SummaryMetrics ComputeMetrics(List<SessionRow> rows, DateTime fromUtc)
    {
        int sessions = rows.Count;
        int visitors = rows.Select(r => r.VisitorId).Distinct().Count();

        int newVisitors = rows
            .Where(r => r.VisitorFirstSeenAt >= fromUtc)
            .Select(r => r.VisitorId)
            .Distinct()
            .Count();

        int pageViews = rows.Sum(r => r.PageViewsCount);

        double avgSession = sessions == 0 ? 0 : rows.Average(r => (double)r.TotalDurationSeconds);
        double bounce = sessions == 0 ? 0 : (double)rows.Count(r => r.PageViewsCount <= 1) / sessions;
        double perSession = sessions == 0 ? 0 : (double)pageViews / sessions;

        return new SummaryMetrics(
            visitors,
            newVisitors,
            visitors - newVisitors,
            sessions,
            pageViews,
            Math.Round(perSession, 2),
            Math.Round(avgSession, 1),
            Math.Round(bounce, 4));
    }

    private static string KeyOf(SessionRow row, string by, TimeZoneInfo zone)
    {
        return by switch
        {
            "country" => row.Country ?? Unknown,
            "region" => row.Region is null
                ? Unknown
                : row.Country is null ? row.Region : $"{row.Region}, {row.Country}",
            "device" => row.DeviceType,
            "browser" => row.Browser,
            "os" => row.Os,
            "screen" => row.ScreenWidth is null || row.ScreenHeight is null
                ? Unknown
                : $"{row.ScreenWidth}x{row.ScreenHeight}",
            "language" => row.Language ?? Unknown,
            "referrer" => row.ReferrerHost ?? "direct",
            "entry" => row.EntryPath,
            "hour" => ToLocal(row.StartedAt, zone).Hour.ToString("00", CultureInfo.InvariantCulture),
            "weekday" => Weekdays[((int)ToLocal(row.StartedAt, zone).DayOfWeek + 6) % 7],
            _ => Unknown,
        };
    }

    private static string ResolveInterval(RangeInfo range, string? interval)
    {
        int days = range.To.DayNumber - range.From.DayNumber + 1;

        if (interval is not null && Intervals.Contains(interval))
        {
            return interval == "hour" && days > 31 ? "day" : interval;
        }

        if (days <= 2) return "hour";
        if (days <= 92) return "day";
        if (days <= 800) return "month";

        return "year";
    }

    private static DateTime ToLocal(DateTime utc, TimeZoneInfo zone)
    {
        return TimeZoneInfo.ConvertTimeFromUtc(DateTime.SpecifyKind(utc, DateTimeKind.Utc), zone);
    }

    private static DateTime Floor(DateTime local, string interval)
    {
        return interval switch
        {
            "hour" => new DateTime(local.Year, local.Month, local.Day, local.Hour, 0, 0),
            "week" => local.Date.AddDays(-(((int)local.DayOfWeek + 6) % 7)),
            "month" => new DateTime(local.Year, local.Month, 1),
            "year" => new DateTime(local.Year, 1, 1),
            _ => local.Date,
        };
    }

    private static DateTime Next(DateTime bucket, string interval)
    {
        return interval switch
        {
            "hour" => bucket.AddHours(1),
            "week" => bucket.AddDays(7),
            "month" => bucket.AddMonths(1),
            "year" => bucket.AddYears(1),
            _ => bucket.AddDays(1),
        };
    }

    private static string Label(DateTime bucket, string interval)
    {
        return interval switch
        {
            "hour" => bucket.ToString("yyyy-MM-dd'T'HH:00", CultureInfo.InvariantCulture),
            "month" => bucket.ToString("yyyy-MM", CultureInfo.InvariantCulture),
            "year" => bucket.ToString("yyyy", CultureInfo.InvariantCulture),
            _ => bucket.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
        };
    }

    private sealed class SessionRow
    {
        public Guid VisitorId { get; set; }
        public DateTime StartedAt { get; set; }
        public DateTime VisitorFirstSeenAt { get; set; }
        public int PageViewsCount { get; set; }
        public int TotalDurationSeconds { get; set; }
        public string? Country { get; set; }
        public string? Region { get; set; }
        public string DeviceType { get; set; } = string.Empty;
        public string Browser { get; set; } = string.Empty;
        public string Os { get; set; } = string.Empty;
        public int? ScreenWidth { get; set; }
        public int? ScreenHeight { get; set; }
        public string? Language { get; set; }
        public string? ReferrerHost { get; set; }
        public string EntryPath { get; set; } = string.Empty;
    }
}