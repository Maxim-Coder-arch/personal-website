import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ProjectsPage } from "@/src/(views)/projects-page";

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations("meta.projects");

    return {
        title: t("title"),
        description: t("description"),
    };
};

const ProjectsPageRoute = () => <ProjectsPage />

export default ProjectsPageRoute;