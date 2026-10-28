import { motion } from "framer-motion";

import { TechStackIconProps } from "../../../model/types";
import { iconVariants } from "../../../model/animations";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackIcon = ({
    icon,
    index,
    reduceMotion,
}: TechStackIconProps) => {
    return (
        <motion.div
            className={styles["tech-stack__card-icons__icon"]}
            title={icon.pointerLabel}
            aria-label={icon.pointerLabel}
            variants={iconVariants}
            custom={index}
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            whileHover={reduceMotion ? undefined : "hover"}
            viewport={{ once: true, amount: 0.5 }}
        >
            {icon.svgImage}
        </motion.div>
    );
};
