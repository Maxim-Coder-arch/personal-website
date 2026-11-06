import type { ClosingMarqueeProps } from "../../../model/types";

import styles from "../../styles/closing-section.module.scss";

export const ClosingMarquee = ({ items }: ClosingMarqueeProps) => {
    const rows = [
        { id: "forward", list: items, reverse: false },
        { id: "backward", list: [...items].reverse(), reverse: true },
    ];

    return (
        <div
            className={styles["closing__marquee"]}
            aria-hidden="true"
        >
            {rows.map(({ id, list, reverse }) => (
                <div
                    key={id}
                    className={styles["closing__row"]}
                >
                    <div
                        className={`${styles["closing__track"]} ${
                            reverse ? styles["closing__track--reverse"] : ""
                        }`}
                    >
                        {[0, 1].map((copy) => (
                            <div
                                key={copy}
                                className={styles["closing__group"]}
                            >
                                {list.map((item, index) => (
                                    <span
                                        key={`${item}-${index}`}
                                        className={styles["closing__item"]}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};