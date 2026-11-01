import { TargetAndTransition, Transition } from "framer-motion";

import type { Emotion, EmotionPose, MouthShape } from "./types";

export const FACE = {
    eyeY: 62,
    leftEyeX: 40,
    rightEyeX: 80,
    eyeRx: 10.5,
    eyeRy: 12,
    pupilR: 5,
} as const;

export const GAZE = {
    maxOffset: 4.5,
    reach: 240,
    idleAfterMs: 3000,
    headParallax: 0.45, 
    spring: { stiffness: 220, damping: 22, mass: 0.6 },
} as const;

export const TIMING = {
    blink: { everyMs: [2200, 6000], closedMs: 90, gapMs: 120, doubleChance: 0.2 },
    emotion: { everyMs: [8000, 20000], holdMs: [1500, 3000] },
    glance: { everyMs: [1200, 3500] },
    click: { holdMs: 1400 },
} as const;

export const AUTO_EMOTIONS: readonly Emotion[] = ["happy", "surprised", "sleepy", "wink"];

export const CLICK_EMOTIONS: readonly Emotion[] = ["wink", "wink", "happy", "surprised"];

export const POSES: Record<Emotion, EmotionPose> = {
    neutral: {
        eyes: [1, 1], lid: 6, pupil: 1,
        brow: { y: 0, tilt: 0, opacity: 0 },
        mouth: "smile", cheeks: 0,
    },
    happy: {
        eyes: [0, 0], lid: -9, pupil: 1,
        brow: { y: -2, tilt: 0, opacity: 0 },
        mouth: "grin", cheeks: 1,
    },
    surprised: {
        eyes: [1.15, 1.15], lid: 6, pupil: 0.7,
        brow: { y: -6, tilt: 0, opacity: 1 },
        mouth: "open", cheeks: 0,
    },
    sleepy: {
        eyes: [0.3, 0.3], lid: 6, pupil: 1,
        brow: { y: 3, tilt: 6, opacity: 1 },
        mouth: "flat", cheeks: 0,
    },
    wink: {
        eyes: [1, 0], lid: -9, pupil: 1,
        brow: { y: 0, tilt: 0, opacity: 0 },
        mouth: "grin", cheeks: 1,
    },
};

export const MOUTH_PATHS: Record<MouthShape, string> = {
    smile: "M49 82 Q54.5 88 60 81 Q65.5 88 71 82",
    grin: "M47 80 Q53.5 93 60 81 Q66.5 93 73 80",
    flat: "M50 84 Q55 85 60 82 Q65 85 70 84",
    open: "M49 82 Q54.5 88 60 81 Q65.5 88 71 82",
};

export const SVG_ORIGIN = {
    transformBox: "fill-box",
    transformOrigin: "center",
} as const;

export const TRANSITION = {
    face: { duration: 0.3, ease: "easeOut" },
    eye: { duration: 0.1 },
    instant: { duration: 0 },
} as const satisfies Record<string, Transition>;

export const HOP_ANIMATION: TargetAndTransition = {
    y: [0, -3, 0],
    scale: [1, 0.92, 1.06, 1],
    transition: { duration: 0.45, ease: "easeOut" },
};

export const TAP_ANIMATION: TargetAndTransition = { scale: 0.94 };

export const SHAPES = {
    viewBox: "0 0 120 112",

    ears: ["M22 52 L16 12 L52 32 Z", "M98 52 L104 12 L68 32 Z"],
    innerEars: ["M25 40 L22 22 L41 31 Z", "M95 40 L98 22 L79 31 Z"],
    head: { cx: 60, cy: 68, rx: 44, ry: 36 },

    cheeks: [
        { cx: 27, cy: 76, rx: 6, ry: 3.6 },
        { cx: 93, cy: 76, rx: 6, ry: 3.6 },
    ],

    brows: {
        left: "M31 47 Q40 42 49 47",
        right: "M71 47 Q80 42 89 47",
    },

    nose: "M55.5 72 L64.5 72 L60 77.5 Z",
    noseStem: "M60 77.5 L60 81",
    mouthOpen: { cx: 60, cy: 86, rx: 4.5, ry: 5.5 },

    whiskers: {
        left: "M17 73 L3 69 M17 78 L2 78 M17 83 L3 87",
        right: "M103 73 L117 69 M103 78 L118 78 M103 83 L117 87",
    },
} as const;