"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";

import { ADMIN_UI_CONFIG } from "../../../model/animations";
import type { AnimatedNumberProps } from "../../../model/types";

export const AnimatedNumber = ({ value, format, className }: AnimatedNumberProps) => {
    const motionValue = useMotionValue(0);
    const text = useTransform(motionValue, format);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration: ADMIN_UI_CONFIG.number.duration,
            ease: ADMIN_UI_CONFIG.easing,
        });

        return () => controls.stop();
    }, [motionValue, value]);

    return <motion.span className={className}>{text}</motion.span>;
};