"use client";

import { useIntroTimeline } from "./use-intro-timeline";
import { useScrollLock } from "./use-scroll-lock";

export const usePageLoader = () => {
    const timeline = useIntroTimeline();

    useScrollLock(timeline.visible);

    return timeline;
};