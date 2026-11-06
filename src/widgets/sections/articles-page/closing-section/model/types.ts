import type { ReactNode, Ref } from "react";
import type { MotionValue } from "framer-motion";

export interface StatementWord {
    text: string;
    index: number;
}

export interface ClosingSectionProps {
    titles: string[];
}

export interface ClosingLayoutProps {
    children: ReactNode;
}

export interface ClosingStatementProps {
    ref: Ref<HTMLHeadingElement>;
    lines: StatementWord[][];
    total: number;
    progress: MotionValue<number>;
}

export interface ScrollWordProps {
    text: string;
    index: number;
    total: number;
    progress: MotionValue<number>;
}

export interface ClosingMarqueeProps {
    items: readonly string[];
}