"use client";

import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import { AdminCard, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { WEEKDAYS } from "../../../model/data";
import styles from "../../styles/admin-audience.module.scss";

export function WeekdaysCard() {
  const { range } = useDateRange();
  const query = useBreakdown(range, "weekday");

  const rows = useMemo(() => {
    const byDay = new Map((query.data ?? []).map((item) => [item.key, item.sessions]));
    return WEEKDAYS.map((day) => ({ label: day.label, sessions: byDay.get(day.key) ?? 0 }));
  }, [query.data]);

  return (
    <AdminCard title="Дни недели" delay={0.4}>
      <QueryBoundary query={query} loadingFallback={<Skeleton height={200} />}>
        {() => (
          <div className={styles["weekdays"]}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rows} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: ADMIN_COLORS.muted, fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#1d1d1d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
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