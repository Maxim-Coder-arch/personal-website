import { motion } from "framer-motion";

import { useTranslations } from "next-intl";

import { FADE_VARIANTS } from "../../../model/animations";
import { NOT_FOUND_TECH } from "../../../model/data";

import { SceneActions } from "./scene-actions";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneContent = () => {
    const t = useTranslations("notFound");

    return (
        <div className={styles["scene__content"]}>
            <motion.div className={styles["scene__top"]} variants={FADE_VARIANTS}>
                <span className={styles["scene__eyebrow"]}>
                    {t("eyebrow")}
                </span>
                <span className={styles["scene__code"]}>
                    ({NOT_FOUND_TECH.code})
                </span>
            </motion.div>

            <div className={styles["scene__bottom"]}>
                <motion.div
                    className={styles["scene__copy"]}
                    variants={FADE_VARIANTS}
                >
                    <h1 className={styles["scene__title"]}>
                        {t("title")}
                    </h1>
                    <p className={styles["scene__text"]}>{t("text")}</p>
                </motion.div>

                <SceneActions />
            </div>
        </div>
    );
};