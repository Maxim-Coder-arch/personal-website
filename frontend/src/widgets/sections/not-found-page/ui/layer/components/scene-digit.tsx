import { motion } from "framer-motion";

import { DIGIT_VARIANTS } from "../../../model/animations";
import type { SceneDigitProps } from "../../../model/types";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneDigit = ({ index, ghost = false, children }: SceneDigitProps) => {
    return (
        <span
            className={`${styles["scene__digit"]} ${
                ghost ? styles["scene__digit--ghost"] : ""
            }`}
        >
            {ghost ? (
                children
            ) : (
                <motion.span
                    className={styles["scene__digit-glyph"]}
                    variants={DIGIT_VARIANTS}
                    custom={index}
                >
                    {children}
                </motion.span>
            )}
        </span>
    );
};