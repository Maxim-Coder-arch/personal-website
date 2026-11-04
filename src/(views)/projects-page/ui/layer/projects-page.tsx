import { HeadingSection } from "@/src/widgets/sections/projects-page/heading-section";
import { ProjectsShowcase } from "@/src/widgets/sections/projects-page/projects-showcase";
import { ClosingSection } from "@/src/widgets/sections/projects-page/closing-section";

import { projects } from "../../model/projects.mock";

import { ProjectsPageLayout } from "./projects-page-layout";

export const ProjectsPage = () => {
    return (
        <ProjectsPageLayout>
            <HeadingSection total={projects.length} />
            <ProjectsShowcase projects={projects} />
            <ClosingSection />
        </ProjectsPageLayout>
    );
};