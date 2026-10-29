import { HeroSection } from "@/src/widgets/hero-section";
import { Projects } from "@/src/widgets/projects";
import { TechStack } from "@/src/widgets/tech-stack";
import { Experience } from "@/src/widgets/experience";

import { MainPageLayout } from "./main-page-layout";

export const MainPage = () => {
    return (
        <MainPageLayout>
            <HeroSection />
            <Projects />
            <TechStack />
            <Experience />
        </MainPageLayout>
    )
}