import { motion } from "framer-motion";

import { ArrowBottomIcon } from "@/src/shared/icons/arrowes/arrow-bottom";

import {
    HEADING_FADE_VARIANTS,
    HEADING_LINE_VARIANTS,
} from "../../../model/animations";
import type { HeadingFooterProps } from "../../../model/types";

import styles from "../../styles/heading-section.module.scss";

export const HeadingFooter = ({ description, hint }: HeadingFooterProps) => {
    return (
        <div className={styles["heading__bottom"]}>
            <motion.span
                className={styles["heading__line"]}
                variants={HEADING_LINE_VARIANTS}
                aria-hidden="true"
            />

            <motion.p
                className={styles["heading__description"]}
                variants={HEADING_FADE_VARIANTS}
            >
                {description}
            </motion.p>

            <motion.span
                className={styles["heading__hint"]}
                variants={HEADING_FADE_VARIANTS}
            >
                {hint}
                <span className={styles["heading__hint-icon"]}>
                    <ArrowBottomIcon />
                </span>
            </motion.span>
        </div>
    );
};