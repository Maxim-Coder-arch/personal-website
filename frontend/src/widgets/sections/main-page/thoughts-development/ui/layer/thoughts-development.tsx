"use client";

import { useThoughts } from "@/src/entities/api/thoughts/thought-queries";
import { QueryBoundary } from "@/src/shared/ui/query-boundary";

import { ThoughtsHeader } from "./components/thoughts-header";
import { ThoughtsLayout } from "./components/thoughts-layout";
import { ThoughtsList } from "./components/thoughts-list";

const LATEST_ARTICLES_COUNT = 3;

export const ThoughtsDevelopment = () => {
    const query = useThoughts();

    return (
        <ThoughtsLayout>
            <ThoughtsHeader />

            <QueryBoundary query={query}>
                {(articles) => (
                    <ThoughtsList
                        articles={articles.slice(0, LATEST_ARTICLES_COUNT)}
                    />
                )}
            </QueryBoundary>
        </ThoughtsLayout>
    );
};