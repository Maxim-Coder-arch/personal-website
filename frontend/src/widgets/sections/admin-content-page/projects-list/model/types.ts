import type { ReactNode } from "react";

import type { IProjectResponse } from "@/src/shared/types/global-types";

export interface ProjectsLayoutProps {
    total?: number;
    toolbar: ReactNode;
    children: ReactNode;
}

export interface ProjectsToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export interface ProjectRowProps {
    project: IProjectResponse;
    index: number;
    total: number;
    version: number;
    canMove: boolean;
    moving: boolean;
    onMove: (index: number, direction: -1 | 1) => void;
    onDelete: (project: IProjectResponse) => void;
}