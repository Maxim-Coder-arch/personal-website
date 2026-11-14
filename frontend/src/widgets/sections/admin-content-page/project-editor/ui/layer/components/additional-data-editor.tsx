import { Plus, X } from "lucide-react";

import { AdminButton } from "@/src/shared/ui/admin-ui";

import { PROJECT_LIMITS } from "../../../model/config";
import type { AdditionalDataEditorProps } from "../../../model/types";

import styles from "../../styles/project-editor.module.scss";

export const AdditionalDataEditor = ({
    items,
    error,
    onChange,
    onAdd,
    onRemove,
}: AdditionalDataEditorProps) => {
    return (
        <div className={styles["extra"]}>
            {items.length === 0 && (
                <p className={styles["extra__hint"]}>
                    Например: Стек — Next.js, ASP.NET. Поля показываются на сайте под описанием.
                </p>
            )}

            {items.map((item, index) => (
                <div key={index} className={styles["extra__row"]}>
                    <input
                        type="text"
                        className={styles["input"]}
                        placeholder="Название"
                        maxLength={PROJECT_LIMITS.labelMax}
                        value={item.label}
                        onChange={(event) => onChange(index, "label", event.target.value)}
                    />

                    <input
                        type="text"
                        className={styles["input"]}
                        placeholder="Значение"
                        maxLength={PROJECT_LIMITS.valueMax}
                        value={item.value}
                        onChange={(event) => onChange(index, "value", event.target.value)}
                    />

                    <button
                        type="button"
                        className={styles["extra__remove"]}
                        aria-label="Удалить поле"
                        onClick={() => onRemove(index)}
                    >
                        <X size={16} />
                    </button>
                </div>
            ))}

            {error && <span className={styles["field__error"]}>{error}</span>}

            <div>
                <AdminButton size="sm" icon={<Plus size={14} />} onClick={onAdd}>
                    Добавить поле
                </AdminButton>
            </div>
        </div>
    );
};