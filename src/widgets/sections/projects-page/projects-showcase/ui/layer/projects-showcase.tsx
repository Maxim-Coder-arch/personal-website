"use client";

import type { ProjectsShowcaseProps } from "../../model/types";

import { useShowcaseScroll } from "../../lib/hooks/use-showcase-scroll";

import { ProjectSlab } from "./components/project-slab";
import { ShowcaseLayout } from "./components/showcase-layout";

export const ProjectsShowcase = ({ projects }: ProjectsShowcaseProps) => {
    const { ref, progress, stacked, shouldReduceMotion } = useShowcaseScroll();

    return (
        <ShowcaseLayout ref={ref}>
            {projects.map((project, index) => (
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