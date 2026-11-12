"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { DEVICE_COLORS, DEVICE_LABELS, translateKey } from "../../../model/data";
import styles from "../../styles/admin-breakdowns.module.scss";

export function DevicesCard() {
  const { range } = useDateRange();
  const query = useBreakdown(range, "device");

  return (
    <AdminCard title="Устройства" delay={0.45}>
      <QueryBoundary query={query} loadingFallback={<Skeleton height={160} />}>
        {(data) => (
          <div className={styles["donut"]}>
            <div className={styles["donut__chart"]}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="visitors"
                    nameKey="key"
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={3}
                    stroke="none"
                    animationDuration={700}
                  >
                    {data.map((item, index) => (
                      <Cell key={item.key} fill={DEVICE_COLORS[index % DEVICE_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className={styles["legend"]}>
              {data.map((item, index) => (
                <div key={item.key} className={styles["legend__row"]}>
                  <span
                    className={styles["legend__dot"]}
                    style={{ background: DEVICE_COLORS[index % DEVICE_COLORS.length] }}
                  />
                  {translateKey(item.key, DEVICE_LABELS)}
                  <span className={styles["legend__value"]}>{formatPercent(item.share)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </QueryBoundary>
    </AdminCard>
  );
}