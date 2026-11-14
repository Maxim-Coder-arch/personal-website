import { useMemo, useState } from "react";

import type { IArticleInput } from "@/src/entities/api/admin-articles/types";
import type { IArticle } from "@/src/entities/article";

import type { ArticleFormErrors, ArticleFormValues } from "../../model/types";
import { hasErrors, validateArticle } from "../helpers/validate-article";

export const useArticleForm = (article?: IArticle) => {
    const initial = useMemo<ArticleFormValues>(
        () => ({
            title: article?.title ?? "",
            subtitle: article?.subtitle ?? "",
            text: article?.text ?? "",
        }),
        [article],
    );

    const [values, setValues] = useState(initial);
    const [baseline, setBaseline] = useState(initial);
    const [errors, setErrors] = useState<ArticleFormErrors>({});

    const dirty =
        values.title !== baseline.title ||
        values.subtitle !== baseline.subtitle ||
        values.text !== baseline.text;

    const setField = (field: keyof ArticleFormValues, value: string) => {
        setValues((current) => ({ ...current, [field]: value }));
        setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current));
    };

    const validate = () => {
        const next = validateArticle(values);

        setErrors(next);

        return !hasErrors(next);
    };

    const toInput = (): IArticleInput => ({
        title: values.title.trim(),
        subtitle: values.subtitle.trim(),
        text: values.text,
    });

    const markSaved = () => setBaseline(values);

    return { values, errors, dirty, setField, validate, toInput, markSaved };
};