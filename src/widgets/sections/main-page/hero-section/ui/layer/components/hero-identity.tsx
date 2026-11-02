import { motion } from "framer-motion";

import { HERO_CONTENT_VARIANTS } from "../../../model/animations";
import { IHeroIdentityProps } from "../../../model/types";

import { useHeroReveal } from "../../../lib/hooks/use-hero-reveal";

import styles from "../../styles/hero-section.module.scss";

export const HeroIdentity = ({
    shouldReduceMotion,
}: IHeroIdentityProps) => {
    const revealed = useHeroReveal(shouldReduceMotion);
    
    return (
        <motion.div
            className={styles["hero__identity"]}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={HERO_CONTENT_VARIANTS}
        >
            <span className={styles["hero__eyebrow"]}>
                MAXIM NOVIKOV — FRONTEND DEVELOPER
            </span>

            <h1>
                <span>MAXIM</span>
                <span>
                    NOVIKOV<span className={styles["hero__dot"]}>.</span>
                </span>
            </h1>
        </motion.div>
    );
};