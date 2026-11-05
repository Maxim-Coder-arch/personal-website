import type { Metadata } from "next";

import { ArticlesPage } from "@/src/(views)/articles-page/ui/layer/articles-page";

export const metadata: Metadata = {
    title: "Projects — Maxim Novikov",
    description: "Articles",
};

const ProjectsPageRoute = () => <ArticlesPage />

export default ProjectsPageRoute;