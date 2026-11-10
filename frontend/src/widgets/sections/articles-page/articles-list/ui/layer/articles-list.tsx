"use client";

import { useThoughts } from "@/src/entities/api/thoughts/thought-queries";
import { useArticlesList } from "../../lib/hooks/use-articles-list";
import type { ArticlesListProps } from "../../model/types";

import { ArticlesListItem } from "./components/articles-list-item";
import { ArticlesListLayout } from "./components/articles-list-layout";

export const ArticlesList = ({ articles }: ArticlesListProps) => {
    const { shouldReduceMotion } = useArticlesList();

    const {data, isLoading, isError} = useThoughts();

    console.log("----------------------------dd", data)
    
    if (!data) {
        return <p>Empty</p>
    }

    if (isLoading) {
        return <p>loading...</p>
    }

    if (isError) {
        return <p>error</p>
    }

    return (
        <ArticlesListLayout shouldReduceMotion={shouldReduceMotion}>
            {data.map((article, index) => (
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