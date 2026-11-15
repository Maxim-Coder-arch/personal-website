import { useTranslations } from "next-intl";

import { MARQUEE_REPEAT } from "../../../model/config";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneMarquee = () => {
    const t = useTranslations("notFound");
    const items = Array.from({ length: MARQUEE_REPEAT }, () => t("marquee"));

    return (
        <div className={styles["scene__marquee"]}>
            <div className={styles["scene__marquee-track"]}>
                {[0, 1].map((copy) => (
                    <div key={copy} className={styles["scene__marquee-group"]}>
                        {items.map((item, index) => (
                            <span
                                key={index}
                                className={styles["scene__marquee-item"]}
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};