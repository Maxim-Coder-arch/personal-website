
import { PROJECTS_PREVIEW_COUNT } from "../../model/config";
import { projects } from "../../model/dev-mock.data";

import { ProjectsGrid } from "./components/projects-grid";
import { ProjectsHeader } from "./components/projects-header";
import { ProjectsLayout } from "./components/projects-layout";

export const Projects = () => {
    const preview = projects.slice(0, PROJECTS_PREVIEW_COUNT);

    return (
        <ProjectsLayout>
            <ProjectsHeader />
            <ProjectsGrid projects={preview} />
        </ProjectsLayout>   
    );
};