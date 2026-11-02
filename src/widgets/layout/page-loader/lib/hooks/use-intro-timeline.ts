import { useCallback, useEffect, useState } from "react";
import {
    animate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";

import { completeIntro } from "@/src/shared/lib/intro/intro-store";

import { EYE, INTRO, PHASE_ORDER, PUPIL_SPRING } from "../../model/config";
import type { IntroPhase } from "../../model/types";

import { formatCounter } from "../helpers/format-counter";
import { getEyesState } from "../helpers/get-eyes-state";

const isReached = (current: IntroPhase, target: IntroPhase) =>
    PHASE_ORDER.indexOf(current) >= PHASE_ORDER.indexOf(target);

export const useIntroTimeline = () => {
    const reduced = useReducedMotion() ?? false;

    const [phase, setPhase] = useState<IntroPhase>("idle");
    const [blinking, setBlinking] = useState(false);

    const progress = useMotionValue(0);
    const counter = useTransform(progress, formatCounter);

    const pupilX = useSpring(
        useTransform(progress, [0, 1], [-EYE.pupilTravel, EYE.pupilTravel]),
        PUPIL_SPRING,
    );
    const pupilY = useMotionValue<number>(EYE.pupilDrop);

    const advance = useCallback((next: IntroPhase) => {
        setPhase((current) => (isReached(current, next) ? current : next));
    }, []);

    const reveal = useCallback(() => {
        advance("reveal");
        completeIntro();
    }, [advance]);

    useEffect(() => {
        const timers: number[] = [];
        let counting: ReturnType<typeof animate> | undefined;

        const at = (ms: number, fn: () => void) => {
            timers.push(window.setTimeout(fn, ms));
        };

        const cleanup = () => {
            timers.forEach((id) => window.clearTimeout(id));
            counting?.stop();
        };

        progress.set(0);

        const alreadySeen = document.documentElement.dataset.intro === "seen";

        if (reduced || alreadySeen) {
            at(0, () => {
                advance("done");
                completeIntro();
            });

            return cleanup;
        }

        at(INTRO.openAt, () => advance("open"));

        at(INTRO.countStart, () => {
            counting = animate(progress, 1, {
                duration: INTRO.countMs / 1000,
                ease: "linear",
            });
        });

        INTRO.blinkAt.forEach((start) => {
            at(start, () => setBlinking(true));
            at(start + INTRO.blinkMs, () => setBlinking(false));
        });

        at(INTRO.winkAt, () => advance("wink"));
        at(INTRO.expandAt, () => advance("expand"));
        at(INTRO.revealAt, reveal);
        at(INTRO.doneAt, () => advance("done"));

        return cleanup;
    }, [advance, reveal, reduced, progress]);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") reveal();
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [reveal]);

    return {
        visible: phase !== "done",
        revealing: isReached(phase, "reveal"),
        expanding: isReached(phase, "expand"),
        eyes: getEyesState(phase, blinking),
        counter,
        pupilX,
        pupilY,
        skip: reveal,
    };
};