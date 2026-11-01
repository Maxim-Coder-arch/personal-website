import { useCallback } from "react";
import {
    useAnimationControls,
    useReducedMotion,
    useTransform,
} from "framer-motion";

import {
    GAZE,
    HOP_ANIMATION,
    TAP_ANIMATION,
    TIMING,
    TRANSITION,
} from "../../model/config";

import { useBlink } from "./use-blink";
import { useCanHover } from "./use-can-hover";
import { useEmotion } from "./use-emotion";
import { useGaze } from "./use-gaze";
import { useRandomTimer } from "./use-random-timer";

export const useMascot = () => {
    const canHover = useCanHover();
    const reduced = useReducedMotion() ?? false;
    const enabled = canHover && !reduced;

    const blinking = useBlink(enabled);
    const { pose, eyes, reactToClick } = useEmotion(enabled);

    const { ref, x, y, glance } = useGaze(enabled);
    useRandomTimer(glance, TIMING.glance.everyMs, !enabled);

    const headX = useTransform(x, (value) => value * GAZE.headParallax);
    const headY = useTransform(y, (value) => value * GAZE.headParallax);

    const hop = useAnimationControls();

    const handleClick = useCallback(() => {
        if (!enabled) return;

        reactToClick();
        hop.start(HOP_ANIMATION);
    }, [enabled, reactToClick, hop]);

    const isEyeClosed = (scale: number) => blinking || scale <= 0.05;

    return {
        canHover,

        ref,
        hop,
        tap: reduced ? undefined : TAP_ANIMATION,
        handleClick,

        pose,
        eyes,
        closed: [isEyeClosed(eyes[0]), isEyeClosed(eyes[1])] as const,
        isOpenMouth: pose.mouth === "open",

        pupilX: x,
        pupilY: y,
        headX,
        headY,

        transition: reduced ? TRANSITION.instant : TRANSITION.face,
        eyeTransition: reduced ? TRANSITION.instant : TRANSITION.eye,
    };
};