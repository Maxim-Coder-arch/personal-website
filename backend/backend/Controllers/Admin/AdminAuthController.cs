using System.Security.Claims;
using backend.Data;
using backend.Dtos.Admin;
using backend.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers.Admin;

[ApiController]
[Route("api/admin/auth")]
public class AdminAuthController : ControllerBase
{
    private static readonly AdminUser DummyUser = new();

    private static readonly string DummyHash =
        new PasswordHasher<AdminUser>().HashPassword(DummyUser, "timing-equalizer");

    private readonly ApplicationDBContext context;
    private readonly IPasswordHasher<AdminUser> hasher;

    public AdminAuthController(ApplicationDBContext context, IPasswordHasher<AdminUser> hasher)
    {
        this.context = context;
        this.hasher = hasher;
    }

    [HttpPost("login")]
    [AllowAnonymous]
    [EnableRateLimiting("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        string email = request.Email.Trim().ToLowerInvariant();

        AdminUser? admin = await context.AdminUsers.FirstOrDefaultAsync(a => a.Email == email);

        PasswordVerificationResult result = hasher.VerifyHashedPassword(
            admin ?? DummyUser,
            admin?.PasswordHash ?? DummyHash,
            request.Password);

        if (admin is null || result == PasswordVerificationResult.Failed)
        {
            return Unauthorized(new { message = "Неверная почта или пароль" });
        }

        if (result == PasswordVerificationResult.SuccessRehashNeeded)
        {
            admin.PasswordHash = hasher.HashPassword(admin, request.Password);
        }

        admin.LastLoginAt = DateTime.UtcNow;

        await context.SaveChangesAsync();

        ClaimsIdentity identity = new(
            [
                new Claim(ClaimTypes.NameIdentifier, admin.Id.ToString()),
                new Claim(ClaimTypes.Email, admin.Email)
            ],
            CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(identity),
            new AuthenticationProperties { IsPersistent = true, AllowRefresh = true });

        return Ok(new AdminMeResponse(admin.Email));
    }

    [HttpPost("logout")]
    [AllowAnonymous]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

        return NoContent();
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me()
    {
        return Ok(new AdminMeResponse(User.FindFirstValue(ClaimTypes.Email) ?? string.Empty));
    }
}