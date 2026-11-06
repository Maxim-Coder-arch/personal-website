import { useCallback, useRef, useState } from "react";

import {
    AUTO_EMOTIONS,
    CLICK_EMOTIONS,
    POSES,
    TIMING,
} from "../../model/config";
import type { Emotion, EmotionPose, WinkSide } from "../../model/types";

import { pick, randomBetween } from "../helpers/random";

import { useRandomTimer } from "./use-random-timer";
import { useTimeouts } from "./use-timeouts";

export const useEmotion = (enabled: boolean) => {
    const [emotion, setEmotion] = useState<Emotion>("neutral");
    const [winkSide, setWinkSide] = useState<WinkSide>("right");

    const revertId = useRef<number | null>(null);
    const { later, cancel } = useTimeouts();

    const showEmotion = useCallback(
        (next: Emotion, holdMs: number) => {
            if (revertId.current !== null) cancel(revertId.current);

            if (next === "wink") {
                setWinkSide(Math.random() < 0.5 ? "left" : "right");
            }

            setEmotion(next);
            revertId.current = later(() => setEmotion("neutral"), holdMs);
        },
        [later, cancel],
    );

    useRandomTimer(
        () => {
            if (emotion !== "neutral") return;

            showEmotion(
                pick(AUTO_EMOTIONS),
                randomBetween(...TIMING.emotion.holdMs),
            );
        },
        TIMING.emotion.everyMs,
        !enabled,
    );

    const reactToClick = useCallback(() => {
        showEmotion(pick(CLICK_EMOTIONS), TIMING.click.holdMs);
    }, [showEmotion]);

    const pose = POSES[emotion];

    const eyes: EmotionPose["eyes"] =
        emotion === "wink" && winkSide === "left"
            ? [pose.eyes[1], pose.eyes[0]]
            : pose.eyes;

    return { emotion, pose, eyes, reactToClick };
};