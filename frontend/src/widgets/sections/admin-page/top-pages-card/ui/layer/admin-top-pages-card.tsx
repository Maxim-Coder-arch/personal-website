"use client";

import { usePages } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { formatDuration, formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useThoughtTitles } from "@/src/entities/api/thoughts/thought-queries";
import { resolvePageLabel } from "@/src/shared/lib/helpers/resolve-page-label";
import { TOP_PAGES_CONFIG } from "../../model/config";

import { TopPagesLayout } from "./components/top-pages-layout";

export const AdminTopPagesCard = () => {
    const { range } = useDateRange();
    const pages = usePages(range);
    const titles = useThoughtTitles();

    return (
        <TopPagesLayout>
            <QueryBoundary
                query={pages}
                loadingFallback={<Skeleton height={TOP_PAGES_CONFIG.skeletonHeight} />}
            >
                {(data) => {
                    const top = data.slice(0, TOP_PAGES_CONFIG.topCount);
                    const max = Math.max(1, ...top.map((page) => page.views));

                    return (
                        <RankedList
                            items={top.map((page) => ({
                                id: page.path,
                                label: (
                                    <RankedText>
                                        {resolvePageLabel(page.path, titles.data)}
                                    </RankedText>
                                ),
                                value: `${formatNumber(page.views)} · ${formatDuration(page.avgSeconds)}`,
                                ratio: page.views / max,
                            }))}
                        />
                    );
                }}
            </QueryBoundary>
        </TopPagesLayout>
    );
};