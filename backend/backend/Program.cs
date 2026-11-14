using System.Net;
using System.Threading.RateLimiting;
using backend.Data;
using backend.Models;
using backend.Services.Analytics;
using backend.Services.Auth;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

if (string.IsNullOrWhiteSpace(connectionString))
{
    throw new InvalidOperationException(
        "ConnectionStrings:DefaultConnection is not configured. " +
        "Set the ConnectionStrings__DefaultConnection environment variable.");
}

builder.Services.AddControllers();
builder.Services.AddHealthChecks();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<ApplicationDBContext>(options =>
{
    options.UseNpgsql(connectionString);
});

string[] corsOrigins = ReadList(builder.Configuration, "Cors:Origins");

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins(corsOrigins)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

bool proxyTrustAll = builder.Configuration.GetValue("Proxy:TrustAll", false);
string[] knownProxies = ReadList(builder.Configuration, "Proxy:KnownProxies");
string[] knownNetworks = ReadList(builder.Configuration, "Proxy:KnownNetworks");
int? forwardLimit = builder.Configuration.GetValue<int?>("Proxy:ForwardLimit") ?? 1;

builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.ForwardLimit = forwardLimit > 0 ? forwardLimit : 1;

    foreach (string proxy in knownProxies)
    {
        options.KnownProxies.Add(IPAddress.Parse(proxy));
    }

    foreach (string network in knownNetworks)
    {
        options.KnownIPNetworks.Add(System.Net.IPNetwork.Parse(network));
    }

    if (proxyTrustAll)
    {
        options.KnownIPNetworks.Clear();
        options.KnownProxies.Clear();
    }
});

builder.Services.AddScoped<DevDataSeeder>();

string? keysPath = builder.Configuration["DataProtection:KeysPath"];
string? keysStorage = builder.Configuration["DataProtection:Storage"];

if (string.IsNullOrWhiteSpace(keysStorage) && !string.IsNullOrWhiteSpace(keysPath))
{
    keysStorage = "FileSystem";
}

IDataProtectionBuilder dataProtection = builder.Services
    .AddDataProtection()
    .SetApplicationName("personal-website");

if (string.Equals(keysStorage, "Database", StringComparison.OrdinalIgnoreCase))
{
    dataProtection.PersistKeysToDbContext<ApplicationDBContext>();
}
else if (string.Equals(keysStorage, "FileSystem", StringComparison.OrdinalIgnoreCase))
{
    if (string.IsNullOrWhiteSpace(keysPath))
    {
        throw new InvalidOperationException(
            "DataProtection:Storage=FileSystem requires DataProtection:KeysPath.");
    }

    dataProtection.PersistKeysToFileSystem(new DirectoryInfo(keysPath));
}
else if (!string.IsNullOrWhiteSpace(keysStorage))
{
    throw new InvalidOperationException(
        $"Unknown DataProtection:Storage value '{keysStorage}'. Use 'Database' or 'FileSystem'.");
}
else if (!builder.Environment.IsDevelopment())
{
    throw new InvalidOperationException(
        "Data Protection keys storage is not configured. " +
        "Set DataProtection__Storage=Database (App Platform) or DataProtection__KeysPath (Docker volume).");
}

bool crossSite = builder.Configuration.GetValue("Auth:CrossSite", false);
int cookieDays = builder.Configuration.GetValue("Auth:CookieDays", 30);

builder.Services
    .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.Cookie.Name = "admin_session";
        options.Cookie.HttpOnly = true;
        options.Cookie.SameSite = crossSite ? SameSiteMode.None : SameSiteMode.Lax;
        options.Cookie.SecurePolicy = builder.Environment.IsDevelopment()
            ? CookieSecurePolicy.SameAsRequest
            : CookieSecurePolicy.Always;
        options.ExpireTimeSpan = TimeSpan.FromDays(cookieDays);
        options.SlidingExpiration = true;

        options.Events.OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            return Task.CompletedTask;
        };

        options.Events.OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = StatusCodes.Status403Forbidden;
            return Task.CompletedTask;
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    options.AddPolicy("login", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 5,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));

    options.AddPolicy("analytics", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = 120,
                Window = TimeSpan.FromMinutes(1),
                QueueLimit = 0
            }));
});

builder.Services.AddScoped<IPasswordHasher<AdminUser>, PasswordHasher<AdminUser>>();
builder.Services.AddSingleton<GeoLocator>();
builder.Services.AddScoped<AnalyticsCollector>();
builder.Services.AddScoped<AnalyticsReader>();

var app = builder.Build();

if (proxyTrustAll)
{
    app.Logger.LogWarning(
        "Proxy:TrustAll is enabled: X-Forwarded-For is accepted from ANY sender and client IPs can be spoofed. " +
        "Use Proxy:KnownProxies / Proxy:KnownNetworks instead.");
}

bool migrateOnStartup = app.Configuration.GetValue("Database:MigrateOnStartup", true);

using (IServiceScope scope = app.Services.CreateScope())
{
    ApplicationDBContext context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();

    if (migrateOnStartup)
    {
        await context.Database.MigrateAsync();
    }
    else
    {
        IEnumerable<string> pending = await context.Database.GetPendingMigrationsAsync();

        if (pending.Any())
        {
            app.Logger.LogWarning(
                "Database has pending migrations that were not applied (Database:MigrateOnStartup=false): {Migrations}",
                string.Join(", ", pending));
        }
    }

    await AdminSeeder.SeedAsync(
        context,
        scope.ServiceProvider.GetRequiredService<IPasswordHasher<AdminUser>>(),
        app.Configuration);
}

app.UseForwardedHeaders();

app.UseCors("Frontend");

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();

    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseRateLimiter();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


app.MapHealthChecks("/health");

app.Run();

static string[] ReadList(IConfiguration configuration, string key)
{
    IConfigurationSection section = configuration.GetSection(key);

    IEnumerable<string?> raw = section.Value is not null
        ? section.Value.Split([',', ';'])
        : section.GetChildren().Select(child => child.Value);

    return raw
        .Select(value => value?.Trim())
        .Where(value => !string.IsNullOrEmpty(value))
        .Select(value => value!)
        .ToArray();
}