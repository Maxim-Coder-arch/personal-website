import { ReactChildren } from "@/src/shared/types/global-types";

import styles from "../../styles/tech-stack.module.scss";

export const TechStackLayout = ({ children }: ReactChildren) => {
    return (
        <section id="tech-stack">
            <div
                className={`${styles["tech-stack"]} min-h-screen py-8 px-6 flex flex-col gap-8`}
            >
                { children }
            </div>
        </section>        
    )
}