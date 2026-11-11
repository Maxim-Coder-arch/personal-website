using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        { }

        public DbSet<Project> Projects { get; set; }
        public DbSet<Article> Articles { get; set; }
        public DbSet<AdminUser> AdminUsers { get; set; }
        public DbSet<Visitor> Visitors { get; set; }
        public DbSet<VisitSession> Sessions { get; set; }
        public DbSet<PageView> PageViews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Project>()
                .Property(p => p.AdditionalData)
                .HasConversion(
                    value => JsonSerializer.Serialize(value, (JsonSerializerOptions)null),
                    value => JsonSerializer.Deserialize<List<ProjectAdditionalData>>(
                        value,
                        (JsonSerializerOptions)null
                    ) ?? new List<ProjectAdditionalData>()
                )
                .HasColumnType("jsonb");

            modelBuilder.Entity<AdminUser>(entity =>
            {
                entity.Property(a => a.Email).HasMaxLength(256);
                entity.HasIndex(a => a.Email).IsUnique();
            });

            modelBuilder.Entity<Visitor>(entity =>
            {
                entity.HasIndex(v => v.FirstSeenAt);
            });

            modelBuilder.Entity<VisitSession>(entity =>
            {
                entity.HasOne(s => s.Visitor)
                    .WithMany(v => v.Sessions)
                    .HasForeignKey(s => s.VisitorId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(s => s.StartedAt);
                entity.HasIndex(s => s.LastActivityAt);
                entity.HasIndex(s => s.VisitorId);
            });

            modelBuilder.Entity<PageView>(entity =>
            {
                entity.HasOne(p => p.Session)
                    .WithMany(s => s.PageViews)
                    .HasForeignKey(p => p.SessionId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(p => p.ViewedAt);
                entity.HasIndex(p => p.SessionId);
            });
        }
    }
}