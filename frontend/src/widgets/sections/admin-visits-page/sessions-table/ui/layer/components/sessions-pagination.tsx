"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import type { SessionsPaginationProps } from "../../../model/types";

import styles from "../../styles/sessions-table.module.scss";

export const SessionsPagination = ({ page, pageCount, onChange }: SessionsPaginationProps) => {
    return (
        <nav className={styles["pagination"]} aria-label="Страницы">
            <button
                type="button"
                className={styles["pagination__button"]}
                disabled={page <= 1}
                aria-label="Назад"
                onClick={() => onChange(page - 1)}
            >
                <ChevronLeft size={16} />
            </button>

            <span className={styles["pagination__label"]}>
                Страница {page} из {pageCount}
            </span>

            <button
                type="button"
                className={styles["pagination__button"]}
                disabled={page >= pageCount}
                aria-label="Вперёд"
                onClick={() => onChange(page + 1)}
            >
                <ChevronRight size={16} />
            </button>
        </nav>
    );
};