import { motion } from "framer-motion";

import { FADE_UP_VARIANTS } from "../../../model/animations";
import type { SlabMetaProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabMeta = ({ number, total }: SlabMetaProps) => {
    return (
        <motion.div
            className={styles["slab__meta"]}
            variants={FADE_UP_VARIANTS}
        >
            <span>PROJECT / {number}</span>
            <span>OF {total}</span>
        </motion.div>
    );
};