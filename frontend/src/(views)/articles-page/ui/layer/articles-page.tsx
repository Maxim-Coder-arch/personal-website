"use client";

import { useThoughts } from "@/src/entities/api/thoughts/thought-queries";

import { HeadingSection } from "@/src/widgets/sections/articles-page/heading-section";
import { ArticlesList } from "@/src/widgets/sections/articles-page/articles-list";
import { ClosingSection } from "@/src/widgets/sections/articles-page/closing-section";

import { ArticlesPageLayout } from "./articles-page-layout";

export const ArticlesPage = () => {
    const { data } = useThoughts();

    return (
        <ArticlesPageLayout>
            <HeadingSection total={data?.length ?? 0} />
            <ArticlesList />
            {data && <ClosingSection titles={data.map(({ title }) => title)} />}
        </ArticlesPageLayout>
    );
};