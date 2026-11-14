import type { IProjectField } from "@/src/entities/api/admin-projects/types";

export const cleanFields = (items: IProjectField[]): IProjectField[] =>
    items
        .map((item) => ({ label: item.label.trim(), value: item.value.trim() }))
        .filter((item) => item.label || item.value);

export const serializeFields = (items: IProjectField[]) => JSON.stringify(items);