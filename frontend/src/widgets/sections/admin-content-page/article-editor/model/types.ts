import type { KeyboardEventHandler, RefObject } from "react";
import type { LucideIcon } from "lucide-react";

import type { IArticle } from "@/src/entities/article";

export interface ArticleFormValues {
    title: string;
    subtitle: string;
    text: string;
}

export type ArticleFormErrors = Partial<Record<keyof ArticleFormValues, string>>;

export type EditorMode = "write" | "preview";

export type MarkdownActionId =
    | "bold"
    | "italic"
    | "strike"
    | "heading"
    | "quote"
    | "bulletList"
    | "orderedList"
    | "code"
    | "codeBlock"
    | "link"
    | "divider";

export interface MarkdownAction {
    id: MarkdownActionId;
    label: string;
    shortcut?: string;
    icon: LucideIcon;
}

export interface EditorState {
    value: string;
    start: number;
    end: number;
}

export interface ArticleEditorProps {
    articleId?: string;
}

export interface ArticleEditorFormProps {
    article?: IArticle;
}

export interface EditorHeaderProps {
    isNew: boolean;
    dirty: boolean;
    saving: boolean;
    siteHref?: string;
    onBack: () => void;
    onSave: () => void;
    onDelete?: () => void;
}

export interface ArticleFieldsProps {
    values: ArticleFormValues;
    errors: ArticleFormErrors;
    onChange: (field: "title" | "subtitle", value: string) => void;
}

export interface EditorModesProps {
    mode: EditorMode;
    onChange: (mode: EditorMode) => void;
}

export interface MarkdownEditorProps {
    value: string;
    error?: string;
    mode: EditorMode;
    onChange: (value: string) => void;
}

export interface MarkdownToolbarProps {
    onAction: (id: MarkdownActionId) => void;
}

export interface MarkdownPaneProps {
    value: string;
    error?: string;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    onChange: (value: string) => void;
    onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
}

export interface MarkdownPreviewProps {
    value: string;
}

export interface EditorStatsProps {
    text: string;
}