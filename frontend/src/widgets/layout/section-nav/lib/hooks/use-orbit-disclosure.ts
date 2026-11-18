import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type FocusEvent,
    type MouseEvent,
    type PointerEvent,
} from "react";

import { useEscapeKey } from "@/src/shared/lib/hooks/use-escape-key";
import { useMediaQuery } from "@/src/shared/lib/hooks/use-media-query";

import { SECTION_NAV_CONFIG } from "../../model/config";

export const useOrbitDisclosure = () => {
    const [open, setOpen] = useState(false);
    const canHover = useMediaQuery(SECTION_NAV_CONFIG.hoverQuery);
    const rootRef = useRef<HTMLDivElement>(null);
    const timer = useRef<number | null>(null);

    const clearTimer = useCallback(() => {
        if (timer.current === null) return;

        window.clearTimeout(timer.current);
        timer.current = null;
    }, []);

    const close = useCallback(() => {
        clearTimer();
        setOpen(false);
    }, [clearTimer]);

    const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;

        clearTimer();
        setOpen(true);
    };

    const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") return;

        clearTimer();
        timer.current = window.setTimeout(
            () => setOpen(false),
            SECTION_NAV_CONFIG.closeDelay,
        );
    };

    const handleFocus = (event: FocusEvent<HTMLDivElement>) => {
        if (!event.target.matches(":focus-visible")) return;

        clearTimer();
        setOpen(true);
    };

    const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
        if (event.currentTarget.matches(":hover")) return;

        if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;

        close();
    };

    const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
        if (canHover && event.detail > 0) return;

        clearTimer();
        setOpen((current) => !current);
    };

    const afterSelect = () => {
        if (!canHover) close();
    };

    useEscapeKey(open, close);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: globalThis.PointerEvent) => {
            const root = rootRef.current;

            if (root && !root.contains(event.target as Node)) close();
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [open, close]);

    useEffect(() => clearTimer, [clearTimer]);

    return {
        open,
        rootRef,
        rootHandlers: {
            onPointerEnter: handlePointerEnter,
            onPointerLeave: handlePointerLeave,
            onFocus: handleFocus,
            onBlur: handleBlur,
        },
        onTriggerClick: handleTriggerClick,
        afterSelect,
    };
};