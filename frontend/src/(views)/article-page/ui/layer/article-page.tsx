import { ArticlePageReader } from "@/src/widgets/sections/article-page/article-reader";

import type { ArticlePageProps } from "../../model/types";

export const ArticlePage = ({ article }: ArticlePageProps) => {
    return <ArticlePageReader article={article} />;
};