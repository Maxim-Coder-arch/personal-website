import { HeroSection } from "@/src/widgets/hero-section";

import styles from "../styles/main-page.module.scss";
import { Projects } from "@/src/widgets/projects";
import { TechStack } from "@/src/widgets/tech-stack";
import { Experience } from "@/src/widgets/experience/ui/layer/experience";

export const MainPage = () => {

    console.log(styles)

    return (
        <div className={`${styles["main-page-layer"]} min-h-screen`}>
            <HeroSection />
            <Projects />
            <TechStack />
            <Experience />
        </div>
    )
}