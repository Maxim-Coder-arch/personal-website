"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useSummary, useTimeseries } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import { formatNumber, formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, AnimatedNumber, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { SEGMENT_COLORS } from "../../../model/data";
import styles from "../../styles/admin-audience.module.scss";

const tick = { fill: ADMIN_COLORS.muted, fontSize: 12 };

export function VisitorsSplitCard() {
  const { range } = useDateRange();
  const summary = useSummary(range);
  const series = useTimeseries(range);

  return (
    <AdminCard title="Новые и вернувшиеся" delay={0.05}>
      <QueryBoundary query={summary} loadingFallback={<Skeleton height={80} />}>
        {(data) => {
          const { newVisitors, returningVisitors } = data.current;
          const total = newVisitors + returningVisitors;

          return (
            <div className={styles["stats"]}>
              <div className={styles["stat"]}>
                <span className={styles["stat__label"]}>
                  <span
                    className={styles["stat__dot"]}
                    style={{ background: SEGMENT_COLORS.newVisitors }}
                  />
                  Новые
                </span>
                <AnimatedNumber
                  className={styles["stat__value"]}
                  value={newVisitors}
                  format={formatNumber}
                />
                <span className={styles["stat__share"]}>
                  {formatPercent(total === 0 ? 0 : newVisitors / total)}
                </span>
              </div>
              <div className={styles["stat"]}>
                <span className={styles["stat__label"]}>
                  <span
                    className={styles["stat__dot"]}
                    style={{ background: SEGMENT_COLORS.returningVisitors }}
                  />
                  Вернувшиеся
                </span>
                <AnimatedNumber
                  className={styles["stat__value"]}
                  value={returningVisitors}
                  format={formatNumber}
                />
                <span className={styles["stat__share"]}>
                  {formatPercent(total === 0 ? 0 : returningVisitors / total)}
                </span>
              </div>
            </div>
          );
        }}
      </QueryBoundary>

      <QueryBoundary query={series} loadingFallback={<Skeleton height={260} />}>
        {(data) => (
          <div className={styles["chart"]}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.points} margin={{ top: 4, right: 8, bottom: 0, left: -16 }}>
                <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tick={tick}
                  minTickGap={24}
                />
                <YAxis tickLine={false} axisLine={false} allowDecimals={false} tick={tick} width={48} />
                <Tooltip
                  cursor={{ fill: "rgba(255,255,255,0.04)" }}
                  contentStyle={{
                    background: "#1d1d1d",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Bar
                  name="Новые"
                  dataKey="newVisitors"
                  stackId="visitors"
                  fill={SEGMENT_COLORS.newVisitors}
                  animationDuration={700}
                />
                <Bar
                  name="Вернувшиеся"
                  dataKey="returningVisitors"
                  stackId="visitors"
                  fill={SEGMENT_COLORS.returningVisitors}
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