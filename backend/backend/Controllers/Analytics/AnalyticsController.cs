using backend.Dtos.Analytics;
using backend.Services.Analytics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace backend.Controllers.Analytics;

[ApiController]
[AllowAnonymous]
[EnableRateLimiting("analytics")]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly AnalyticsCollector collector;

    public AnalyticsController(AnalyticsCollector collector)
    {
        this.collector = collector;
    }

    [HttpPost("pageview")]
    public async Task<IActionResult> TrackPageView(
        [FromBody] TrackPageViewRequest request,
        CancellationToken ct)
    {
        if (User.Identity?.IsAuthenticated == true)
        {
            return NoContent();
        }

        TrackPageViewResponse? result = await collector.TrackPageViewAsync(request, HttpContext, ct);

        return result is null ? NoContent() : Ok(result);
    }

    [HttpPost("duration")]
    public async Task<IActionResult> TrackDuration(
        [FromBody] TrackDurationRequest request,
        CancellationToken ct)
    {
        await collector.TrackDurationAsync(request, ct);

        return NoContent();
    }
}