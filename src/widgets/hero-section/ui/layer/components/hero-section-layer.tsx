import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/hero-section.module.scss";

export const HeroSectionLayer = ({ children }: ReactChildren) => {
    return (
        <div
            className={`${styles["hero-section"]} min-h-screen flex flex-col justify-center gap-4`}
        >
            { children }
        </div>
    )
}