"use client";

import { useProjects } from "@/src/entities/api/projects/projects-queries";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useShowcaseScroll } from "../../lib/hooks/use-showcase-scroll";

import { ProjectSlab } from "./components/project-slab";
import { ShowcaseLayout } from "./components/showcase-layout";

export const ProjectsShowcase = () => {
    const { ref, progress, stacked, shouldReduceMotion } = useShowcaseScroll();
    const query = useProjects();

    return (
        <ShowcaseLayout ref={ref}>
            <QueryBoundary query={query}>
                {(projects) =>
                    projects.map((project, index) => (
                        <ProjectSlab
                            key={project.id}
                            project={project}
                            index={index}
                            total={projects.length}
                            progress={progress}
                            stacked={stacked}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))
                }
            </QueryBoundary>
        </ShowcaseLayout>
    );
};