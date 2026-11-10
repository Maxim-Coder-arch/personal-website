import { MARQUEE_REPEAT } from "../../../model/config";
import { NOT_FOUND_COPY } from "../../../model/data";

import styles from "../../styles/not-found-scene.module.scss";

const ITEMS = Array.from({ length: MARQUEE_REPEAT }, () => NOT_FOUND_COPY.marquee);

export const SceneMarquee = () => {
    return (
        <div className={styles["scene__marquee"]}>
            <div className={styles["scene__marquee-track"]}>
                {[0, 1].map((copy) => (
                    <div key={copy} className={styles["scene__marquee-group"]}>
                        {ITEMS.map((item, index) => (
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