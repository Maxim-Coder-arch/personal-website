import type { ReactNode } from "react";

export interface ITechnologyIcon {
    id: string;
    svgImage: ReactNode;
    pointerLabel: string;
}

export interface ITechnology {
    id: string;
    title: string;
    description: string;
    icons: ITechnologyIcon[];
}

export type TechStackCardLayout =
    | "card-1"
    | "card-2"
    | "card-3"
    | "default";


export interface TechStackCardContentProps {
    technology: Pick<ITechnology, "title" | "description">;
}

export interface TechStackCardProps {
    technology: ITechnology;
    index: number;
}

export interface TechStackGridProps {
    technologies: ITechnology[];
}

export interface TechStackIconProps {
    icon: ITechnologyIcon;
    index: number;
    reduceMotion: boolean;
}

export interface TechStackIconsProps {
    icons: ITechnologyIcon[];
    reduceMotion: boolean;
}
