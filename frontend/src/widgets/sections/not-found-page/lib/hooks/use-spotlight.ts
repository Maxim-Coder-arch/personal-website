"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

import {
    useAnimationFrame,
    useMotionTemplate,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";

import {
    AUTO_PATH_PERIOD,
    LENS_PARALLAX,
    OFFSCREEN,
    PARALLAX_SPRING,
    SPOTLIGHT_RADIUS,
    SPOTLIGHT_SPRING,
} from "../../model/config";

export const useSpotlight = () => {
    const ref = useRef<HTMLElement>(null);
    const autoRef = useRef(false);
    const shouldReduceMotion = useReducedMotion();

    const x = useMotionValue(OFFSCREEN);
    const y = useMotionValue(OFFSCREEN);
    const nx = useMotionValue(0);
    const ny = useMotionValue(0);

    const spotX = useSpring(x, SPOTLIGHT_SPRING);
    const spotY = useSpring(y, SPOTLIGHT_SPRING);
    const parallaxX = useSpring(nx, PARALLAX_SPRING);
    const parallaxY = useSpring(ny, PARALLAX_SPRING);

    const mask = useMotionTemplate`radial-gradient(circle ${SPOTLIGHT_RADIUS}px at ${spotX}px ${spotY}px, #000 0%, rgba(0, 0, 0, 0.55) 45%, transparent 100%)`;

    const lensX = useTransform(parallaxX, (value) => value * -LENS_PARALLAX);
    const lensY = useTransform(parallaxY, (value) => value * -LENS_PARALLAX);

    useEffect(() => {
        const node = ref.current;

        if (!node) return;

        const { width, height } = node.getBoundingClientRect();

        x.set(width / 2);
        y.set(height / 2);

        const media = window.matchMedia("(hover: none)");

        const sync = () => {
            autoRef.current = media.matches;
        };

        sync();
        media.addEventListener("change", sync);

        return () => media.removeEventListener("change", sync);
    }, [x, y]);

    useAnimationFrame((time) => {
        const node = ref.current;

        if (!autoRef.current || shouldReduceMotion || !node) return;

        const { width, height } = node.getBoundingClientRect();

        const t = time / AUTO_PATH_PERIOD;
        const k = 1 + Math.sin(t) ** 2;
        const px = Math.cos(t) / k;
        const py = (Math.sin(t) * Math.cos(t)) / k;

        x.set(width * (0.5 + px * 0.34));
        y.set(height * (0.5 + py * 0.3));
        nx.set(px);
        ny.set(py);
    });

    const onPointerMove = (event: PointerEvent<HTMLElement>) => {
        const node = ref.current;

        if (!node || autoRef.current) return;

        const rect = node.getBoundingClientRect();
        const px = event.clientX - rect.left;
        const py = event.clientY - rect.top;

        x.set(px);
        y.set(py);
        nx.set((px / rect.width) * 2 - 1);
        ny.set((py / rect.height) * 2 - 1);
    };

    return { ref, mask, lensX, lensY, onPointerMove, shouldReduceMotion };
};