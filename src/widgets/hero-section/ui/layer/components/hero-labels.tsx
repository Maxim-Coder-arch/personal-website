import { 
    heroButtonHover, 
    heroDescriptionVariants, 
    heroPortraitVariants, 
    heroTextVariants
} from "../../../model/animations";

import { IHeroLabels } from "../../../model/types";

import { ArrowRightUp } from "@/src/shared/icons/arrow-right-up";
import portret from "@/public/images/hero-screen.png";

import { motion } from "framer-motion";

import Image from "next/image";

import styles from "../../styles/hero-section.module.scss";

export const HeroLabels = ({ 
    initialState, 
    animateState, 
    shouldReduceMotion
}: IHeroLabels) => {
    return (
        <div
            className={`${styles["hero-section__labels"]} flex justify-between`}
        >
            <motion.div
                className={styles["hero-section__labels__subtitle"]}
                variants={heroTextVariants}
                initial={initialState}
                animate={animateState}
            >
                <h2>maxim novikov</h2>
                <p>Frontend разработчик</p>
                <p>react / next.js / typescript</p>
            </motion.div>

            <div className={styles["hero-section__labels__portret"]}>
                <motion.div
                    variants={heroPortraitVariants}
                    initial={initialState}
                    animate={animateState}
                    style={{
                        width: "100%",
                        height: "100%",
                        transformOrigin: "center center",
                    }}
                >
                    <Image
                        src={portret}
                        width={500}
                        height={600}
                        alt="Maxim"
                        priority
                        sizes="(max-width: 768px) 72vw, 35vw"
                    />
                </motion.div>
            </div>

            <motion.div
                className={styles["hero-section__labels__hero-link"]}
                variants={heroDescriptionVariants}
                initial={initialState}
                animate={animateState}
            >
                <motion.p
                    variants={heroTextVariants}
                >
                    I build modern web experiences with a focus on clean
                    architecture, performance and thoughtful interaction.
                </motion.p>

                <motion.a
                    href="#contact"
                    aria-label="Связаться со мной"
                    className="rounded-full flex items-center justify-center"
                    whileHover={shouldReduceMotion ? undefined : heroButtonHover}
                >
                    <ArrowRightUp />
                </motion.a>
            </motion.div>
        </div>
    )
}