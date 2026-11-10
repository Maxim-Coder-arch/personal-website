"use client";

import { useThoughts } from "@/src/entities/api/thoughts/thought-queries";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { useArticlesList } from "../../lib/hooks/use-articles-list";

import { ArticlesListItem } from "./components/articles-list-item";
import { ArticlesListLayout } from "./components/articles-list-layout";

export const ArticlesList = () => {
    const { shouldReduceMotion } = useArticlesList();
    const query = useThoughts();

    return (
        <QueryBoundary query={query}>
            {(articles) => (
                <ArticlesListLayout shouldReduceMotion={shouldReduceMotion}>
                    {articles.map((article, index) => (
                        <ArticlesListItem
                            key={article.id}
                            article={article}
                            index={index}
                            shouldReduceMotion={shouldReduceMotion}
                        />
                    ))}
                </ArticlesListLayout>
            )}
        </QueryBoundary>
    );
};