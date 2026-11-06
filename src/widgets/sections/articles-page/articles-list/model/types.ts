import type { ReactNode } from "react";

import type { IArticle } from "@/src/entities/article";

export interface ArticlesListProps {
    articles: IArticle[];
}

export interface ArticlesListLayoutProps {
    shouldReduceMotion: boolean | null;
    children: ReactNode;
}

export interface ArticlesListItemProps {
    article: IArticle;
    index: number;
    shouldReduceMotion: boolean | null;
}