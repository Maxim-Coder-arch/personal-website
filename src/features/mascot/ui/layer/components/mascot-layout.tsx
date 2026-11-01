import { motion } from "framer-motion";

import { SHAPES } from "../../../model/config";
import type { MascotLayoutProps } from "../../../model/types";

import styles from "../../styles/mascot.module.scss";

export const MascotLayout = ({
    ref,
    hop,
    tap,
    onClick,
    children,
}: MascotLayoutProps) => {
    return (
        <div
            ref={ref}
            className={styles["mascot"]}
            aria-hidden="true"
        >
            <motion.div
                animate={hop}
                whileTap={tap}
                onClick={onClick}
            >
                <svg
                    className={styles["mascot__svg"]}
                    viewBox={SHAPES.viewBox}
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {children}
                </svg>
            </motion.div>
        </div>
    );
};