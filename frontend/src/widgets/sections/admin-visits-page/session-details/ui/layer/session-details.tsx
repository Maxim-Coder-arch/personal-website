"use client";

import { AdminDrawer, Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { buildSessionFacts } from "../../lib/helpers/build-session-facts";
import { useSessionDetails } from "../../lib/hooks/use-session-details";
import { SESSION_DETAILS_CONFIG } from "../../model/config";

import { SessionDetailsLayout } from "./components/session-details-layout";
import { SessionFacts } from "./components/session-facts";
import { SessionOverview } from "./components/session-overview";
import { SessionSection } from "./components/session-section";
import { SessionTimeline } from "./components/session-timeline";

export const SessionDetails = () => {
    const { open, close, query, titles } = useSessionDetails();

    return (
        <AdminDrawer open={open} title={SESSION_DETAILS_CONFIG.title} onClose={close}>
            <QueryBoundary
                query={query}
                loadingFallback={<Skeleton height={SESSION_DETAILS_CONFIG.skeletonHeight} />}
            >
                {(data) => (
                    <SessionDetailsLayout>
                        <SessionOverview session={data.session} />

                        <SessionSection title="Окружение">
                            <SessionFacts facts={buildSessionFacts(data.session)} />
                        </SessionSection>

                        <SessionSection title="Путь по сайту">
                            <SessionTimeline pageViews={data.pageViews} titles={titles} />
                        </SessionSection>
                    </SessionDetailsLayout>
                )}
            </QueryBoundary>
        </AdminDrawer>
    );
};