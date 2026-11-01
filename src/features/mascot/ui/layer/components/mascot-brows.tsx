import { motion } from "framer-motion";

import { SHAPES, SVG_ORIGIN } from "../../../model/config";
import type { MascotBrowsProps } from "../../../model/types";

import styles from "../../styles/mascot.module.scss";

const BROWS = [
    { d: SHAPES.brows.left, direction: -1 },
    { d: SHAPES.brows.right, direction: 1 },
] as const;

export const MascotBrows = ({ brow, transition }: MascotBrowsProps) => {
    return (
        <>
            {BROWS.map(({ d, direction }) => (
                <motion.path
                    key={d}
                    className={styles["mascot__line"]}
                    d={d}
                    style={SVG_ORIGIN}
                    initial={false}
                    animate={{
                        y: brow.y,
                        rotate: direction * brow.tilt,
                        opacity: brow.opacity,
                    }}
                    transition={transition}
                />
            ))}
        </>
    );
};