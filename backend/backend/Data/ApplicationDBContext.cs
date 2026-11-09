using backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace backend.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {}

        public DbSet<Project> Projects { get; set; }
        public DbSet<Article> Articles { get; set; }

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
        }
    }
}
