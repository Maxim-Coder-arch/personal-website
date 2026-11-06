"use client";

import { useArticlesList } from "../../lib/hooks/use-articles-list";
import type { ArticlesListProps } from "../../model/types";

import { ArticlesListItem } from "./components/articles-list-item";
import { ArticlesListLayout } from "./components/articles-list-layout";

export const ArticlesList = ({ articles }: ArticlesListProps) => {
    const { shouldReduceMotion } = useArticlesList();

    return (
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
    );
};