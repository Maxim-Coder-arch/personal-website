import { ImagePlus, Undo2 } from "lucide-react";

import { AdminButton } from "@/src/shared/ui/admin-ui";

import { PROJECT_IMAGE_TYPES } from "../../../model/config";
import type { ImagePickerProps } from "../../../model/types";

import styles from "../../styles/project-editor.module.scss";

export const ImagePicker = ({
    previewUrl,
    error,
    inputRef,
    changed,
    onSelect,
    onReset,
}: ImagePickerProps) => {
    return (
        <div className={styles["image"]}>
            <div
                className={[styles["image__frame"], error ? styles["invalid"] : ""].join(" ")}
            >
                {previewUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={previewUrl} alt="" className={styles["image__preview"]} />
                ) : (
                    <span className={styles["image__empty"]}>Обложки нет</span>
                )}
            </div>

            <div className={styles["image__actions"]}>
                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept={PROJECT_IMAGE_TYPES.join(",")}
                    onChange={(event) => onSelect(event.target.files?.[0] ?? null)}
                />

                <AdminButton
                    icon={<ImagePlus size={14} />}
                    onClick={() => inputRef.current?.click()}
                >
                    {previewUrl ? "Заменить" : "Выбрать файл"}
                </AdminButton>

                {changed && (
                    <AdminButton icon={<Undo2 size={14} />} onClick={onReset}>
                        Отменить замену
                    </AdminButton>
                )}

                <span className={styles["image__hint"]}>JPG, PNG или WebP, до 5 МБ</span>

                {error && <span className={styles["field__error"]}>{error}</span>}
            </div>
        </div>
    );
};