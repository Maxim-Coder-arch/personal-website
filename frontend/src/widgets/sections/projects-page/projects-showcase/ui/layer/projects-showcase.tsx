"use client";

import type { ProjectsShowcaseProps } from "../../model/types";

import { useShowcaseScroll } from "../../lib/hooks/use-showcase-scroll";

import { ProjectSlab } from "./components/project-slab";
import { ShowcaseLayout } from "./components/showcase-layout";
import { useProjects } from "@/src/entities/api/projects/projects-queries";

export const ProjectsShowcase = ({ projects }: ProjectsShowcaseProps) => {
    const { ref, progress, stacked, shouldReduceMotion } = useShowcaseScroll();
    const { data, isLoading, isError } = useProjects();

    if (!data) {
        return <p>Empty</p>
    }

    if (isLoading) {
        return <p>loading...</p>
    }

    if (isError) {
        return <p>error</p>
    }

    return (
        <ShowcaseLayout ref={ref}>
            {data.map((project, index) => (
                <ProjectSlab
                    key={project.id}
                    project={project}
                    index={index}
                    total={projects.length}
                    progress={progress}
                    stacked={stacked}
                    shouldReduceMotion={shouldReduceMotion}
                />
            ))}
        </ShowcaseLayout>
    );
};