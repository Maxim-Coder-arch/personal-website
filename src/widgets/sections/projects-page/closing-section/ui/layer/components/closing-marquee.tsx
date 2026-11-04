import type { ClosingMarqueeProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ClosingMarquee = ({ items }: ClosingMarqueeProps) => {
    return (
        <div
            className={styles["closing__marquee"]}
            aria-hidden="true"
        >
            <div className={styles["closing__track"]}>
                {[0, 1].map((copy) => (
                    <div
                        key={copy}
                        className={styles["closing__group"]}
                    >
                        {items.map((item) => (
                            <span
                                key={item}
                                className={styles["closing__item"]}
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