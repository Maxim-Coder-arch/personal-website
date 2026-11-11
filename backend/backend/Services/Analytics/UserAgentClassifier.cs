using System.Text.RegularExpressions;
using UAParser;

namespace backend.Services.Analytics;

public record ClientProfile(
    string DeviceType,
    string? DeviceBrand,
    string? DeviceModel,
    string Browser,
    string? BrowserVersion,
    string Os,
    string? OsVersion);

public static class UserAgentClassifier
{
    private const string Unknown = "Unknown";

    private static readonly Parser uaParser = Parser.GetDefault();

    private static readonly Regex BotPattern = new(
        "bot|crawl|spider|slurp|headless|lighthouse|pingdom|curl|wget|python-requests|facebookexternalhit",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    private static readonly Regex TabletPattern = new(
        "iPad|Tablet|PlayBook|Silk|Android(?!.*Mobile)",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    private static readonly Regex MobilePattern = new(
        "Mobi|iPhone|iPod|Windows Phone|Android",
        RegexOptions.IgnoreCase | RegexOptions.Compiled);

    public static bool IsBot(string userAgent)
    {
        return string.IsNullOrWhiteSpace(userAgent) || BotPattern.IsMatch(userAgent);
    }

    public static ClientProfile Classify(string userAgent, int? maxTouchPoints)
    {
        ClientInfo info = uaParser.Parse(userAgent);

        string os = Clean(info.OS.Family) ?? Unknown;

        return new ClientProfile(
            DetectDeviceType(userAgent, os, maxTouchPoints),
            Clean(info.Device.Brand),
            Clean(info.Device.Model),
            Clean(info.UA.Family) ?? Unknown,
            Clean(info.UA.Major),
            os,
            Clean(info.OS.Major));
    }

    private static string DetectDeviceType(string userAgent, string os, int? maxTouchPoints)
    {
        if (TabletPattern.IsMatch(userAgent))
        {
            return "tablet";
        }

        if (os == "Mac OS X" && maxTouchPoints > 1)
        {
            return "tablet";
        }

        return MobilePattern.IsMatch(userAgent) ? "mobile" : "desktop";
    }

    private static string? Clean(string? value)
    {
        if (string.IsNullOrWhiteSpace(value) || value == "Other")
        {
            return null;
        }

        return value.Length > 64 ? value[..64] : value;
    }
}