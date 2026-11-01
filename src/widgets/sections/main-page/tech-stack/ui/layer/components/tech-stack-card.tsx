"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cardVariants, TECH_STACK_CONFIG } from "../../../model/animations";
import { TechStackCardProps } from "../../../model/types";

import { TechStackIcons } from "./tech-stack-icons";
import { TechStackCardContent } from "./tech-stack-card-content";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackCard = ({
    technology,
    index,
}: TechStackCardProps) => {
    const shouldReduceMotion = useReducedMotion() ?? false;

    return (
        <motion.article
            className={styles["tech-stack__card"]}
            custom={index}
            variants={cardVariants}
            initial={shouldReduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{
                once: true,
                amount: TECH_STACK_CONFIG.animation.viewportAmount,
            }}
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                          y: TECH_STACK_CONFIG.animation.cardHoverOffsetY,
                      }
            }
        >
            <TechStackIcons
                icons={technology.icons}
                reduceMotion={shouldReduceMotion}
            />

            <TechStackCardContent technology={technology} />
        </motion.article>
    );
};
