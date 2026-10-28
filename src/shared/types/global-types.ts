import { ReactNode } from "react";

export type ReactChildren = { children: ReactNode };

export interface IProject {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    additionalData?: {
        label: string;
        value: string;
    }[];
    imagePath: string;
}