import { ArticlePageReader } from "@/src/widgets/article-reader";

import type { ArticlePageProps } from "../../model/types";

export const ArticlePage = ({ article }: ArticlePageProps) => {
    return <ArticlePageReader article={article} />;
};