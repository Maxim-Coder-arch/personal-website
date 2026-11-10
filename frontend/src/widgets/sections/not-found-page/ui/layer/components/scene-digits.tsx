import { SceneDigit } from "./scene-digit";

import styles from "../../styles/not-found-scene.module.scss";

export const SceneDigits = () => {
    return (
        <div className={styles["scene__digits"]}>
            <SceneDigit index={0}>4</SceneDigit>
            <span className={styles["scene__lens-gap"]} />
            <SceneDigit index={2}>4</SceneDigit>
        </div>
    );
};