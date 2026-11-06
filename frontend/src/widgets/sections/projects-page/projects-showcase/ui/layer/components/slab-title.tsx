import { motion } from "framer-motion";

import { SplitReveal } from "@/src/shared/ui/split-reveal";

import { DOT_VARIANTS, FADE_UP_VARIANTS } from "../../../model/animations";
import type { SlabTitleProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabTitle = ({ title, subtitle }: SlabTitleProps) => {
    return (
        <div>
            <h2 className={styles["slab__title"]}>
                <SplitReveal
                    text={title}
                    unit="word"
                    stagger={0.1}
                />

                <motion.span
                    className={styles["slab__dot"]}
                    variants={DOT_VARIANTS}
                    aria-hidden="true"
                >
                    .
                </motion.span>
            </h2>

            <motion.p
                className={styles["slab__subtitle"]}
                variants={FADE_UP_VARIANTS}
            >
                {subtitle}
            </motion.p>
        </div>
    );
};