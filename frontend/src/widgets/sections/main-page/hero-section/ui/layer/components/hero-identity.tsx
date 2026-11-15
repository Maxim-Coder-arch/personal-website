import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

import { SplitReveal } from "@/src/shared/ui/split-reveal";

import {
    HERO_DOT_VARIANTS,
    HERO_EYEBROW_VARIANTS,
    HERO_IDENTITY_VARIANTS,
} from "../../../model/animations";
import { IHeroIdentityProps } from "../../../model/types";

import { useHeroReveal } from "../../../lib/hooks/use-hero-reveal";

import styles from "../../styles/hero-section.module.scss";

export const HeroIdentity = ({
    shouldReduceMotion,
}: IHeroIdentityProps) => {
    const t = useTranslations("hero");
    const revealed = useHeroReveal(shouldReduceMotion);

    return (
        <motion.div
            className={styles["hero__identity"]}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={HERO_IDENTITY_VARIANTS}
        >
            <motion.span
                className={styles["hero__eyebrow"]}
                variants={HERO_EYEBROW_VARIANTS}
            >
                {t("eyebrow")}
            </motion.span>

            <h1>
                <span>
                    <SplitReveal
                        text={t("firstName")}
                        unit="letter"
                        stagger={0.05}
                        delay={0.2}
                        className={styles["hero__name"]}
                    />
                </span>

                <span>
                    <SplitReveal
                        text={t("lastName")}
                        unit="letter"
                        stagger={0.05}
                        delay={0.45}
                        className={styles["hero__name"]}
                    />

                    <motion.span
                        className={styles["hero__dot"]}
                        variants={HERO_DOT_VARIANTS}
                        aria-hidden="true"
                    >
                        .
                    </motion.span>
                </span>
            </h1>
        </motion.div>
    );
};