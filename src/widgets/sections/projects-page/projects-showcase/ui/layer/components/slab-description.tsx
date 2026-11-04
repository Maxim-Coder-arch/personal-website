import { motion } from "framer-motion";

import { FADE_UP_VARIANTS } from "../../../model/animations";
import type { SlabDescriptionProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabDescription = ({ text }: SlabDescriptionProps) => {
    return (
        <motion.p
            className={styles["slab__description"]}
            variants={FADE_UP_VARIANTS}
        >
            {text}
        </motion.p>
    );
};