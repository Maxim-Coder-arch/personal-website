"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { LENS_VARIANTS, PULSE_TRANSITION } from "../../../model/animations";
import { NOT_FOUND_COPY } from "../../../model/data";
import type { SceneLensProps } from "../../../model/types";

import { SceneDigit } from "./scene-digit";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneLens = ({ x, y }: SceneLensProps) => {
    const [pulse, setPulse] = useState(0);

    return (
        <div
            className={`${styles["scene__layer"]} ${styles["scene__layer--lens"]}`}
            aria-hidden="true"
        >
            <div className={styles["scene__digits"]}>
                <SceneDigit index={0} ghost>
                    4
                </SceneDigit>

                <motion.div
                    className={styles["scene__lens"]}
                    variants={LENS_VARIANTS}
                >
                    <div
                        className={styles["scene__lens-body"]}
                        onClick={() => setPulse((value) => value + 1)}
                    >
                        <motion.div
                            className={styles["scene__lens-scene"]}
                            style={{ x, y }}
                        />

                        <span className={styles["scene__lens-label"]}>
                            {NOT_FOUND_COPY.lensLabel}
                        </span>
                    </div>

                    {pulse > 0 && (
                        <motion.span
                            key={pulse}
                            className={styles["scene__lens-pulse"]}
                            initial={{ scale: 1, opacity: 0.8 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={PULSE_TRANSITION}
                        />
                    )}
                </motion.div>

                <SceneDigit index={2} ghost>
                    4
                </SceneDigit>
            </div>
        </div>
    );
};