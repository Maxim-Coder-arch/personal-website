import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundPage } from "@/src/(views)/not-found-page";

export const generateMetadata = async (): Promise<Metadata> => {
    const t = await getTranslations("meta.lost");

    return {
        title: t("title"),
        description: t("description"),
        robots: { index: false, follow: true },
    };
};

const LostRoute = () => <NotFoundPage />;

export default LostRoute;