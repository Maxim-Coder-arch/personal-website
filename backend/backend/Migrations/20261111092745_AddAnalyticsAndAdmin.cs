using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddAnalyticsAndAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastLoginAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Visitors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstSeenAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastSeenAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SessionsCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Visitors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sessions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    VisitorId = table.Column<Guid>(type: "uuid", nullable: false),
                    StartedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastActivityAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SessionNumber = table.Column<int>(type: "integer", nullable: false),
                    PageViewsCount = table.Column<int>(type: "integer", nullable: false),
                    TotalDurationSeconds = table.Column<int>(type: "integer", nullable: false),
                    EntryPath = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    LastPath = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    CountryCode = table.Column<string>(type: "character varying(2)", maxLength: 2, nullable: true),
                    Country = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Region = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: true),
                    DeviceType = table.Column<string>(type: "character varying(16)", maxLength: 16, nullable: false),
                    DeviceBrand = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    DeviceModel = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    Browser = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    BrowserVersion = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    Os = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    OsVersion = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    ScreenWidth = table.Column<int>(type: "integer", nullable: true),
                    ScreenHeight = table.Column<int>(type: "integer", nullable: true),
                    ViewportWidth = table.Column<int>(type: "integer", nullable: true),
                    ViewportHeight = table.Column<int>(type: "integer", nullable: true),
                    PixelRatio = table.Column<double>(type: "double precision", nullable: true),
                    Language = table.Column<string>(type: "character varying(32)", maxLength: 32, nullable: true),
                    TimeZone = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: true),
                    ReferrerHost = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    UtmSource = table.Column<string>(type: "character varying(128)", maxLength: 128, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Sessions_Visitors_VisitorId",
                        column: x => x.VisitorId,
                        principalTable: "Visitors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PageViews",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    SessionId = table.Column<Guid>(type: "uuid", nullable: false),
                    Path = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    ViewedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DurationSeconds = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageViews", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PageViews_Sessions_SessionId",
                        column: x => x.SessionId,
                        principalTable: "Sessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdminUsers_Email",
                table: "AdminUsers",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PageViews_SessionId",
                table: "PageViews",
                column: "SessionId");

            migrationBuilder.CreateIndex(
                name: "IX_PageViews_ViewedAt",
                table: "PageViews",
                column: "ViewedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_LastActivityAt",
                table: "Sessions",
                column: "LastActivityAt");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_StartedAt",
                table: "Sessions",
                column: "StartedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_VisitorId",
                table: "Sessions",
                column: "VisitorId");

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_FirstSeenAt",
                table: "Visitors",
                column: "FirstSeenAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminUsers");

            migrationBuilder.DropTable(
                name: "PageViews");

            migrationBuilder.DropTable(
                name: "Sessions");

            migrationBuilder.DropTable(
                name: "Visitors");
        }
    }
}
