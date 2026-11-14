import type { RefObject } from "react";

import type { IProjectField } from "@/src/entities/api/admin-projects/types";
import type { IProjectResponse } from "@/src/shared/types/global-types";

export interface ProjectFormValues {
    title: string;
    subtitle: string;
    description: string;
    additionalData: IProjectField[];
}

export type ProjectFieldName = "title" | "subtitle" | "description";

export type ProjectFormErrors = Partial<
    Record<ProjectFieldName | "additionalData" | "image", string>
>;

export interface ProjectEditorProps {
    projectId?: string;
}

export interface ProjectEditorFormProps {
    project?: IProjectResponse;
    version?: number;
}

export interface ProjectEditorHeaderProps {
    isNew: boolean;
    dirty: boolean;
    saving: boolean;
    onBack: () => void;
    onSave: () => void;
    onDelete?: () => void;
}

export interface ProjectFieldsProps {
    values: ProjectFormValues;
    errors: ProjectFormErrors;
    onChange: (field: ProjectFieldName, value: string) => void;
}

export interface AdditionalDataEditorProps {
    items: IProjectField[];
    error?: string;
    onChange: (index: number, field: keyof IProjectField, value: string) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}

export interface ImagePickerProps {
    previewUrl: string | null;
    error?: string;
    inputRef: RefObject<HTMLInputElement | null>;
    changed: boolean;
    onSelect: (file: File | null) => void;
    onReset: () => void;
}