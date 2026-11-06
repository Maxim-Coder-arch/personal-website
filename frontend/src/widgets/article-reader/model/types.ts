import type { IArticle } from "@/src/entities/article";

export type ReaderVariant = "modal" | "page";

export interface ArticleModalProps {
    article: IArticle;
}

export interface ArticlePageReaderProps {
    article: IArticle;
}

export interface ArticleReaderProps {
    article: IArticle;
    variant: ReaderVariant;
    reading: boolean;
    onEnterReading: () => void;
    onExitReading: () => void;
    onClose?: () => void;
}

export interface ArticleToolbarProps {
    variant: ReaderVariant;
    onEnterReading: () => void;
    onClose?: () => void;
}

export interface ArticleHeaderProps {
    article: IArticle;
    reading: boolean;
}

export interface ArticleBodyProps {
    paragraphs: string[];
}

export interface ReadingExitButtonProps {
    onClick: () => void;
}