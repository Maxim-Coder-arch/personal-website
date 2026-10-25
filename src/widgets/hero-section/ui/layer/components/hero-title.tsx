import { heroTitleVariants } from "../../../model/animations";
import { IHeroTitle } from "../../../model/types";

import { motion } from "framer-motion";

import styles from "../../styles/hero-section.module.scss";

export const HeroTitle = ({ initialState, animateState }: IHeroTitle) => {
    return (
        <div
            className={`${styles["hero-section__title"]} flex justify-center`}
        >
            <motion.h1
                variants={heroTitleVariants}
                initial={initialState}
                animate={animateState}
            >
                frontend engineer
            </motion.h1>
        </div>
    )
}