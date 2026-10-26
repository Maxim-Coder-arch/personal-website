import { ReactElement, ReactNode } from "react";

export interface IMenuItems {
    itemLabel: string;
    itemLink: string;
    itemIcon?: ReactElement;
}

export type IMenuLayout = IMenuItems;

export interface MenuLayoutProps {
    children: ReactNode;
    shouldReduceMotion: boolean | null;
    onMouseLeave: () => void;
}

export interface AnimatedListItemProps {
    item: IMenuItems;
    isActive: boolean;
    isHighlighted: boolean;
    shouldReduceMotion: boolean | null;
    onMouseEnter: () => void;
}