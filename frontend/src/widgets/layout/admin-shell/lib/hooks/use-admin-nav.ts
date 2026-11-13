import { usePathname } from "next/navigation";

import { ADMIN_NAV } from "../../model/data";
import { isNavActive } from "../helpers/is-nav-active";

const DEFAULT_TITLE = "Админка";

export const useAdminNav = () => {
    const pathname = usePathname();

    const items = ADMIN_NAV.map((item) => ({
        ...item,
        active: item.ready && isNavActive(pathname, item.href),
    }));

    const title = ADMIN_NAV.find((item) => isNavActive(pathname, item.href))?.label ?? DEFAULT_TITLE;

    return { items, title, pathname };
};