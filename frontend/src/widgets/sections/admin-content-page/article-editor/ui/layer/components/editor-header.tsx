import { ArrowLeft, ExternalLink, Save, Trash2 } from "lucide-react";

import { AdminButton } from "@/src/shared/ui/admin-ui";

import type { EditorHeaderProps } from "../../../model/types";

import styles from "../../styles/article-editor.module.scss";

export const EditorHeader = ({
    isNew,
    dirty,
    saving,
    siteHref,
    onBack,
    onSave,
    onDelete,
}: EditorHeaderProps) => {
    const status = isNew ? "Черновик" : dirty ? "Есть изменения" : "Сохранено";

    return (
        <header className={styles["header"]}>
            <div className={styles["header__main"]}>
                <AdminButton size="sm" icon={<ArrowLeft size={14} />} onClick={onBack}>
                    К статьям
                </AdminButton>

                <h2 className={styles["header__title"]}>
                    {isNew ? "Новая статья" : "Редактирование"}
                </h2>

                <span
                    className={[styles["status"], dirty || isNew ? styles["status--dirty"] : ""].join(" ")}
                >
                    {status}
                </span>
            </div>

            <div className={styles["header__actions"]}>
                {siteHref && (
                    <AdminButton href={siteHref} external icon={<ExternalLink size={14} />}>
                        На сайте
                    </AdminButton>
                )}

                {onDelete && (
                    <AdminButton variant="danger" icon={<Trash2 size={14} />} onClick={onDelete}>
                        Удалить
                    </AdminButton>
                )}

                <AdminButton
                    variant="primary"
                    icon={<Save size={14} />}
                    loading={saving}
                    disabled={!isNew && !dirty}
                    onClick={onSave}
                >
                    Сохранить
                </AdminButton>
            </div>
        </header>
    );
};