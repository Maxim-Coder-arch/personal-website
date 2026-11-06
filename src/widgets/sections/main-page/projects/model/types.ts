import { IProject } from "@/src/shared/types/global-types";

import { Variants } from "framer-motion";


export type ProjectStructureBuilder = Partial<Omit<IProject, "id">>[];

export type ProjectSpec = NonNullable<IProject["additionalData"]>[number];

export interface ProjectCardProps {
    project: IProject;
    index: number;
    total: number;
    animation?: Variants;
}

export interface ProjectImageProps {
    title: string;
    imagePath: string;
    index: number;
    animation?: Variants;
}

export interface ProjectInfoProps {
    title: string;
    subtitle: string;
    description: string;
    specs?: ProjectSpec[];
    index: number;
    total: number;
}

export interface ProjectSpecsProps {
    specs: ProjectSpec[];
}

export interface ProjectsGridProps {
    projects: IProject[];
}

export interface ViewAllProjectsProps {
    href?: string;
}