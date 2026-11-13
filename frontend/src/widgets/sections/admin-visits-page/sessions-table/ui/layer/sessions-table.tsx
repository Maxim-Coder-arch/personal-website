"use client";

import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useSessionsTable } from "../../lib/hooks/use-sessions-table";

import { SessionRow } from "./components/session-row";
import { SessionsLayout } from "./components/sessions-layout";
import { SessionsPagination } from "./components/sessions-pagination";
import { SessionsSkeleton } from "./components/sessions-skeleton";
import { SessionsTableHead } from "./components/sessions-table-head";

import styles from "../styles/sessions-table.module.scss";

export const SessionsTable = () => {
    const { query, titles, page, pageCount, setPage, openSession } = useSessionsTable();

    return (
        <SessionsLayout total={query.data?.total}>
            <QueryBoundary
                query={query}
                loadingFallback={<SessionsSkeleton />}
                isEmpty={(data) => data.items.length === 0}
            >
                {(data) => (
                    <>
                        <div
                            className={[
                                styles["wrap"],
                                query.isPlaceholderData ? styles["wrap--loading"] : "",
                            ].join(" ")}
                        >
                            <table className={styles["table"]}>
                                <SessionsTableHead />

                                <tbody>
                                    {data.items.map((session, index) => (
                                        <SessionRow
                                            key={session.id}
                                            session={session}
                                            titles={titles}
                                            index={index}
                                            onSelect={openSession}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <SessionsPagination
                            page={page}
                            pageCount={pageCount}
                            onChange={setPage}
                        />
                    </>
                )}
            </QueryBoundary>
        </SessionsLayout>
    );
};