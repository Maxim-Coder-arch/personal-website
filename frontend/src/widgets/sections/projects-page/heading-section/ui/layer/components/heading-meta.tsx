import { motion } from "framer-motion";

import { HEADING_FADE_VARIANTS } from "../../../model/animations";
import type { HeadingMetaProps } from "../../../model/types";

import styles from "../../styles/heading-section.module.scss";

export const HeadingMeta = ({ eyebrow, total }: HeadingMetaProps) => {
    return (
        <motion.div
            className={styles["heading__top"]}
            variants={HEADING_FADE_VARIANTS}
        >
            <span className={styles["heading__eyebrow"]}>{eyebrow}</span>

            <span className={styles["heading__count"]}>
                ({String(total).padStart(2, "0")})
            </span>
        </motion.div>
    );
};