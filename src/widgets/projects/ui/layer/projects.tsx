
import { projects } from "../../model/dev-mock.data";

import { ProjectsGrid } from "./components/projects-grid";
import { ProjectsHeader } from "./components/projects-header";
import { ProjectsLayout } from "./components/projects-layout";

export const Projects = () => {
    return (
        <ProjectsLayout>
            <ProjectsHeader />
            <ProjectsGrid projects={projects} />
        </ProjectsLayout>   
    );
};
