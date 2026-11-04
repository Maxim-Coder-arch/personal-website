import type { ReactNode, Ref } from "react";
import type { MotionValue } from "framer-motion";

import type { IProject } from "@/src/shared/types/global-types";

export type ProjectSpecs = NonNullable<IProject["additionalData"]>;

export interface ProjectsShowcaseProps {
    projects: IProject[];
}

export interface ShowcaseLayoutProps {
    ref: Ref<HTMLElement>;
    children: ReactNode;
}

export interface ProjectSlabProps {
    project: IProject;
    index: number;
    total: number;
    progress: MotionValue<number>;
    stacked: boolean;
    shouldReduceMotion: boolean;
}

export type UseProjectSlabParams = Pick<
    ProjectSlabProps,
    "index" | "total" | "progress" | "stacked" | "shouldReduceMotion"
>;

export interface SlabIndexProps {
    number: string;
    direction: number;
}

export interface SlabMediaProps {
    title: string;
    imagePath: string;
}

export interface SlabMetaProps {
    number: string;
    total: string;
}

export interface SlabTitleProps {
    title: string;
    subtitle: string;
}

export interface SlabDescriptionProps {
    text: string;
}

export interface SlabSpecsProps {
    items: ProjectSpecs;
}

export interface SlabShadeProps {
    opacity: MotionValue<number>;
}