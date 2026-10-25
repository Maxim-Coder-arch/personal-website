import { ArrowBottomIcon } from "@/src/shared/icons/arrow-bottom";
import { GithubIcon } from "@/src/shared/icons/github";

import { 
    heroArrowHover, 
    heroDecoratorsVariants, 
    heroGithubHover
} from "../../../model/animations"

import { IHeroDecorators } from "../../../model/types";

import { motion } from "framer-motion";

import styles from "../../styles/hero-section.module.scss";

export const HeroDecorators = ({ 
    initialState, 
    animateState, 
    shouldReduceMotion
}: IHeroDecorators) => {
    return (
        <motion.div
            className={`${styles["hero-section__decorators"]} flex justify-between`}
            variants={heroDecoratorsVariants}
            initial={initialState}
            animate={animateState}
        >
            <div
                className={`${styles["hero-section__decorators__github"]} flex items-center`}
            >
                <motion.a
                    href="https://github.com/Maxim-Coder-arch"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Мой GitHub"
                    whileHover={
                        shouldReduceMotion ? undefined : heroGithubHover
                    }
                >
                    <GithubIcon />
                </motion.a>
            </div>

            <motion.div
                className={styles["hero-section__decorators__decorate"]}
                whileHover={
                    shouldReduceMotion ? undefined : heroArrowHover
                }
            >
                <ArrowBottomIcon />
            </motion.div>
        </motion.div>
    )
}