import { ARTICLE_LIMITS } from "../../model/config";
import type { ArticleFormErrors, ArticleFormValues } from "../../model/types";

const validateLine = (value: string, max: number, emptyMessage: string) => {
    const trimmed = value.trim();

    if (!trimmed) return emptyMessage;

    if (trimmed.length > max) return `Не длиннее ${max} символов`;

    return undefined;
};

export const validateArticle = (values: ArticleFormValues): ArticleFormErrors => {
    return {
        title: validateLine(values.title, ARTICLE_LIMITS.titleMax, "Укажи заголовок"),
        subtitle: validateLine(values.subtitle, ARTICLE_LIMITS.subtitleMax, "Укажи подзаголовок"),
        text: values.text.trim() ? undefined : "Статья не может быть пустой",
    };
};

export const hasErrors = (errors: ArticleFormErrors) => Object.values(errors).some(Boolean);