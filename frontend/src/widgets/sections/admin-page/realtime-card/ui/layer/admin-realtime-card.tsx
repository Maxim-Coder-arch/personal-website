"use client";

import { useRealtime } from "@/src/entities/api/analytics/analytics-queries";
import { formatNumber } from "@/src/shared/lib/helpers/format-metrics";
import { RankedList, RankedText, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { REALTIME_CONFIG } from "../../model/config";

import { RealtimeHead } from "./components/realtime-head";
import { RealtimeLayout } from "./components/realtime-layout";

import styles from "../styles/admin-realtime-card.module.scss";

export const AdminRealtimeCard = () => {
    const realtime = useRealtime();

    return (
        <RealtimeLayout>
            <QueryBoundary
                query={realtime}
                loadingFallback={<Skeleton height={REALTIME_CONFIG.skeletonHeight} />}
            >
                {(data) => {
                    const max = Math.max(1, ...data.pages.map((page) => page.visitors));

                    return (
                        <>
                            <RealtimeHead count={data.activeVisitors} />

                            {data.pages.length === 0 ? (
                                <p className={styles["empty"]}>Сейчас никого нет</p>
                            ) : (
                                <RankedList
                                    items={data.pages
                                        .slice(0, REALTIME_CONFIG.maxPages)
                                        .map((page) => ({
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
        </RealtimeLayout>
    );
};