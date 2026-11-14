import { ARTICLE_LIMITS } from "../../../model/config";
import type { ArticleFieldsProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

const FIELDS = [
    { name: "title", label: "Заголовок", max: ARTICLE_LIMITS.titleMax },
    { name: "subtitle", label: "Подзаголовок", max: ARTICLE_LIMITS.subtitleMax },
] as const;

export const ArticleFields = ({ values, errors, onChange }: ArticleFieldsProps) => {
    return (
        <div className={styles["fields"]}>
            {FIELDS.map((field) => (
                <label key={field.name} className={styles["field"]}>
                    <span className={styles["field__head"]}>
                        <span className={styles["field__label"]}>{field.label}</span>
                        <span className={styles["field__counter"]}>
                            {values[field.name].length}/{field.max}
                        </span>
                    </span>

                    <input
                        type="text"
                        className={[
                            styles["input"],
                            errors[field.name] ? styles["input--invalid"] : "",
                        ].join(" ")}
                        value={values[field.name]}
                        aria-invalid={Boolean(errors[field.name])}
                        onChange={(event) => onChange(field.name, event.target.value)}
                    />

                    {errors[field.name] && (
                        <span className={styles["field__error"]}>{errors[field.name]}</span>
                    )}
                </label>
            ))}
        </div>
    );
};