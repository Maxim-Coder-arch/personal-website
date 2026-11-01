import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/experience.module.scss";

export const ExperienceLayout = ({ children }: ReactChildren) => {
    return (
        <section
            id="experience"
            aria-labelledby="experience-title"
        >
            <div
                className={`${styles.experience} min-h-screen py-8 px-6`}
            >
                <div className={styles["experience__inner"]}>
                    {children}
                </div>
            </div>
        </section>
    )
}