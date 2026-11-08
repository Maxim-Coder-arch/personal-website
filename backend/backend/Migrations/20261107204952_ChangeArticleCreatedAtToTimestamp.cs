using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeArticleCreatedAtToTimestamp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                ALTER TABLE "Articles"
                ALTER COLUMN "CreatedAt" TYPE timestamp with time zone
                USING "CreatedAt"::timestamp with time zone;
                """);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                ALTER TABLE "Articles"
                ALTER COLUMN "CreatedAt" TYPE text
                USING "CreatedAt"::text;
                """);
        }
    }
}