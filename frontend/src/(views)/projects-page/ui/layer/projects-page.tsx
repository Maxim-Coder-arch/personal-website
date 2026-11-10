"use client";

import { useProjects } from "@/src/entities/api/projects/projects-queries";

import { HeadingSection } from "@/src/widgets/sections/projects-page/heading-section";
import { ProjectsShowcase } from "@/src/widgets/sections/projects-page/projects-showcase";
import { ClosingSection } from "@/src/widgets/sections/projects-page/closing-section";

import { ProjectsPageLayout } from "./projects-page-layout";

export const ProjectsPage = () => {
    const { data } = useProjects();

    return (
        <ProjectsPageLayout>
            <HeadingSection total={data?.length ?? 0} />
            <ProjectsShowcase />
            <ClosingSection />
        </ProjectsPageLayout>
    );
};