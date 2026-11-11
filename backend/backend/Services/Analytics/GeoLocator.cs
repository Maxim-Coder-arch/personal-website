using System.Globalization;
using System.Net;
using MaxMind.GeoIP2;
using MaxMind.GeoIP2.Responses;

namespace backend.Services.Analytics;

public record GeoResult(string? CountryCode, string? Country, string? Region);

public class GeoLocator : IDisposable
{
    private static readonly GeoResult Empty = new(null, null, null);

    private readonly DatabaseReader? reader;

    public GeoLocator(IConfiguration configuration, ILogger<GeoLocator> logger)
    {
        string? path = configuration["Geo:DatabasePath"];

        if (!string.IsNullOrWhiteSpace(path) && File.Exists(path))
        {
            reader = new DatabaseReader(path);
        }
        else
        {
            logger.LogWarning("GeoIP database was not found, location is taken from proxy headers only");
        }
    }

    public GeoResult Locate(HttpContext http)
    {
        IHeaderDictionary headers = http.Request.Headers;

        string? code = NormalizeCode(headers["CF-IPCountry"].ToString())
            ?? NormalizeCode(headers["X-Vercel-IP-Country"].ToString());

        if (code is not null)
        {
            string? region = FirstNonEmpty(
                headers["CF-Region"].ToString(),
                headers["X-Vercel-IP-Country-Region"].ToString());

            return new GeoResult(code, CountryName(code), region);
        }

        IPAddress? ip = http.Connection.RemoteIpAddress;

        if (reader is null || ip is null)
        {
            return Empty;
        }

        if (ip.IsIPv4MappedToIPv6)
        {
            ip = ip.MapToIPv4();
        }

        if (!reader.TryCity(ip, out CityResponse? city) || city?.Country.IsoCode is null)
        {
            return Empty;
        }

        return new GeoResult(
            city.Country.IsoCode,
            city.Country.Name,
            city.MostSpecificSubdivision.Name);
    }

    public void Dispose()
    {
        reader?.Dispose();
    }

    private static string? NormalizeCode(string value)
    {
        bool valid = value.Length == 2
            && char.IsLetter(value[0])
            && char.IsLetter(value[1])
            && !value.Equals("XX", StringComparison.OrdinalIgnoreCase);

        return valid ? value.ToUpperInvariant() : null;
    }

    private static string? CountryName(string code)
    {
        try
        {
            return new RegionInfo(code).EnglishName;
        }
        catch (ArgumentException)
        {
            return null;
        }
    }

    private static string? FirstNonEmpty(params string[] values)
    {
        return values.FirstOrDefault(value => !string.IsNullOrWhiteSpace(value));
    }
}