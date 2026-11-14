"use client";

import { useEffect, useRef } from "react";

import { AdminButton } from "./admin-button";

import type { AdminConfirmProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const AdminConfirm = ({
    open,
    title,
    description,
    confirmLabel = "Удалить",
    cancelLabel = "Отмена",
    pending,
    onConfirm,
    onCancel,
}: AdminConfirmProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return;

        if (open && !dialog.open) dialog.showModal();

        if (!open && dialog.open) dialog.close();
    }, [open]);

    return (
        <dialog
            ref={dialogRef}
            className={styles["confirm"]}
            onCancel={(event) => {
                event.preventDefault();
                onCancel();
            }}
            onClick={(event) => {
                if (event.target === event.currentTarget) onCancel();
            }}
        >
            <div className={styles["confirm__body"]}>
                <h2 className={styles["confirm__title"]}>{title}</h2>
                <p className={styles["confirm__description"]}>{description}</p>

                <div className={styles["confirm__actions"]}>
                    <AdminButton onClick={onCancel}>{cancelLabel}</AdminButton>
                    <AdminButton variant="danger" loading={pending} onClick={onConfirm}>
                        {confirmLabel}
                    </AdminButton>
                </div>
            </div>
        </dialog>
    );
};