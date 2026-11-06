import { SHAPES } from "../../../model/config";

import styles from "../../styles/mascot.module.scss";

export const MascotWhiskers = () => {
    return (
        <>
            <path className={styles["mascot__line"]} d={SHAPES.whiskers.left} />
            <path className={styles["mascot__line"]} d={SHAPES.whiskers.right} />
        </>
    );
};