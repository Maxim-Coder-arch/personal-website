using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services.Auth;

public static class AdminSeeder
{
    public static async Task SeedAsync(
        ApplicationDBContext context,
        IPasswordHasher<AdminUser> hasher,
        IConfiguration configuration)
    {
        string? email = configuration["Admin:Email"];
        string? password = configuration["Admin:Password"];

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return;
        }

        string normalizedEmail = email.Trim().ToLowerInvariant();

        AdminUser? admin = await context.AdminUsers.FirstOrDefaultAsync(a => a.Email == normalizedEmail);

        if (admin is null)
        {
            admin = new AdminUser { Email = normalizedEmail };
            admin.PasswordHash = hasher.HashPassword(admin, password);

            context.AdminUsers.Add(admin);
        }
        else if (hasher.VerifyHashedPassword(admin, admin.PasswordHash, password) == PasswordVerificationResult.Failed)
        {
            admin.PasswordHash = hasher.HashPassword(admin, password);
        }

        await context.SaveChangesAsync();
    }
}