import { HomeIcon } from "@/src/shared/icons/globals/home";

import { IMenuItems } from "./types";

export const menuItems: IMenuItems[] = [
    {
        itemLabel: "Главная",
        itemLink: "/",
        itemIcon: <HomeIcon />,
    },
    {
        itemLabel: "Проекты",
        itemLink: "/projects",
    },
    {
        itemLabel: "Технологии",
        itemLink: "/b",
    },
    {
        itemLabel: "Проекты",
        itemLink: "/c",
    },
];