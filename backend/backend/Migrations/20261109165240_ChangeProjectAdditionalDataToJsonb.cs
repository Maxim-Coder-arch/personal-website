
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class ChangeProjectAdditionalDataToJsonb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                ALTER TABLE "Projects"
                ADD COLUMN "AdditionalData_new" jsonb NOT NULL DEFAULT '[]'::jsonb;

                UPDATE "Projects"
                SET "AdditionalData_new" = COALESCE(
                    (
                        SELECT jsonb_agg(
                            jsonb_build_object(
                                'label', item.key,
                                'value', item.value
                            )
                            ORDER BY item.key
                        )
                        FROM each("AdditionalData") AS item(key, value)
                    ),
                    '[]'::jsonb
                );

                ALTER TABLE "Projects"
                DROP COLUMN "AdditionalData";

                ALTER TABLE "Projects"
                RENAME COLUMN "AdditionalData_new" TO "AdditionalData";
                """);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                ALTER TABLE "Projects"
                ADD COLUMN "AdditionalData_old" hstore;

                UPDATE "Projects"
                SET "AdditionalData_old" = COALESCE(
                    (
                        SELECT hstore(
                            array_agg(item->>'label'),
                            array_agg(item->>'value')
                        )
                        FROM jsonb_array_elements("AdditionalData") AS item
                    ),
                    ''::hstore
                );

                ALTER TABLE "Projects"
                DROP COLUMN "AdditionalData";

                ALTER TABLE "Projects"
                RENAME COLUMN "AdditionalData_old" TO "AdditionalData";
                """);
        }
    }
}
