"use client";

import { useProjects } from "@/src/entities/api/projects/projects-queries";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { PROJECTS_PREVIEW_COUNT } from "../../model/config";

import { ProjectsGrid } from "./components/projects-grid";
import { ProjectsHeader } from "./components/projects-header";
import { ProjectsLayout } from "./components/projects-layout";

export const Projects = () => {
    const query = useProjects();

    return (
        <ProjectsLayout>
            <ProjectsHeader />

            <QueryBoundary query={query}>
                {(projects) => (
                    <ProjectsGrid
                        projects={projects.slice(0, PROJECTS_PREVIEW_COUNT)}
                    />
                )}
            </QueryBoundary>
        </ProjectsLayout>
    );
};