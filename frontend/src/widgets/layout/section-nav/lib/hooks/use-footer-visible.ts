import { useEffect, useState } from "react";

import { SECTION_NAV_CONFIG } from "../../model/config";

export const useFooterVisible = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const footer = document.getElementById(SECTION_NAV_CONFIG.footerId);

        if (!footer) return;

        const observer = new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting),
            { rootMargin: SECTION_NAV_CONFIG.footerMargin },
        );

        observer.observe(footer);

        return () => observer.disconnect();
    }, []);

    return visible;
};