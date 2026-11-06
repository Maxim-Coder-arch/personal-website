import { motion } from "framer-motion";

import { SplitReveal } from "@/src/shared/ui/split-reveal";

import { HEADING_DOT_VARIANTS } from "../../../model/animations";
import type { HeadingTitleProps } from "../../../model/types";

import styles from "../../styles/heading-section.module.scss";

export const HeadingTitle = ({ title }: HeadingTitleProps) => {
    return (
        <h1 className={styles["heading__title"]}>
            <SplitReveal
                text={title}
                unit="letter"
                stagger={0.05}
                delay={0.15}
            />

            <motion.span
                className={styles["heading__dot"]}
                variants={HEADING_DOT_VARIANTS}
                aria-hidden="true"
            >
                .
            </motion.span>
        </h1>
    );
};