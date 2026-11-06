"use client";

import { useIntroDone } from "@/src/shared/lib/hooks/use-intro-done";

import { useReducedMotion } from "framer-motion";

export const useHeadingSection = () => {
    const shouldReduceMotion = useReducedMotion();
    const introDone = useIntroDone();

    return {
        shouldReduceMotion,
        revealed: introDone || Boolean(shouldReduceMotion),
    };
};