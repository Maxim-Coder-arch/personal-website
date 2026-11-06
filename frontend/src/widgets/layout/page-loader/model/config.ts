import type { Transition } from "framer-motion";

import type { IntroPhase } from "./types";

export const PHASE_ORDER: readonly IntroPhase[] = [
    "idle",
    "open",
    "wink",
    "expand",
    "reveal",
    "done",
];

export const INTRO = {
    openAt: 300,
    countStart: 550,
    countMs: 800,
    blinkAt: [800, 1080, 1250],
    blinkMs: 110,
    winkAt: 1400,
    expandAt: 1700,
    expandMs: 380,
    revealAt: 2080,
    curtainMs: 650,
    doneAt: 2800,
} as const;

export const EYE = {
    viewBox: "0 0 200 100",
    centers: [60, 140],
    cy: 50,
    rx: 26,
    ry: 30,
    pupilR: 12,
    glintR: 3.6,
    pupilTravel: 11,
    pupilDrop: 4,
    expandScale: 24,
    lidCurve: { sleep: 14, wink: -22 },
} as const;

export const CURTAINS = [
    { side: "top", offset: "-100%" },
    { side: "bottom", offset: "100%" },
] as const;

export const SVG_ORIGIN = {
    transformBox: "fill-box",
    transformOrigin: "center",
} as const;

export const PUPIL_SPRING = { stiffness: 90, damping: 18, mass: 0.7 } as const;

export const EYE_TRANSITION: Transition = { duration: 0.14, ease: "easeOut" };

export const PUPIL_TRANSITION: Transition = { duration: 0.18, ease: "easeOut" };

export const EXPAND_TRANSITION: Transition = {
    duration: INTRO.expandMs / 1000,
    ease: [0.7, 0, 0.3, 1],
};

export const CURTAIN_TRANSITION: Transition = {
    duration: INTRO.curtainMs / 1000,
    ease: [0.76, 0, 0.24, 1],
};

export const COUNTER_TRANSITION: Transition = { duration: 0.2, ease: "easeOut" };