"use client";

import type { FooterTopButtonProps } from "../../../model/types";

import styles from "../../styles/footer.module.scss";

export const FooterTopButton = ({ label }: FooterTopButtonProps) => {
    const handleClick = () => {
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    };

    return (
        <button
            type="button"
            className={styles["footer__top-button"]}
            onClick={handleClick}
        >
            <span>{label}</span>
            <span aria-hidden="true">↑</span>
        </button>
    );
};