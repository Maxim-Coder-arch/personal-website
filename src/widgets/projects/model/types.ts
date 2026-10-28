import { IProject } from "@/src/shared/types/global-types";

import { Variants } from "framer-motion";


export type ProjectStructureBuilder = Partial<Omit<IProject, "id">>[];

export interface ProjectCardProps {
    project: IProject;
    index: number;
    animation?: Variants;
}

export interface ProjectImageProps {
    title: string;
    imagePath: string;
    index: number;
}

export interface ProjectInfoProps {
    title: string;
    subtitle: string;
    index: number;
}

export interface ProjectsGridProps {
    projects: IProject[];
}

export interface ViewAllProjectsProps {
    href?: string;
}