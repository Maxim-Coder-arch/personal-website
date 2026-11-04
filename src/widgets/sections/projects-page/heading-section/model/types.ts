import type { ReactNode } from "react";

export interface HeadingSectionProps {
    total: number;
}

export interface HeadingLayoutProps {
    revealed: boolean;
    shouldReduceMotion: boolean | null;
    children: ReactNode;
}

export interface HeadingMetaProps {
    eyebrow: string;
    total: number;
}

export interface HeadingTitleProps {
    title: string;
}

export interface HeadingFooterProps {
    description: string;
    hint: string;
}