import { EYE } from "../../../model/config";
import type { LoaderEyesProps } from "../../../model/types";

import { LoaderEye } from "./loader-eye";

import styles from "../../styles/page-loader.module.scss";

export const LoaderEyes = ({
    eyes,
    expanding,
    pupilX,
    pupilY,
}: LoaderEyesProps) => {
    return (
        <svg
            className={styles["page-loader__eyes"]}
            viewBox={EYE.viewBox}
            xmlns="http://www.w3.org/2000/svg"
        >
            {EYE.centers.map((cx, index) => (
                <LoaderEye
                    key={cx}
                    cx={cx}
                    closed={eyes[index].closed}
                    curve={eyes[index].curve}
                    expanding={expanding}
                    pupilX={pupilX}
                    pupilY={pupilY}
                />
            ))}
        </svg>
    );
};