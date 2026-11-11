using System.ComponentModel.DataAnnotations;

namespace backend.Models;

public class VisitSession
{
    public Guid Id { get; set; }
    public Guid VisitorId { get; set; }
    public Visitor Visitor { get; set; } = null!;

    public DateTime StartedAt { get; set; }
    public DateTime LastActivityAt { get; set; }
    public int SessionNumber { get; set; }
    public int PageViewsCount { get; set; }
    public int TotalDurationSeconds { get; set; }

    [MaxLength(300)] public string EntryPath { get; set; } = "/";
    [MaxLength(300)] public string LastPath { get; set; } = "/";

    [MaxLength(2)] public string? CountryCode { get; set; }
    [MaxLength(100)] public string? Country { get; set; }
    [MaxLength(128)] public string? Region { get; set; }

    [MaxLength(16)] public string DeviceType { get; set; } = "desktop";
    [MaxLength(64)] public string? DeviceBrand { get; set; }
    [MaxLength(64)] public string? DeviceModel { get; set; }
    [MaxLength(64)] public string Browser { get; set; } = "Unknown";
    [MaxLength(32)] public string? BrowserVersion { get; set; }
    [MaxLength(64)] public string Os { get; set; } = "Unknown";
    [MaxLength(32)] public string? OsVersion { get; set; }

    public int? ScreenWidth { get; set; }
    public int? ScreenHeight { get; set; }
    public int? ViewportWidth { get; set; }
    public int? ViewportHeight { get; set; }
    public double? PixelRatio { get; set; }

    [MaxLength(32)] public string? Language { get; set; }
    [MaxLength(64)] public string? TimeZone { get; set; }
    [MaxLength(256)] public string? ReferrerHost { get; set; }
    [MaxLength(128)] public string? UtmSource { get; set; }

    public List<PageView> PageViews { get; set; } = [];
}