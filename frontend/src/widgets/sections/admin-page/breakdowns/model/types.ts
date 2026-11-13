import type { ReactNode } from "react";

import type { BreakdownItem, BreakdownKey } from "@/src/entities/api/analytics/types";

export interface BreakdownListCardProps {
    title: string;
    breakdownKey: BreakdownKey;
    delay: number;
    renderLabel?: (item: BreakdownItem) => ReactNode;
}