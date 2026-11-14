import { useEffect } from "react";

export const useUnsavedGuard = (active: boolean) => {
    useEffect(() => {
        if (!active) return;

        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            event.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [active]);
};