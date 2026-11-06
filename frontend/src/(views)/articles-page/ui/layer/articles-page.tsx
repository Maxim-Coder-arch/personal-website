import { getArticles } from "@/src/entities/article";

import { HeadingSection } from "@/src/widgets/sections/articles-page/heading-section";
import { ArticlesList } from "@/src/widgets/sections/articles-page/articles-list";
import { ClosingSection } from "@/src/widgets/sections/articles-page/closing-section";

import { ArticlesPageLayout } from "./articles-page-layout";

export const ArticlesPage = () => {
    const articles = getArticles();

    return (
        <ArticlesPageLayout>
            <HeadingSection total={articles.length} />
            <ArticlesList articles={articles} />
            <ClosingSection titles={articles.map(({ title }) => title)} />
        </ArticlesPageLayout>
    );
};