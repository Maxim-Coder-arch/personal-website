import { ReactNode } from "react";

export type ReactChildren = { children: ReactNode };

export interface IProjectResponse {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    additionalData: {
        label: string;
        value: string;
    }[];
}

export interface IProject extends IProjectResponse {
    imagePath: string;
}