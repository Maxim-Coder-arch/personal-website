import type { ReactNode } from "react";

import type { IArticle } from "@/src/entities/article";

export interface ArticlesLayoutProps {
    total?: number;
    toolbar: ReactNode;
    children: ReactNode;
}

export interface ArticlesToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

export interface ArticleRowProps {
    article: IArticle;
    index: number;
    onDelete: (article: IArticle) => void;
}