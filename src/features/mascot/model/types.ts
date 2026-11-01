import { MotionValue, TargetAndTransition, Transition, useAnimationControls } from "framer-motion";

import { ReactNode, Ref } from "react";

export type Emotion = "neutral" | "happy" | "surprised" | "sleepy" | "wink";
export type MouthShape = "smile" | "grin" | "flat" | "open";
export type WinkSide = "left" | "right";

export interface EmotionPose {
    eyes: readonly [number, number];
    lid: number;
    pupil: number;
    brow: { y: number; tilt: number; opacity: number };
    mouth: MouthShape;
    cheeks: number;
}

export interface MascotEyeProps {
    cx: number;
    scale: number;
    closed: boolean;
    lid: number;
    pupilScale: number;
    pupilX: MotionValue<number>;
    pupilY: MotionValue<number>;
    transition: Transition;
}

export interface MascotLayoutProps {
    ref: Ref<HTMLDivElement>;
    hop: ReturnType<typeof useAnimationControls>;
    tap?: TargetAndTransition;
    onClick: () => void;
    children: ReactNode;
}

export interface MascotFaceProps {
    pose: EmotionPose;
    eyes: EmotionPose["eyes"];
    closed: readonly [boolean, boolean];
    pupilX: MotionValue<number>;
    pupilY: MotionValue<number>;
    headX: MotionValue<number>;
    headY: MotionValue<number>;
    transition: Transition;
    eyeTransition: Transition;
}

export interface MascotCheeksProps {
    opacity: number;
    transition: Transition;
}

export interface MascotBrowsProps {
    brow: EmotionPose["brow"];
    transition: Transition;
}

export interface MascotMouthProps {
    shape: MouthShape;
    transition: Transition;
}