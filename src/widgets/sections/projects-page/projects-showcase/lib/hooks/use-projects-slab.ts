"use client";

import { useMotionValue, useTransform } from "framer-motion";

import { STACK } from "../../model/config";
import type { UseProjectSlabParams } from "../../model/types";

import { formatIndex } from "../helpers/format-index";

export const useProjectSlab = ({
    index,
    total,
    progress,
    stacked,
    shouldReduceMotion,
}: UseProjectSlabParams) => {
    const enabled = stacked && !shouldReduceMotion;

    const isLast = index === total - 1;
    const steps = Math.max(total - 1, 1);
    const start = index / steps;
    const end = (index + 1) / steps;

    const scale = useTransform(progress, [start, end], [1, isLast ? 1 : STACK.minScale]);
    const shade = useTransform(progress, [start, end], [0, isLast ? 0 : STACK.maxShade]);
    const idleShade = useMotionValue(0);

    const reversed = index % 2 === 1;

    return {
        reversed,
        direction: reversed ? -1 : 1,
        number: formatIndex(index + 1),
        totalLabel: formatIndex(total),
        cardStyle: enabled ? { scale } : undefined,
        shade: enabled ? shade : idleShade,
    };
};