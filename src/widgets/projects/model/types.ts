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

export type ProjectStructureBuilder = Partial<Omit<IProject, "id">>[];