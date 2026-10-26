import { HomeIcon } from "@/src/shared/icons/home";

import { IMenuItems } from "./types";

export const menuItems: IMenuItems[] = [
    {
        itemLabel: "Главная",
        itemLink: "/",
        itemIcon: <HomeIcon />,
    },
    {
        itemLabel: "Стек",
        itemLink: "/a",
    },
    {
        itemLabel: "Технологии",
        itemLink: "/b",
    },
    {
        itemLabel: "Проекты",
        itemLink: "/s",
    },
];