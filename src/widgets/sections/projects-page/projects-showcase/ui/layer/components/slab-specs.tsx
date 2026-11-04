import { motion } from "framer-motion";

import {
    SPECS_LIST_VARIANTS,
    SPEC_ROW_VARIANTS,
} from "../../../model/animations";
import type { SlabSpecsProps } from "../../../model/types";

import styles from "../../styles/projects-showcase.module.scss";

export const SlabSpecs = ({ items }: SlabSpecsProps) => {
    return (
        <motion.dl
            className={styles["slab__specs"]}
            variants={SPECS_LIST_VARIANTS}
        >
            {items.map(({ label, value }, index) => (
                <motion.div
                    key={`${label}-${index}`}
                    className={styles["slab__spec"]}
                    variants={SPEC_ROW_VARIANTS}
                >
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                </motion.div>
            ))}
        </motion.dl>
    );
};