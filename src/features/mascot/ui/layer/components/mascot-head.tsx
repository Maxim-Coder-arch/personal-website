import { SHAPES } from "../../../model/config";

import styles from "../../styles/mascot.module.scss";

const headClass = `${styles["mascot__head"]} ${styles["mascot__hit"]}`;

export const MascotHead = () => {
    return (
        <>
            {SHAPES.ears.map((d) => (
                <path key={d} className={headClass} d={d} />
            ))}

            {SHAPES.innerEars.map((d) => (
                <path key={d} className={styles["mascot__inner-ear"]} d={d} />
            ))}

            <ellipse className={headClass} {...SHAPES.head} />
        </>
    );
};