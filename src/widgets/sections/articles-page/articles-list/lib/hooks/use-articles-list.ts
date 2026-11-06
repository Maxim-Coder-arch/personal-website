"use client";

import { useReducedMotion } from "framer-motion";

export const useArticlesList = () => {
    const shouldReduceMotion = useReducedMotion();

    return { shouldReduceMotion };
};