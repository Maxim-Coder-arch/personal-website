import { useMemo, useState } from "react";

import type { IProjectInput } from "@/src/entities/api/admin-projects/types";
import type { IProjectResponse } from "@/src/shared/types/global-types";
import type { IProjectField } from "@/src/entities/api/admin-projects/types";

import type {
    ProjectFieldName,
    ProjectFormErrors,
    ProjectFormValues,
} from "../../model/types";
import { cleanFields, serializeFields } from "../helpers/serialize-fields";
import { hasErrors, validateProject } from "../helpers/validate-project";

export const useProjectForm = (project?: IProjectResponse) => {
    const initial = useMemo<ProjectFormValues>(
        () => ({
            title: project?.title ?? "",
            subtitle: project?.subtitle ?? "",
            description: project?.description ?? "",
            additionalData: project?.additionalData.map((item) => ({ ...item })) ?? [],
        }),
        [project],
    );

    const [values, setValues] = useState(initial);
    const [baseline, setBaseline] = useState(initial);
    const [errors, setErrors] = useState<ProjectFormErrors>({});

    const dirty =
        values.title !== baseline.title ||
        values.subtitle !== baseline.subtitle ||
        values.description !== baseline.description ||
        serializeFields(values.additionalData) !== serializeFields(baseline.additionalData);

    const clearError = (field: keyof ProjectFormErrors) =>
        setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));

    const setField = (field: ProjectFieldName, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
        clearError(field);
    };

    const setItem = (index: number, field: keyof IProjectField, value: string) => {
        setValues((current) => ({
            ...current,
            additionalData: current.additionalData.map((item, position) =>
                position === index ? { ...item, [field]: value } : item,
            ),
        }));
        clearError("additionalData");
    };

    const addItem = () =>
        setValues((current) => ({
            ...current,
            additionalData: [...current.additionalData, { label: "", value: "" }],
        }));

    const removeItem = (index: number) => {
        setValues((current) => ({
            ...current,
            additionalData: current.additionalData.filter((_, position) => position !== index),
        }));
        clearError("additionalData");
    };

    const validate = (hasImage: boolean) => {
        const next = validateProject(values, hasImage);

        setErrors(next);

        return !hasErrors(next);
    };

    const toInput = (): IProjectInput => ({
        title: values.title.trim(),
        subtitle: values.subtitle.trim(),
        description: values.description.trim(),
        additionalData: cleanFields(values.additionalData),
    });

    const markSaved = () => setBaseline(values);

    return {
        values,
        errors,
        dirty,
        setField,
        setItem,
        addItem,
        removeItem,
        clearError,
        validate,
        toInput,
        markSaved,
    };
};