import { useEffect, useState } from "react";

import { useMotionValue, useSpring } from "framer-motion";

import { SECTION_NAV_CONFIG } from "../../model/config";
import { getSectionProgress } from "../helpers/get-section-progress";

export const useSectionProgress = (ids: readonly string[]) => {
    const raw = useMotionValue(0);
    const progress = useSpring(raw, { stiffness: 170, damping: 26, mass: 0.6 });
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        let frame = 0;

        const update = () => {
            frame = 0;

            const line = window.innerHeight * SECTION_NAV_CONFIG.focusLine;

            const tops = ids.map((id) => {
                const element = document.getElementById(id);

                return element
                    ? element.getBoundingClientRect().top
                    : Number.POSITIVE_INFINITY;
            });

            const { index, value } = getSectionProgress(tops, line);

            raw.set(value);
            setActiveIndex(index);
        };

        const schedule = () => {
            if (frame) return;

            frame = window.requestAnimationFrame(update);
        };

        schedule();

        window.addEventListener("scroll", schedule, { passive: true });
        window.addEventListener("resize", schedule);

        return () => {
            if (frame) window.cancelAnimationFrame(frame);

            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
        };
    }, [ids, raw]);

    return { progress, activeIndex };
};