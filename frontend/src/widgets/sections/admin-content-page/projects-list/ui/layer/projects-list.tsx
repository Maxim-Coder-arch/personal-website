"use client";

import { AdminConfirm } from "@/src/shared/ui/admin-ui";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useProjectsList } from "../../lib/hooks/use-projects-list";

import { ProjectRow } from "./components/project-row";
import { ProjectsEmpty } from "./components/projects-empty";
import { ProjectsLayout } from "./components/projects-layout";
import { ProjectsSkeleton } from "./components/projects-skeleton";
import { ProjectsToolbar } from "./components/projects-toolbar";

import styles from "../styles/projects-list.module.scss";

export const ProjectsList = () => {
    const {
        query,
        projects,
        search,
        setSearch,
        canMove,
        move,
        moving,
        pending,
        requestDelete,
        cancelDelete,
        confirmDelete,
        deleting,
    } = useProjectsList();

    return (
        <>
            <ProjectsLayout
                total={query.data?.length}
                toolbar={<ProjectsToolbar search={search} onSearchChange={setSearch} />}
            >
                <QueryBoundary
                    query={query}
                    loadingFallback={<ProjectsSkeleton />}
                    emptyFallback={<ProjectsEmpty />}
                    isEmpty={(data) => data.length === 0}
                >
                    {(all) =>
                        projects.length === 0 ? (
                            <p className={styles["nothing"]}>Ничего не найдено</p>
                        ) : (
                            <ul className={styles["list"]}>
                                {projects.map((project, index) => (
                                    <ProjectRow
                                        key={project.id}
                                        project={project}
                                        index={index}
                                        total={all.length}
                                        version={query.dataUpdatedAt}
                                        canMove={canMove}
                                        moving={moving}
                                        onMove={move}
                                        onDelete={requestDelete}
                                    />
                                ))}
                            </ul>
                        )
                    }
                </QueryBoundary>
            </ProjectsLayout>

            <AdminConfirm
                open={pending !== null}
                title="Удалить проект?"
                description={
                    pending ? `«${pending.title}» исчезнет с сайта. Действие нельзя отменить.` : ""
                }
                pending={deleting}
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </>
    );
};