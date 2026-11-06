import { motion } from "framer-motion";

import { COUNTER_TRANSITION } from "../../../model/config";
import type { LoaderCounterProps } from "../../../model/types";

import styles from "../../styles/page-loader.module.scss";

export const LoaderCounter = ({ value, hidden }: LoaderCounterProps) => {
    return (
        <motion.div
            className={styles["page-loader__counter"]}
            initial={false}
            animate={{ opacity: hidden ? 0 : 1 }}
            transition={COUNTER_TRANSITION}
        >
            <motion.span>{value}</motion.span>
            <span className={styles["page-loader__counter-dot"]}>.</span>
            <span className={styles["page-loader__counter-total"]}>/ 100</span>
        </motion.div>
    );
};