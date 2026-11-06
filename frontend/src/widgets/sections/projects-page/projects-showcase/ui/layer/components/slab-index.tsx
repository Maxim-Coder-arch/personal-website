import { motion } from "framer-motion";

import { INDEX_VARIANTS } from "../../../model/animations";
import type { SlabIndexProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabIndex = ({ number, direction }: SlabIndexProps) => {
    return (
        <motion.span
            className={styles["slab__index"]}
            variants={INDEX_VARIANTS}
            custom={direction}
            aria-hidden="true"
        >
            {number}
        </motion.span>
    );
};