import { motion } from "framer-motion";

import { HEADING_VARIANTS } from "../../../model/animations";
import type { HeadingLayoutProps } from "../../../model/types";

import styles from "../../styles/heading-section.module.scss";

export const HeadingLayout = ({
    revealed,
    shouldReduceMotion,
    children,
}: HeadingLayoutProps) => {
    return (
        <motion.section
            id="projects-heading"
            className={styles["heading"]}
            variants={HEADING_VARIANTS}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
        >
            {children}
        </motion.section>
    );
};