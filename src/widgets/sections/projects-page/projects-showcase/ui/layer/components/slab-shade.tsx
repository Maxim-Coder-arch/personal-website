import { motion } from "framer-motion";

import type { SlabShadeProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabShade = ({ opacity }: SlabShadeProps) => {
    return (
        <motion.div
            className={styles["slab__shade"]}
            style={{ opacity }}
            aria-hidden="true"
        />
    );
};