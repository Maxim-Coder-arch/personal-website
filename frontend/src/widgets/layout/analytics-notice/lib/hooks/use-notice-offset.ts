import { useEffect, type RefObject } from "react";

import { ANALYTICS_NOTICE_CONFIG } from "../../model/config";

export const useNoticeOffset = (ref: RefObject<HTMLElement | null>) => {
    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        const root = document.documentElement;
        const { offsetVar, offsetGap } = ANALYTICS_NOTICE_CONFIG;

        const apply = () =>
            root.style.setProperty(offsetVar, `${element.offsetHeight + offsetGap}px`);

        apply();

        const observer = new ResizeObserver(apply);

        observer.observe(element);

        return () => {
            observer.disconnect();
            root.style.removeProperty(offsetVar);
        };
    }, [ref]);
};