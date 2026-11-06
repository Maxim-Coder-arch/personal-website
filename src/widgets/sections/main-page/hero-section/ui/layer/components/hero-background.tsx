import { motion } from "framer-motion";

import {
    HERO_BACKGROUND_ROW_VARIANTS,
    HERO_BACKGROUND_VARIANTS,
} from "../../../model/animations";
import { IHeroBackgroundProps } from "../../../model/types";

import { useHeroReveal } from "../../../lib/hooks/use-hero-reveal";

import styles from "../../styles/hero-section.module.scss";

export const HeroBackground = ({
    shouldReduceMotion,
}: IHeroBackgroundProps) => {
    const revealed = useHeroReveal(shouldReduceMotion);

    return (
        <motion.div
            className={styles["hero__background"]}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={HERO_BACKGROUND_VARIANTS}
            aria-hidden="true"
        >
            {Array.from({ length: 5 }).map((_, index) => (
                <motion.span
                    key={index}
                    variants={HERO_BACKGROUND_ROW_VARIANTS}
                >
                    PORTFOLIO
                </motion.span>
            ))}
        </motion.div>
    );
};