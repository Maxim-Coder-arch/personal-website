"use client";

import { useRealtime } from "@/src/entities/api/analytics/analytics-queries";
import { formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, AnimatedNumber, RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import styles from "../styles/admin-realtime-card.module.scss";

export function AdminRealtimeCard() {
  const realtime = useRealtime();

  return (
    <AdminCard title="Сейчас на сайте" delay={0.35}>
      <QueryBoundary query={realtime} loadingFallback={<Skeleton height={140} />}>
        {(data) => {
          const max = Math.max(1, ...data.pages.map((page) => page.visitors));

          return (
            <>
              <div className={styles["head"]}>
                <span className={styles["live"]} />
                <AnimatedNumber
                  className={styles["count"]}
                  value={data.activeVisitors}
                  format={formatNumber}
                />
                <span className={styles["caption"]}>за последние 5 минут</span>
              </div>
              {data.pages.length === 0 ? (
                <p className={styles["empty"]}>Сейчас никого нет</p>
              ) : (
                <RankedList
                  items={data.pages.slice(0, 5).map((page) => ({
                    id: page.path,
                    label: <RankedText>{page.path}</RankedText>,
                    value: formatNumber(page.visitors),
                    ratio: page.visitors / max,
                  }))}
                />
              )}
            </>
          );
        }}
      </QueryBoundary>
    </AdminCard>
  );
}