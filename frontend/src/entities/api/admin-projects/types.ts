export interface IProjectField {
    label: string;
    value: string;
}

export interface IProjectInput {
    title: string;
    subtitle: string;
    description: string;
    additionalData: IProjectField[];
}

export interface ICreateProjectResult {
    id: string;
    imageFailed: boolean;
}