import { notFound } from "next/navigation";

import { getArticleById } from "@/src/entities/article";
import { ArticleModal } from "@/src/widgets/article-reader";

interface ArticleModalRouteProps {
    params: Promise<{ id: string }>;
}

const ArticleModalRoute = async ({ params }: ArticleModalRouteProps) => {
    const { id } = await params;
    const article = getArticleById(id);

    if (!article) notFound();

    return <ArticleModal article={article} />;
};

export default ArticleModalRoute;