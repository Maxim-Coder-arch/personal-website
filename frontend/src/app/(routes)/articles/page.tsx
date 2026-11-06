import type { Metadata } from "next";

import { ArticlesPage } from "@/src/(views)/articles-page";

export const metadata: Metadata = {
    title: "Articles — Maxim Novikov",
    description: "Notes on code, architecture and the craft of building software.",
};

const ArticlesPageRoute = () => <ArticlesPage />

export default ArticlesPageRoute;