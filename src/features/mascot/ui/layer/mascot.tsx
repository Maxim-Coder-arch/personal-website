"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    motion,
    useAnimationControls,
    useReducedMotion,
    useTransform,
    type Transition,
} from "framer-motion";

import {
    AUTO_EMOTIONS,
    CLICK_EMOTIONS,
    FACE,
    GAZE,
    MOUTH_PATHS,
    POSES,
    SVG_ORIGIN,
    TIMING,
} from "../../model/config";

import type { Emotion, WinkSide } from "../../model/types";

import { pick, randomBetween } from "../../lib/helpers/random";
import { useCanHover } from "../../lib/hooks/use-can-hover";
import { useGaze } from "../../lib/hooks/use-gaze";
import { useRandomTimer } from "../../lib/hooks/use-random-timer";

import { MascotEye } from "./components/mascot-eye";

import styles from "../styles/mascot.module.scss";

export const Mascot = () => {
    const canHover = useCanHover();
    const reduced = useReducedMotion() ?? false;
    const enabled = canHover && !reduced;

    const [emotion, setEmotion] = useState<Emotion>("neutral");
    const [winkSide, setWinkSide] = useState<WinkSide>("right");
    const [blinking, setBlinking] = useState(false);

    const hop = useAnimationControls();
    const timeouts = useRef<Set<number>>(new Set());
    const revertId = useRef<number | null>(null);

    const { ref, x, y, glance } = useGaze(enabled);
    const headX = useTransform(x, (value) => value * GAZE.headParallax);
    const headY = useTransform(y, (value) => value * GAZE.headParallax);

    const later = useCallback((fn: () => void, ms: number) => {
        const id = window.setTimeout(() => {
            timeouts.current.delete(id);
            fn();
        }, ms);

        timeouts.current.add(id);
        return id;
    }, []);

    const cancel = useCallback((id: number) => {
        window.clearTimeout(id);
        timeouts.current.delete(id);
    }, []);

    useEffect(() => {
        const pending = timeouts.current;

        return () => {
            pending.forEach((id) => window.clearTimeout(id));
            pending.clear();
        };
    }, []);

    const blink = useCallback(() => {
        const { closedMs, gapMs, doubleChance } = TIMING.blink;

        setBlinking(true);
        later(() => setBlinking(false), closedMs);

        if (Math.random() < doubleChance) {
            later(() => setBlinking(true), closedMs + gapMs);
            later(() => setBlinking(false), closedMs * 2 + gapMs);
        }
    }, [later]);

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

    useRandomTimer(blink, TIMING.blink.everyMs, !enabled);

    useRandomTimer(
        () => {
            if (emotion !== "neutral") return;
            showEmotion(pick(AUTO_EMOTIONS), randomBetween(...TIMING.emotion.holdMs));
        },
        TIMING.emotion.everyMs,
        !enabled,
    );

    useRandomTimer(glance, TIMING.glance.everyMs, !enabled);

    const handleClick = () => {
        if (!enabled) return;

        showEmotion(pick(CLICK_EMOTIONS), TIMING.click.holdMs);

        hop.start({
            y: [0, -3, 0],
            scale: [1, 0.92, 1.06, 1],
            transition: { duration: 0.45, ease: "easeOut" },
        });
    };

    if (!canHover) return null;

    const pose = POSES[emotion];
    const eyes =
        emotion === "wink" && winkSide === "left"
            ? ([pose.eyes[1], pose.eyes[0]] as const)
            : pose.eyes;

    const transition: Transition = reduced
        ? { duration: 0 }
        : { duration: 0.3, ease: "easeOut" };

    const eyeTransition: Transition = reduced ? { duration: 0 } : { duration: 0.1 };

    const isClosed = (scale: number) => blinking || scale <= 0.05;
    const isOpenMouth = pose.mouth === "open";

    return (
        <div
            ref={ref}
            className={styles["mascot"]}
        >
            <motion.div
                animate={hop}
                whileTap={reduced ? undefined : { scale: 0.94 }}
                onClick={handleClick}
            >
                <svg
                    className={styles["mascot__svg"]}
                    viewBox="0 0 120 112"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path className={`${styles["mascot__head"]} ${styles["mascot__hit"]}`} d="M22 52 L16 12 L52 32 Z" />
                    <path className={`${styles["mascot__head"]} ${styles["mascot__hit"]}`} d="M98 52 L104 12 L68 32 Z" />
                    <path className={styles["mascot__inner-ear"]} d="M25 40 L22 22 L41 31 Z" />
                    <path className={styles["mascot__inner-ear"]} d="M95 40 L98 22 L79 31 Z" />

                    <ellipse
                        className={`${styles["mascot__head"]} ${styles["mascot__hit"]}`}
                        cx="60"
                        cy="68"
                        rx="44"
                        ry="36"
                    />

                    <motion.g style={{ x: headX, y: headY }}>
                        <motion.ellipse
                            className={styles["mascot__cheek"]}
                            cx="27" cy="76" rx="6" ry="3.6"
                            initial={false}
                            animate={{ opacity: pose.cheeks }}
                            transition={transition}
                        />
                        <motion.ellipse
                            className={styles["mascot__cheek"]}
                            cx="93" cy="76" rx="6" ry="3.6"
                            initial={false}
                            animate={{ opacity: pose.cheeks }}
                            transition={transition}
                        />

                        <MascotEye
                            cx={FACE.leftEyeX}
                            scale={eyes[0]}
                            closed={isClosed(eyes[0])}
                            lid={pose.lid}
                            pupilScale={pose.pupil}
                            pupilX={x}
                            pupilY={y}
                            transition={eyeTransition}
                        />
                        <MascotEye
                            cx={FACE.rightEyeX}
                            scale={eyes[1]}
                            closed={isClosed(eyes[1])}
                            lid={pose.lid}
                            pupilScale={pose.pupil}
                            pupilX={x}
                            pupilY={y}
                            transition={eyeTransition}
                        />

                        <motion.path
                            className={styles["mascot__line"]}
                            d="M31 47 Q40 42 49 47"
                            style={SVG_ORIGIN}
                            initial={false}
                            animate={{ y: pose.brow.y, rotate: -pose.brow.tilt, opacity: pose.brow.opacity }}
                            transition={transition}
                        />
                        <motion.path
                            className={styles["mascot__line"]}
                            d="M71 47 Q80 42 89 47"
                            style={SVG_ORIGIN}
                            initial={false}
                            animate={{ y: pose.brow.y, rotate: pose.brow.tilt, opacity: pose.brow.opacity }}
                            transition={transition}
                        />

                        <path className={styles["mascot__nose"]} d="M55.5 72 L64.5 72 L60 77.5 Z" />
                        <path className={styles["mascot__line"]} d="M60 77.5 L60 81" />

                        <motion.path
                            className={styles["mascot__line"]}
                            d={MOUTH_PATHS.smile}
                            initial={false}
                            animate={{ d: MOUTH_PATHS[pose.mouth], opacity: isOpenMouth ? 0 : 1 }}
                            transition={transition}
                        />
                        <motion.ellipse
                            className={styles["mascot__mouth-open"]}
                            cx="60" cy="86" rx="4.5" ry="5.5"
                            style={SVG_ORIGIN}
                            initial={false}
                            animate={{ opacity: isOpenMouth ? 1 : 0, scale: isOpenMouth ? 1 : 0.4 }}
                            transition={transition}
                        />
                    </motion.g>

                    <path className={styles["mascot__line"]} d="M17 73 L3 69 M17 78 L2 78 M17 83 L3 87" />
                    <path className={styles["mascot__line"]} d="M103 73 L117 69 M103 78 L118 78 M103 83 L117 87" />
                </svg>
            </motion.div>
        </div>
    );
};