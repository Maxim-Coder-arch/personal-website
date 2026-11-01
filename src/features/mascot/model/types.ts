import { MotionValue, Transition } from "framer-motion";

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