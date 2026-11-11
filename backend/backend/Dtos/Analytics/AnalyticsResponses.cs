namespace backend.Dtos.Analytics;

public record SummaryMetrics(
    int Visitors,
    int NewVisitors,
    int ReturningVisitors,
    int Sessions,
    int PageViews,
    double PageViewsPerSession,
    double AvgSessionSeconds,
    double BounceRate);

public record SummaryResponse(
    DateOnly From,
    DateOnly To,
    string TimeZone,
    SummaryMetrics Current,
    SummaryMetrics Previous);

public record TimeseriesPoint(
    DateTime Start,
    string Label,
    int Visitors,
    int NewVisitors,
    int ReturningVisitors,
    int Sessions,
    int PageViews,
    double AvgSessionSeconds);

public record TimeseriesResponse(string Interval, string TimeZone, List<TimeseriesPoint> Points);

public record BreakdownItem(string Key, int Sessions, int Visitors, double Share);

public record PageStat(string Path, int Views, int Sessions, double AvgSeconds);

public record SessionListItem(
    Guid Id,
    Guid VisitorId,
    DateTime StartedAt,
    int SessionNumber,
    bool IsReturning,
    int PageViewsCount,
    int DurationSeconds,
    string EntryPath,
    string? Country,
    string? CountryCode,
    string? Region,
    string DeviceType,
    string? DeviceBrand,
    string? DeviceModel,
    string Browser,
    string? BrowserVersion,
    string Os,
    string? OsVersion,
    int? ScreenWidth,
    int? ScreenHeight,
    int? ViewportWidth,
    int? ViewportHeight,
    double? PixelRatio,
    string? Language,
    string? TimeZone,
    string? ReferrerHost,
    string? UtmSource);

public record SessionListResponse(int Total, int Page, int PageSize, List<SessionListItem> Items);

public record RealtimePage(string Path, int Visitors);

public record RealtimeResponse(int ActiveVisitors, List<RealtimePage> Pages);