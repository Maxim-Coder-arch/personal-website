import { PROJECT_LIMITS } from "../../model/config";
import type { ProjectFormErrors, ProjectFormValues } from "../../model/types";

const validateLine = (value: string, max: number, emptyMessage: string) => {
    const trimmed = value.trim();

    if (!trimmed) return emptyMessage;

    if (trimmed.length > max) return `Не длиннее ${max} символов`;

    return undefined;
};

const validateAdditionalData = (items: ProjectFormValues["additionalData"]) => {
    for (const item of items) {
        const label = item.label.trim();
        const value = item.value.trim();

        if (!label && !value) continue;

        if (!label || !value) return "Заполни название и значение или удали строку";

        if (label.length > PROJECT_LIMITS.labelMax) {
            return `Название не длиннее ${PROJECT_LIMITS.labelMax} символов`;
        }

        if (value.length > PROJECT_LIMITS.valueMax) {
            return `Значение не длиннее ${PROJECT_LIMITS.valueMax} символов`;
        }
    }

    return undefined;
};

export const validateProject = (
    values: ProjectFormValues,
    hasImage: boolean,
): ProjectFormErrors => {
    return {
        title: validateLine(values.title, PROJECT_LIMITS.titleMax, "Укажи название"),
        subtitle: validateLine(values.subtitle, PROJECT_LIMITS.subtitleMax, "Укажи подзаголовок"),
        description: validateLine(
            values.description,
            PROJECT_LIMITS.descriptionMax,
            "Добавь описание",
        ),
        additionalData: validateAdditionalData(values.additionalData),
        image: hasImage ? undefined : "Добавь обложку",
    };
};

export const hasErrors = (errors: ProjectFormErrors) => Object.values(errors).some(Boolean);