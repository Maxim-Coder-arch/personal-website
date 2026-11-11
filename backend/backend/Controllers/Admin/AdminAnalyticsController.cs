using backend.Services.Analytics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.Admin;

[ApiController]
[Authorize]
[Route("api/admin/analytics")]
public class AdminAnalyticsController : ControllerBase
{
    private readonly AnalyticsReader reader;

    public AdminAnalyticsController(AnalyticsReader reader)
    {
        this.reader = reader;
    }

    [HttpGet("summary")]
    public async Task<IActionResult> GetSummary(
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        [FromQuery] string? tz,
        CancellationToken ct)
    {
        if (!reader.TryResolveRange(from, to, tz, out RangeInfo range, out string error))
        {
            return BadRequest(new { message = error });
        }

        return Ok(await reader.GetSummaryAsync(range, ct));
    }

    [HttpGet("timeseries")]
    public async Task<IActionResult> GetTimeseries(
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        [FromQuery] string? tz,
        [FromQuery] string? interval,
        CancellationToken ct)
    {
        if (!reader.TryResolveRange(from, to, tz, out RangeInfo range, out string error))
        {
            return BadRequest(new { message = error });
        }

        return Ok(await reader.GetTimeseriesAsync(range, interval, ct));
    }

    [HttpGet("breakdown")]
    public async Task<IActionResult> GetBreakdown(
        [FromQuery] string by,
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        [FromQuery] string? tz,
        [FromQuery] int limit = 10,
        CancellationToken ct = default)
    {
        if (!AnalyticsReader.BreakdownKeys.Contains(by))
        {
            return BadRequest(new { message = "Unknown breakdown key" });
        }

        if (!reader.TryResolveRange(from, to, tz, out RangeInfo range, out string error))
        {
            return BadRequest(new { message = error });
        }

        return Ok(await reader.GetBreakdownAsync(range, by, Math.Clamp(limit, 1, 100), ct));
    }

    [HttpGet("pages")]
    public async Task<IActionResult> GetPages(
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        [FromQuery] string? tz,
        [FromQuery] int limit = 20,
        CancellationToken ct = default)
    {
        if (!reader.TryResolveRange(from, to, tz, out RangeInfo range, out string error))
        {
            return BadRequest(new { message = error });
        }

        return Ok(await reader.GetPagesAsync(range, Math.Clamp(limit, 1, 100), ct));
    }

    [HttpGet("sessions")]
    public async Task<IActionResult> GetSessions(
        [FromQuery] DateOnly? from,
        [FromQuery] DateOnly? to,
        [FromQuery] string? tz,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 50,
        CancellationToken ct = default)
    {
        if (!reader.TryResolveRange(from, to, tz, out RangeInfo range, out string error))
        {
            return BadRequest(new { message = error });
        }

        return Ok(await reader.GetSessionsAsync(
            range,
            Math.Max(page, 1),
            Math.Clamp(pageSize, 1, 200),
            ct));
    }

    [HttpGet("realtime")]
    public async Task<IActionResult> GetRealtime(CancellationToken ct)
    {
        return Ok(await reader.GetRealtimeAsync(ct));
    }
}