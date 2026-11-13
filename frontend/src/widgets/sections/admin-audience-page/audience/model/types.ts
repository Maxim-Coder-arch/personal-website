import type { ReactNode } from "react";

import type { BreakdownItem, BreakdownKey } from "@/src/entities/api/analytics/types";

export interface AudienceListCardProps {
    title: string;
    breakdownKey: BreakdownKey;
    delay: number;
    renderLabel?: (item: BreakdownItem) => ReactNode;
}

export interface VisitorsStatProps {
    label: string;
    color: string;
    value: number;
    share: number;
}