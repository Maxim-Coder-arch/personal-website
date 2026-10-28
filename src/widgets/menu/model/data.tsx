import { HomeIcon } from "@/src/shared/icons/globals/home";

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
        itemLink: "/c",
    },
];