import { useIntroDone } from "@/src/shared/lib/hooks/use-intro-done";

import { useFooterVisible } from "./use-footer-visible";

export const useSectionNavVisibility = () => {
    const introDone = useIntroDone();
    const footerVisible = useFooterVisible();

    return introDone && !footerVisible;
};