import { notFound } from "next/navigation";

import { thoughtApi } from "@/src/entities/api/thoughts/thougths-api";
import { ArticleModal } from "@/src/widgets/sections/article-page/article-reader";

interface ArticleModalRouteProps {
    params: Promise<{ id: string }>;
}

const ArticleModalRoute = async ({ params }: ArticleModalRouteProps) => {
    const { id } = await params;
    const article = await thoughtApi.getById(id);

    if (!article) notFound();

    return <ArticleModal article={article} />;
};

export default ArticleModalRoute;