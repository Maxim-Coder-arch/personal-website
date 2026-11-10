"use client";

import { useProjects } from "@/src/entities/api/projects/projects-queries";

import { PROJECTS_PREVIEW_COUNT } from "../../model/config";
import { projects } from "../../model/dev-mock.data";

import { ProjectsGrid } from "./components/projects-grid";
import { ProjectsHeader } from "./components/projects-header";
import { ProjectsLayout } from "./components/projects-layout";

export const Projects = () => {
    const { data, isLoading, isError } = useProjects();

    console.log("===============================", data)

    if (isLoading) {
        return <p>loading...</p>
    }

    return (
        <ProjectsLayout>
            <ProjectsHeader />
            <ProjectsGrid projects={data} />
        </ProjectsLayout>   
    );
};