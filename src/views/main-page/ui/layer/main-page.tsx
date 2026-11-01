import { HeroSection } from "@/src/widgets/sections/main-page/hero-section";
import { Projects } from "@/src/widgets/sections/main-page/projects";
import { TechStack } from "@/src/widgets/sections/main-page/tech-stack";
import { Experience } from "@/src/widgets/sections/main-page/experience";
import { ThoughtsDevelopment } from "@/src/widgets/sections/main-page/thoughts-development";
import { Scenic } from "@/src/widgets/sections/main-page/scenic";

import { MainPageLayout } from "./main-page-layout";

export const MainPage = () => {
    return (
        <MainPageLayout>
            <HeroSection />
            <Projects />
            <TechStack />
            <Experience />
            <ThoughtsDevelopment />
            <Scenic />
        </MainPageLayout>
    )
}