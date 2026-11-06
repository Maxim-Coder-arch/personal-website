"use client";

import { useCallback, useRef } from "react";
import type { PointerEvent } from "react";

export const useProjectSpotlight = () => {
    const ref = useRef<HTMLElement>(null);

    const handlePointerMove = useCallback((event: PointerEvent<HTMLElement>) => {
        if (event.pointerType !== "mouse") return;

        const element = ref.current;

        if (!element) return;

        const rect = element.getBoundingClientRect();

        element.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
        element.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    }, []);

    return { ref, handlePointerMove };
};