import { menuAnimationConfig } from "../../../model/animations";
import { MenuLayoutProps } from "../../../model/types";

import { motion } from "framer-motion";

import styles from "../../styles/menu.module.scss";

export const MenuLayout = ({
    children,
    shouldReduceMotion,
    onMouseLeave,
}: MenuLayoutProps) => {
    return (
        <motion.nav
            className={`${styles["hero-nav"]} w-full fixed flex justify-center`}
            initial={
                shouldReduceMotion
                    ? false
                    : menuAnimationConfig.appearance.initial
            }
            animate={menuAnimationConfig.appearance.animate}
        >
            <div
                className={`${styles["hero-nav__sections"]} rounded-3xl flex justify-center p-1`}
                onMouseLeave={onMouseLeave}
            >
                <motion.ul
                    className="flex items-center gap-2"
                    variants={menuAnimationConfig.list}
                    initial={shouldReduceMotion ? false : "hidden"}
                    animate="visible"
                >
                    {children}
                </motion.ul>
            </div>
        </motion.nav>
    );
};