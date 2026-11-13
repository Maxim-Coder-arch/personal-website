"use client";

import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { formatNumber, formatPercent } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { AUDIENCE_CONFIG } from "../../../model/config";
import { translateKey } from "@/src/shared/lib/helpers/analytics-labels";
import type { AudienceListCardProps } from "../../../model/types";

export const AudienceListCard = ({
    title,
    breakdownKey,
    delay,
    renderLabel,
}: AudienceListCardProps) => {
    const { range } = useDateRange();
    const query = useBreakdown(range, breakdownKey);

    return (
        <AdminCard title={title} delay={delay}>
            <QueryBoundary
                query={query}
                loadingFallback={<Skeleton height={AUDIENCE_CONFIG.listSkeletonHeight} />}
            >
                {(data) => {
                    const top = data.slice(0, AUDIENCE_CONFIG.topCount);
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
};