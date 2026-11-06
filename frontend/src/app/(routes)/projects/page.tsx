import type { Metadata } from "next";

import { ProjectsPage } from "@/src/(views)/projects-page";

export const metadata: Metadata = {
    title: "Projects — Maxim Novikov",
    description: "Selected projects designed, built and shipped by Maxim Novikov.",
};

const ProjectsPageRoute = () => <ProjectsPage />

export default ProjectsPageRoute;