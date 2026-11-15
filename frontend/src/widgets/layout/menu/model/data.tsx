import { HomeIcon } from "@/src/shared/icons/globals/home";

import { IMenuItems, MenuItemId } from "./types";

export const menuItems: (Omit<IMenuItems, "itemLabel"> & { id: MenuItemId })[] = [
    {
        id: "home",
        itemLink: "/",
        itemIcon: <HomeIcon />,
    },
    {
        id: "projects",
        itemLink: "/projects",
    },
    {
        id: "articles",
        itemLink: "/articles",
    },
];
