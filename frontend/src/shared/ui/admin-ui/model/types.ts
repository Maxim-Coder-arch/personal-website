import type { CSSProperties, ReactNode } from "react";

export interface AdminCardProps {
    title?: string;
    action?: ReactNode;
    compact?: boolean;
    delay?: number;
    children: ReactNode;
}

export interface AnimatedNumberProps {
    value: number;
    format: (value: number) => string;
    className?: string;
}

export interface RankedItem {
    id: string;
    label: ReactNode;
    value: string;
    ratio: number;
}

export interface RankedListProps {
    items: RankedItem[];
}

export interface SegmentedOption<T extends string> {
    id: T;
    label: string;
}

export interface SegmentedProps<T extends string> {
    options: readonly SegmentedOption<T>[];
    value: T;
    onChange: (id: T) => void;
    layoutId: string;
}

export interface SkeletonProps {
    width?: CSSProperties["width"];
    height?: CSSProperties["height"];
}

export interface SparklineProps {
    values: number[];
    color?: string;
}

export interface CountryFlagProps {
    code?: string | null;
}

export interface AdminDrawerProps {
    open: boolean;
    title: string;
    onClose: () => void;
    children: ReactNode;
}