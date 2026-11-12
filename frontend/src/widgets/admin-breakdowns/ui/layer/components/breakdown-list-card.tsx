"use client";

import type { ReactNode } from "react";
import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import type { BreakdownItem, BreakdownKey } from "@/src/entities/api/analytics/types";
import { useDateRange } from "@/src/features/date-range";
import { formatNumber, formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";
import { translateKey } from "../../../model/data";

type BreakdownListCardProps = {
  title: string;
  breakdownKey: BreakdownKey;
  delay: number;
  renderLabel?: (item: BreakdownItem) => ReactNode;
};

export function BreakdownListCard({
  title,
  breakdownKey,
  delay,
  renderLabel,
}: BreakdownListCardProps) {
  const { range } = useDateRange();
  const query = useBreakdown(range, breakdownKey);

  return (
    <AdminCard title={title} delay={delay}>
      <QueryBoundary query={query} loadingFallback={<Skeleton height={200} />}>
        {(data) => {
          const top = data.slice(0, 7);
          const max = Math.max(0.0001, ...top.map((item) => item.share));

          return (
            <RankedList
              items={top.map((item) => ({
                id: item.key,
                label: renderLabel ? (
                  renderLabel(item)
                ) : (
                  <RankedText>{translateKey(item.key)}</RankedText>
                ),
                value: `${formatNumber(item.visitors)} · ${formatPercent(item.share)}`,
                ratio: item.share / max,
              }))}
            />
          );
        }}
      </QueryBoundary>
    </AdminCard>
  );
}