import { useEffect, useRef } from "react";

import { randomBetween } from "../helpers/random";

export const useRandomTimer = (
    callback: () => void,
    [min, max]: readonly [number, number],
    disabled = false,
) => {
    const saved = useRef(callback);

    useEffect(() => {
        saved.current = callback;
    });

    useEffect(() => {
        if (disabled) return;

        let id: number;

        const tick = () => {
            id = window.setTimeout(() => {
                if (!document.hidden) saved.current();
                tick();
            }, randomBetween(min, max));
        };

        tick();
        return () => window.clearTimeout(id);
    }, [min, max, disabled]);
};