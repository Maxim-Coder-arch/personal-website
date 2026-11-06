import { getArticles } from "@/src/entities/article";

import { HeroSection } from "@/src/widgets/sections/main-page/hero-section";
import { Projects } from "@/src/widgets/sections/main-page/projects";
import { TechStack } from "@/src/widgets/sections/main-page/tech-stack";
import { Experience } from "@/src/widgets/sections/main-page/experience";
import { ThoughtsDevelopment } from "@/src/widgets/sections/main-page/thoughts-development";
import { Scenic } from "@/src/widgets/sections/main-page/scenic";

import { MainPageLayout } from "./main-page-layout";

const LATEST_ARTICLES_COUNT = 3;

export const MainPage = () => {
    const articles = getArticles().slice(0, LATEST_ARTICLES_COUNT);

    return (
        <MainPageLayout>
            <HeroSection />
            <Projects />
            <TechStack />
            <Experience />
            <ThoughtsDevelopment articles={articles} />
            <Scenic />
        </MainPageLayout>
    )
}