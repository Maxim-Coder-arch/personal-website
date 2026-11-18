import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { ProjectsPage } from "@/src/(views)/projects-page";
import { buildPageMetadata } from "@/src/shared/lib/helpers/build-page-metadata";

export const generateMetadata = async (): Promise<Metadata> => {
    const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

    return buildPageMetadata({
        title: t("projects.title"),
        description: t("projects.description"),
        siteName: t("siteName"),
        locale,
        path: "/projects"
    });
};

const ProjectsPageRoute = () => <ProjectsPage />

export default ProjectsPageRoute;