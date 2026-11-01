"use client";

import { motion } from "framer-motion";

import { FACE, SVG_ORIGIN } from "../../../model/config";
import { lidPath } from "../../../lib/helpers/paths";

import { MascotEyeProps } from "../../../model/types";

import styles from "../../styles/mascot.module.scss";

export const MascotEye = ({
    cx,
    scale,
    closed,
    lid,
    pupilScale,
    pupilX,
    pupilY,
    transition,
}: MascotEyeProps) => {
    return (
        <>
            <motion.g
                style={SVG_ORIGIN}
                initial={false}
                animate={{ scaleY: closed ? 0.1 : scale, opacity: closed ? 0 : 1 }}
                transition={transition}
            >
                <ellipse
                    className={styles["mascot__eye-white"]}
                    cx={cx}
                    cy={FACE.eyeY}
                    rx={FACE.eyeRx}
                    ry={FACE.eyeRy}
                />

                <motion.g
                    style={{ ...SVG_ORIGIN, x: pupilX, y: pupilY }}
                    initial={false}
                    animate={{ scale: pupilScale }}
                    transition={transition}
                >
                    <circle
                        className={styles["mascot__pupil"]}
                        cx={cx}
                        cy={FACE.eyeY}
                        r={FACE.pupilR}
                    />
                    <circle
                        className={styles["mascot__glint"]}
                        cx={cx + 1.8}
                        cy={FACE.eyeY - 2}
                        r={1.5}
                    />
                </motion.g>
            </motion.g>

            <motion.path
                className={styles["mascot__line"]}
                d={lidPath(cx, lid)}
                initial={false}
                animate={{ d: lidPath(cx, lid), opacity: closed ? 1 : 0 }}
                transition={transition}
            />
        </>
    );
};