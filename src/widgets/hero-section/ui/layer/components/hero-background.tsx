import { motion } from "framer-motion";

import { HERO_CONTENT_VARIANTS } from "../../../model/animations";
import { IHeroBackgroundProps } from "../../../model/types";

import styles from "../../styles/hero-section.module.scss";

export const HeroBackground = ({
    shouldReduceMotion,
}: IHeroBackgroundProps) => {
    return (
        <motion.div
            className={styles["hero__background"]}
            aria-hidden="true"
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <motion.span
                    key={index}
                    initial={
                        shouldReduceMotion
                            ? false
                            : HERO_CONTENT_VARIANTS.hidden
                    }
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    transition={{
                        delay: shouldReduceMotion ? 0 : 0.1 * index,
                    }}
                >
                    PORTFOLIO
                </motion.span>
            ))}
        </motion.div>
    );
};