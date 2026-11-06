import type { ClosingStatementProps } from "../../../model/types";

import { ScrollWord } from "./scroll-word";

import styles from "../../styles/closing-section.module.scss";

export const ClosingStatement = ({
    ref,
    lines,
    total,
    progress,
}: ClosingStatementProps) => {
    return (
        <h2
            ref={ref}
            className={styles["closing__statement"]}
        >
            {lines.map((line, lineIndex) => (
                <span
                    key={lineIndex}
                    className={styles["closing__line"]}
                >
                    {line.map(({ text, index }) => (
                        <ScrollWord
                            key={index}
                            text={text}
                            index={index}
                            total={total}
                            progress={progress}
                        />
                    ))}

                    {lineIndex === lines.length - 1 && (
                        <span className={styles["closing__dot"]}>.</span>
                    )}
                </span>
            ))}
        </h2>
    );
};