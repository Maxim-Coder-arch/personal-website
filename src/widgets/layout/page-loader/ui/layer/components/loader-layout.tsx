import type { LoaderLayoutProps } from "../../../model/types";



import styles from "../../styles/page-loader.module.scss";
import { LoaderCurtains } from "./loader-curtains";

export const LoaderLayout = ({
    revealing,
    onSkip,
    children,
}: LoaderLayoutProps) => {
    return (
        <div
            className={`${styles["page-loader"]} ${
                revealing ? styles["page-loader--revealing"] : ""
            }`}
            aria-hidden="true"
        >
            <div
                className={styles["page-loader__stage"]}
                onClick={onSkip}
            >
                {children}
            </div>

            <LoaderCurtains open={revealing} />
        </div>
    );
};