"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import { AdminCard, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import styles from "../../styles/admin-breakdowns.module.scss";

const tick = { fill: ADMIN_COLORS.muted, fontSize: 11 };

export function HoursCard() {
  const { range } = useDateRange();
  const query = useBreakdown(range, "hour");

  const rows = useMemo(() => {
    const byHour = new Map((query.data ?? []).map((item) => [parseInt(item.key, 10), item.sessions]));
    
    return Array.from({ length: 24 }, (_, hour) => ({
      label: String(hour).padStart(2, "0"),
      sessions: byHour.get(hour) ?? 0,
    }));
  }, [query.data]);

  return (
    <AdminCard title="Активность по часам" delay={0.5}>
      <QueryBoundary query={query} loadingFallback={<Skeleton height={200} />}>
        {() => (
          <div className={styles["hours"]}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={tick}
                  interval={2}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#1d1d1d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  labelFormatter={(label) => `${label}:00`}
                  formatter={(value) => [value, "Сессии"]}
                />
                <Bar
                  dataKey="sessions"
                  fill={ADMIN_COLORS.accent}
                  radius={[4, 4, 0, 0]}
                  animationDuration={700}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </QueryBoundary>
    </AdminCard>
  );
}