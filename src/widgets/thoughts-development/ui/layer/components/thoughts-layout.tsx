import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/thoughts-development.module.scss";

export const ThoughtsLayout = ({ children }: ReactChildren) => {
    return (
        <section
            id="thoughts-development"
            aria-labelledby="thoughts-title"
        >
            <div
                className={`${styles["thoughts-development"]} min-h-screen py-8 px-6 flex flex-col gap-16`}
            >
                { children }
            </div>
        </section>
    )
}