import { ReactChildren } from "@/src/shared/types/global-types";

import { HeroBackground } from "./hero-background";

import styles from "../../styles/hero-section.module.scss";

export const HeroLayout = ({ shouldReduceMotion, children }: ReactChildren & { shouldReduceMotion: boolean | null }) => {
    return (
        <section className={styles["hero"]} id="top">
            <HeroBackground
                shouldReduceMotion={shouldReduceMotion}
            />

            <div className={styles["hero__main"]}>
                { children }
            </div>
        </section>
    )
}