"use client";

import { useAdminProject } from "@/src/entities/api/admin-projects/admin-projects-queries";
import { Skeleton } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { PROJECT_EDITOR_CONFIG } from "../../../model/config";

import { ProjectEditorForm } from "./project-editor-form";

export const ProjectEditorLoader = ({ projectId }: { projectId: string }) => {
    const query = useAdminProject(projectId);

    return (
        <QueryBoundary
            query={query}
            loadingFallback={<Skeleton height={PROJECT_EDITOR_CONFIG.skeletonHeight} />}
        >
            {(project) => (
                <ProjectEditorForm
                    key={project.id}
                    project={project}
                    version={query.dataUpdatedAt}
                />
            )}
        </QueryBoundary>
    );
};