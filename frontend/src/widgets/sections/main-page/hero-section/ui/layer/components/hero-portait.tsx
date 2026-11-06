import Image from "next/image";

import { motion } from "framer-motion";

import {
    HERO_IMAGE_SCALE_VARIANTS,
    HERO_IMAGE_VARIANTS,
} from "../../../model/animations";
import { IHeroPortraitProps } from "../../../model/types";

import { useHeroReveal } from "../../../lib/hooks/use-hero-reveal";

import styles from "../../styles/hero-section.module.scss";

export const HeroPortrait = ({
    shouldReduceMotion,
}: IHeroPortraitProps) => {
    const revealed = useHeroReveal(shouldReduceMotion);

    return (
        <motion.div
            className={styles["hero__portrait"]}
            initial={shouldReduceMotion ? false : "hidden"}
            animate={revealed ? "visible" : "hidden"}
            variants={HERO_IMAGE_VARIANTS}
        >
            <motion.div
                className={styles["hero__image-frame"]}
                variants={HERO_IMAGE_SCALE_VARIANTS}
            >
                <Image
                    src="/images/hero-screen.png"
                    alt="Maxim Novikov"
                    fill
                    priority
                    sizes="(max-width: 768px) 75vw, 35vw"
                    className={styles["hero__image"]}
                />
            </motion.div>

            <div className={styles["hero__introduction"]}>
                <p>
                    Design & Code for
                    <br />
                    Meaningful Experiences
                </p>

                <span>BASED ON CREATIVITY & TECHNOLOGY</span>
            </div>
        </motion.div>
    );
};