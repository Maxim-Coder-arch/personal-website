"use client";

import { menuItems } from "../../model/data";

import { AnimatedListItem } from "./components/animated-list-item";
import { MenuLayout } from "./components/menu-layout";

import { useState } from "react";

import { usePathname } from "next/navigation";

import { useReducedMotion } from "framer-motion";

export const Menu = () => {
    const pathname = usePathname();
    const shouldReduceMotion = useReducedMotion();

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const currentPath = pathname ?? "/";
    const highlightedPath = hoveredItem ?? currentPath;

    return (
        <MenuLayout
            shouldReduceMotion={shouldReduceMotion}
            onMouseLeave={() => setHoveredItem(null)}
        >
            {menuItems.map((item) => (
                <AnimatedListItem
                    key={item.itemLink}
                    item={item}
                    isActive={currentPath === item.itemLink}
                    isHighlighted={highlightedPath === item.itemLink}
                    shouldReduceMotion={shouldReduceMotion}
                    onMouseEnter={() => setHoveredItem(item.itemLink)}
                />
            ))}
        </MenuLayout>
    );
};