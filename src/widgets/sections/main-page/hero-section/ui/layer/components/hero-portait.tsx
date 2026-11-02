import Image from "next/image";

import { motion } from "framer-motion";

import { HERO_IMAGE_VARIANTS } from "../../../model/animations";
import { IHeroPortraitProps } from "../../../model/types";

import styles from "../../styles/hero-section.module.scss";
import { useHeroReveal } from "../../../lib/hooks/use-hero-reveal";

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
            <Image
                src="/images/hero-screen.png"
                alt="Maxim Novikov"
                fill
                priority
                sizes="(max-width: 768px) 75vw, 35vw"
                className={styles["hero__image"]}
            />

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