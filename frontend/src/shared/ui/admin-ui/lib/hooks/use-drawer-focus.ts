import { useEffect, useRef } from "react";

export const useDrawerFocus = (open: boolean) => {
    const panelRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (!open) return;

        const previous = document.activeElement as HTMLElement | null;

        panelRef.current?.focus();

        return () => previous?.focus();
    }, [open]);

    return panelRef;
};