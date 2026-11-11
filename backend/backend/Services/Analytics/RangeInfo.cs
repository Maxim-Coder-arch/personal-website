namespace backend.Services.Analytics;

public record RangeInfo(
    DateOnly From,
    DateOnly To,
    DateTime FromUtc,
    DateTime ToUtc,
    TimeZoneInfo TimeZone);