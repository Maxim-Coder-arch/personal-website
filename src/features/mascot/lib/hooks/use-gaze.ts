"use client";

import { useCallback, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

import { GAZE } from "../../model/config";
import { randomBetween } from "../helpers/random";

export const useGaze = (enabled: boolean) => {
    const ref = useRef<HTMLDivElement>(null);
    const lastMove = useRef(0);

    const rawX = useMotionValue(0);
    const rawY = useMotionValue(0);
    const x = useSpring(rawX, GAZE.spring);
    const y = useSpring(rawY, GAZE.spring);

    useEffect(() => {
        lastMove.current = Date.now();
    }, []);

    useEffect(() => {
        if (!enabled) {
            rawX.set(0);
            rawY.set(0);
            return;
        }

        const onMove = (event: PointerEvent) => {
            const box = ref.current?.getBoundingClientRect();
            if (!box) return;

            const dx = event.clientX - (box.left + box.width / 2);
            const dy = event.clientY - (box.top + box.height / 2);
            const distance = Math.hypot(dx, dy) || 1;
            const strength = Math.min(distance / GAZE.reach, 1);

            rawX.set((dx / distance) * GAZE.maxOffset * strength);
            rawY.set((dy / distance) * GAZE.maxOffset * strength);
            lastMove.current = Date.now();
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, rawX, rawY]);

    const glance = useCallback(() => {
        if (Date.now() - lastMove.current < GAZE.idleAfterMs) return;

        rawX.set(randomBetween(-1, 1) * GAZE.maxOffset * 0.8);
        rawY.set(randomBetween(-1, 1) * GAZE.maxOffset * 0.8);
    }, [rawX, rawY]);

    return { ref, x, y, glance };
};