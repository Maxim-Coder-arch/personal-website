import { useCallback, useEffect, useRef } from "react";

export const useTimeouts = () => {
    const pending = useRef<Set<number>>(new Set());

    const later = useCallback((fn: () => void, ms: number) => {
        const id = window.setTimeout(() => {
            pending.current.delete(id);
            fn();
        }, ms);

        pending.current.add(id);
        return id;
    }, []);

    const cancel = useCallback((id: number) => {
        window.clearTimeout(id);
        pending.current.delete(id);
    }, []);

    useEffect(() => {
        const ids = pending.current;

        return () => {
            ids.forEach((id) => window.clearTimeout(id));
            ids.clear();
        };
    }, []);

    return { later, cancel };
};