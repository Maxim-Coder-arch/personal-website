"use client";

import { ReactElement } from "react";
import styles from "../styles/menu.module.scss";
import { HomeIcon } from "@/src/shared/icons/home";
import Link from "next/link";
import { it } from "node:test";
import { usePathname } from "next/navigation";

export interface IMenuItems {
    itemLabel: string;
    itemLink: string;
    itemIcon?: ReactElement;
}

export const menuItems: IMenuItems[] = [
    {
        itemLabel: "Главная",
        itemLink: "/",
        itemIcon: <HomeIcon />
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
]

export const Menu = () => {
    const pathName = usePathname();

    return (
        <nav className={`${styles["hero-nav"]} w-full fixed flex justify-center`}>
            <div className={`${styles["hero-nav__sections"]} rounded-3xl flex justify-center p-1`}>
                <ul className="flex items-center gap-2">
                    {menuItems.map((item, index) => {
                        return (
                            <li key={index + item.itemLabel} className={`flex rounded-3xl px-4 py-2 gap-1 ${pathName === item.itemLink ? styles["active"] : ""}`}>

                                { item.itemIcon && item.itemIcon }

                                <Link href={item.itemLink}>{ item.itemLabel }</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}