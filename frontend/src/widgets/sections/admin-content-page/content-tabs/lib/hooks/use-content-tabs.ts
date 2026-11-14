import { usePathname } from "next/navigation";

import { CONTENT_TABS } from "../../model/data";

export const useContentTabs = () => {
    const pathname = usePathname();

    return CONTENT_TABS.map((tab) => ({
        ...tab,
        active: pathname === tab.href || pathname.startsWith(`${tab.href}/`),
    }));
};