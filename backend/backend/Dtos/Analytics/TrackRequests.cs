using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Analytics;

public class TrackPageViewRequest
{
    public Guid VisitorId { get; set; }
    public Guid? SessionId { get; set; }

    [Required, StringLength(300)]
    public string Path { get; set; } = "/";

    [StringLength(2048)] public string? Referrer { get; set; }
    [StringLength(128)] public string? UtmSource { get; set; }

    [Range(0, 20000)] public int? ScreenWidth { get; set; }
    [Range(0, 20000)] public int? ScreenHeight { get; set; }
    [Range(0, 20000)] public int? ViewportWidth { get; set; }
    [Range(0, 20000)] public int? ViewportHeight { get; set; }
    [Range(0, 10)] public double? PixelRatio { get; set; }
    [Range(0, 100)] public int? MaxTouchPoints { get; set; }

    [StringLength(32)] public string? Language { get; set; }
    [StringLength(64)] public string? TimeZone { get; set; }
}

public record TrackPageViewResponse(Guid SessionId, Guid PageViewId);

public class TrackDurationRequest
{
    public Guid PageViewId { get; set; }

    [Range(0, 86400)]
    public int Seconds { get; set; }
}