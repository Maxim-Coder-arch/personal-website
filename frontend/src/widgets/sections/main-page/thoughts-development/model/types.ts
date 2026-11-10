import type { IArticle } from "@/src/entities/article";

export interface ThoughtsListProps {
    articles: IArticle[];
}

export interface ThoughtsListItemProps {
    article: IArticle;
    index: number;
    shouldReduceMotion: boolean | null;
}