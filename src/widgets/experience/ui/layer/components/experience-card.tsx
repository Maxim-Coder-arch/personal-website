
import { motion } from "framer-motion";

import { animation, cardVariantsExperienceCard, labels } from "../../../model/animations";
import { ExperienceCardProps } from "../../../model/type";

import { ExperienceCardContent } from "./experience-card-content";

import styles from "../../styles/experience.module.scss";


export const ExperienceCard = ({
    experience,
    index,
    shouldReduceMotion,
}: ExperienceCardProps) => {
    const cardNumber = String(index + 1).padStart(2, "0");

    const footerLabel =
        index === 0
            ? `${cardNumber} / ${labels.current}`
            : `${cardNumber} / ${labels.experience}`;

    return (
        <motion.article
            className={styles["experience__card"]}
            variants={
                shouldReduceMotion ? undefined : cardVariantsExperienceCard
            }
            whileHover={
                shouldReduceMotion
                    ? undefined
                    : {
                          y: animation.hover.offsetY,
                          transition: {
                              duration: animation.hover.duration,
                          },
                      }
            }
        >
            <div className={styles["experience__card-top"]}>
                <span className={styles["experience__card-number"]}>
                    {cardNumber}
                </span>

                <span
                    className={styles["experience__card-indicator"]}
                    aria-hidden="true"
                />
            </div>

            <ExperienceCardContent experience={experience} />

            <div className={styles["experience__card-footer"]}>
                <span>{footerLabel}</span>
            </div>
        </motion.article>
    );
};