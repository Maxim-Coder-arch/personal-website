"use client";

import type { ArticleEditorProps } from "../../model/types";

import { ArticleEditorForm } from "./components/article-editor-form";
import { ArticleEditorLoader } from "./components/article-editor-loader";

export const ArticleEditor = ({ articleId }: ArticleEditorProps) => {
    if (!articleId) return <ArticleEditorForm />;

    return <ArticleEditorLoader articleId={articleId} />;
};