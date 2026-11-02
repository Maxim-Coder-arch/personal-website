"use client";

import { useEffect } from "react";

export const useScrollLock = (locked: boolean) => {
    useEffect(() => {
        if (!locked) return;

        const root = document.documentElement;
        const previous = root.style.overflow;

        root.style.overflow = "hidden";

        return () => {
            root.style.overflow = previous;
        };
    }, [locked]);
};