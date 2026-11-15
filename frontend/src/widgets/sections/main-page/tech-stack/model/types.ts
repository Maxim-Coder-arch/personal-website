import type { ReactElement, ReactNode } from "react";

export interface ITechnologyIcon {
    id: string;
    svgImage: ReactNode;
    pointerLabel: string;
}

export type TechnologyId = "frontend" | "backend" | "tools" | "databases" | "other";

export interface ITechnology {
    id: TechnologyId;
    icons: ITechnologyIcon[];
}

export type TechStackCardLayout =
    | "card-1"
    | "card-2"
    | "card-3"
    | "default";


export interface TechStackCardContentProps {
    technology: Pick<ITechnology, "id">;
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

export interface IIcon {
    id: string;
    svgImage: ReactElement;
    pointerLabel: string;
}

export type CreateRepeatedIconsProps = Pick<IIcon, "svgImage" | "pointerLabel">;