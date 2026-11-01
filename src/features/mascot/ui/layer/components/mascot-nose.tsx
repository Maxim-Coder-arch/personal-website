import { SHAPES } from "../../../model/config";

import styles from "../../styles/mascot.module.scss";

export const MascotNose = () => {
    return (
        <>
            <path className={styles["mascot__nose"]} d={SHAPES.nose} />
            <path className={styles["mascot__line"]} d={SHAPES.noseStem} />
        </>
    );
};