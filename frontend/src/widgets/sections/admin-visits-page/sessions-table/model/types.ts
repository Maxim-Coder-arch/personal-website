import type { ReactNode } from "react";

import type { SessionListItem } from "@/src/entities/api/analytics/types";

export interface SessionsLayoutProps {
    total?: number;
    children: ReactNode;
}

export interface SessionRowProps {
    session: SessionListItem;
    titles?: Map<string, string>;
    index: number;
    onSelect: (id: string) => void;
}

export interface SessionsPaginationProps {
    page: number;
    pageCount: number;
    onChange: (page: number) => void;
}