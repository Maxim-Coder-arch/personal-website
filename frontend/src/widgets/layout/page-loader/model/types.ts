import type { ReactNode } from "react";
import type { MotionValue } from "framer-motion";

export type IntroPhase = "idle" | "open" | "wink" | "expand" | "reveal" | "done";

export interface EyeState {
    closed: boolean;
    curve: number;
}

export interface LoaderLayoutProps {
    revealing: boolean;
    onSkip: () => void;
    children: ReactNode;
}

export interface LoaderEyesProps {
    eyes: readonly [EyeState, EyeState];
    expanding: boolean;
    pupilX: MotionValue<number>;
    pupilY: MotionValue<number>;
}

export interface LoaderEyeProps {
    cx: number;
    closed: boolean;
    curve: number;
    expanding: boolean;
    pupilX: MotionValue<number>;
    pupilY: MotionValue<number>;
}

export interface LoaderCounterProps {
    value: MotionValue<string>;
    hidden: boolean;
}

export interface LoaderCurtainsProps {
    open: boolean;
}