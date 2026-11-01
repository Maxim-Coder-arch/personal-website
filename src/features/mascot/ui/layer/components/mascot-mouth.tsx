import { motion } from "framer-motion";

import { MOUTH_PATHS, SHAPES, SVG_ORIGIN } from "../../../model/config";
import type { MascotMouthProps } from "../../../model/types";

import styles from "../../styles/mascot.module.scss";

export const MascotMouth = ({ shape, transition }: MascotMouthProps) => {
    const isOpen = shape === "open";

    return (
        <>
            <motion.path
                className={styles["mascot__line"]}
                d={MOUTH_PATHS.smile}
                initial={false}
                animate={{ d: MOUTH_PATHS[shape], opacity: isOpen ? 0 : 1 }}
                transition={transition}
            />

            <motion.ellipse
                className={styles["mascot__mouth-open"]}
                {...SHAPES.mouthOpen}
                style={SVG_ORIGIN}
                initial={false}
                animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.4 }}
                transition={transition}
            />
        </>
    );
};