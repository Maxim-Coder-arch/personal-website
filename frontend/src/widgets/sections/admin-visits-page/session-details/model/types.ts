import type { ReactNode } from "react";

import type { SessionListItem, SessionPageView } from "@/src/entities/api/analytics/types";

export interface SessionFact {
    label: string;
    value: string;
}

export interface SessionOverviewProps {
    session: SessionListItem;
}

export interface SessionFactsProps {
    facts: SessionFact[];
}

export interface SessionTimelineProps {
    pageViews: SessionPageView[];
    titles?: Map<string, string>;
}

export interface SessionSectionProps {
    title: string;
    children: ReactNode;
}