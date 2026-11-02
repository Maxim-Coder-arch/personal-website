import { motion } from "framer-motion";

import {
    EXPAND_TRANSITION,
    EYE,
    EYE_TRANSITION,
    PUPIL_TRANSITION,
    SVG_ORIGIN,
} from "../../../model/config";
import type { LoaderEyeProps } from "../../../model/types";

import { lidPath } from "../../../lib/helpers/lid-path";

import styles from "../../styles/page-loader.module.scss";

export const LoaderEye = ({
    cx,
    closed,
    curve,
    expanding,
    pupilX,
    pupilY,
}: LoaderEyeProps) => {
    return (
        <>
            <motion.g
                style={SVG_ORIGIN}
                initial={false}
                animate={{ scaleY: closed ? 0.1 : 1, opacity: closed ? 0 : 1 }}
                transition={EYE_TRANSITION}
            >
                <motion.ellipse
                    className={styles["page-loader__eye"]}
                    cx={cx}
                    cy={EYE.cy}
                    rx={EYE.rx}
                    ry={EYE.ry}
                    style={SVG_ORIGIN}
                    initial={false}
                    animate={{ scale: expanding ? EYE.expandScale : 1 }}
                    transition={expanding ? EXPAND_TRANSITION : EYE_TRANSITION}
                />

                <motion.g
                    style={{ ...SVG_ORIGIN, x: pupilX, y: pupilY }}
                    initial={false}
                    animate={{ scale: expanding ? 0 : 1 }}
                    transition={PUPIL_TRANSITION}
                >
                    <circle
                        className={styles["page-loader__pupil"]}
                        cx={cx}
                        cy={EYE.cy}
                        r={EYE.pupilR}
                    />
                    <circle
                        className={styles["page-loader__glint"]}
                        cx={cx + 4}
                        cy={EYE.cy - 4}
                        r={EYE.glintR}
                    />
                </motion.g>
            </motion.g>

            <motion.path
                className={styles["page-loader__lid"]}
                d={lidPath(cx, curve)}
                initial={false}
                animate={{ d: lidPath(cx, curve), opacity: closed ? 1 : 0 }}
                transition={EYE_TRANSITION}
            />
        </>
    );
};