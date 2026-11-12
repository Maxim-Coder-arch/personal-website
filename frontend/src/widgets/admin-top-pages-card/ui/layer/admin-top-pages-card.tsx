"use client";

import { usePages } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { formatDuration, formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { resolvePageLabel } from "../../lib/resolve-page-label";
import { useArticleTitles } from "../../lib/use-article-titles";

export function AdminTopPagesCard() {
  const { range } = useDateRange();
  const pages = usePages(range);
  const titles = useArticleTitles();

  return (
    <AdminCard title="Популярные страницы" delay={0.4}>
      <QueryBoundary query={pages} loadingFallback={<Skeleton height={220} />}>
        {(data) => {
          const top = data.slice(0, 7);
          const max = Math.max(1, ...top.map((page) => page.views));

          return (
            <RankedList
              items={top.map((page) => ({
                id: page.path,
                label: <RankedText>{resolvePageLabel(page.path, titles.data)}</RankedText>,
                value: `${formatNumber(page.views)} · ${formatDuration(page.avgSeconds)}`,
                ratio: page.views / max,
              }))}
            />
          );
        }}
      </QueryBoundary>
    </AdminCard>
  );
}