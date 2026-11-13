"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useArticleModal } from "../../lib/hooks/use-article-modal";
import { useArticleReader } from "../../lib/hooks/use-article-reader";
import {
    PANEL_VARIANTS,
    REDUCED_PANEL_VARIANTS,
} from "../../model/animations";
import type { ArticleModalProps } from "../../model/types";

import { ArticleReader } from "./components/article-reader";

import styles from "../styles/article-reader.module.scss";

export const ArticleModal = ({ article }: ArticleModalProps) => {
    const shouldReduceMotion = useReducedMotion();
    const { reading, enterReading, exitReading } = useArticleReader();

    const {
        dialogRef,
        closing,
        requestClose,
        finishClose,
        handleCancel,
        handleBackdropClick,
    } = useArticleModal({ reading, onExitReading: exitReading });

    return (
        <dialog
            ref={dialogRef}
            className={styles["modal"]}
            data-closing={closing}
            data-reading={reading}
            aria-labelledby={`article-title-${article.id}`}
            onCancel={handleCancel}
            onClose={requestClose}
            onClick={handleBackdropClick}
        >
            <motion.div
                className={styles["modal__panel"]}
                data-mode={reading ? "reading" : "default"}
                variants={
                    shouldReduceMotion
                        ? REDUCED_PANEL_VARIANTS
                        : PANEL_VARIANTS
                }
                initial="hidden"
                animate={closing ? "exit" : "visible"}
                onAnimationComplete={(definition) => {
                    if (definition === "exit") finishClose();
                }}
            >
                <ArticleReader
                    article={article}
                    variant="modal"
                    reading={reading}
                    onEnterReading={enterReading}
                    onExitReading={exitReading}
                    onClose={requestClose}
                />
            </motion.div>
        </dialog>
    );
};