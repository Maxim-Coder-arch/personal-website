import { PROJECT_LIMITS } from "../../../model/config";
import type { ProjectFieldsProps } from "../../../model/types";

import styles from "../../styles/project-editor.module.scss";

const FIELDS = [
    { name: "title", label: "Название", max: PROJECT_LIMITS.titleMax, multiline: false },
    { name: "subtitle", label: "Подзаголовок", max: PROJECT_LIMITS.subtitleMax, multiline: false },
    { name: "description", label: "Описание", max: PROJECT_LIMITS.descriptionMax, multiline: true },
] as const;

export const ProjectFields = ({ values, errors, onChange }: ProjectFieldsProps) => {
    return (
        <div className={styles["fields"]}>
            {FIELDS.map((field) => {
                const className = [
                    field.multiline ? styles["textarea"] : styles["input"],
                    errors[field.name] ? styles["invalid"] : "",
                ].join(" ");

                return (
                    <label key={field.name} className={styles["field"]}>
                        <span className={styles["field__head"]}>
                            <span className={styles["field__label"]}>{field.label}</span>
                            <span className={styles["field__counter"]}>
                                {values[field.name].length}/{field.max}
                            </span>
                        </span>

                        {field.multiline ? (
                            <textarea
                                className={className}
                                value={values[field.name]}
                                aria-invalid={Boolean(errors[field.name])}
                                onChange={(event) => onChange(field.name, event.target.value)}
                            />
                        ) : (
                            <input
                                type="text"
                                className={className}
                                value={values[field.name]}
                                aria-invalid={Boolean(errors[field.name])}
                                onChange={(event) => onChange(field.name, event.target.value)}
                            />
                        )}

                        {errors[field.name] && (
                            <span className={styles["field__error"]}>{errors[field.name]}</span>
                        )}
                    </label>
                );
            })}
        </div>
    );
};