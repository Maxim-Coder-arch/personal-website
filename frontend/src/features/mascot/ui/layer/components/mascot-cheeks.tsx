import { motion } from "framer-motion";

import { SHAPES } from "../../../model/config";
import type { MascotCheeksProps } from "../../../model/types";

import styles from "../../styles/mascot.module.scss";

export const MascotCheeks = ({ opacity, transition }: MascotCheeksProps) => {
    return (
        <>
            {SHAPES.cheeks.map((cheek) => (
                <motion.ellipse
                    key={cheek.cx}
                    className={styles["mascot__cheek"]}
                    {...cheek}
                    initial={false}
                    animate={{ opacity }}
                    transition={transition}
                />
            ))}
        </>
    );
};