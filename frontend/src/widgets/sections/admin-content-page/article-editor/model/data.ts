import {
    Bold,
    Braces,
    Code,
    Heading2,
    Italic,
    Link,
    List,
    ListOrdered,
    Minus,
    Quote,
    Strikethrough,
} from "lucide-react";

import type { EditorMode, MarkdownAction, MarkdownActionId } from "./types";

export const MARKDOWN_ACTIONS: readonly MarkdownAction[] = [
    { id: "bold", label: "Жирный", shortcut: "Ctrl+B", icon: Bold },
    { id: "italic", label: "Курсив", shortcut: "Ctrl+I", icon: Italic },
    { id: "strike", label: "Зачёркнутый", icon: Strikethrough },
    { id: "heading", label: "Заголовок", icon: Heading2 },
    { id: "quote", label: "Цитата", icon: Quote },
    { id: "bulletList", label: "Список", icon: List },
    { id: "orderedList", label: "Нумерованный список", icon: ListOrdered },
    { id: "code", label: "Код в строке", icon: Code },
    { id: "codeBlock", label: "Блок кода", icon: Braces },
    { id: "link", label: "Ссылка", shortcut: "Ctrl+K", icon: Link },
    { id: "divider", label: "Разделитель", icon: Minus },
];

export const MARKDOWN_SHORTCUTS: Record<string, MarkdownActionId> = {
    KeyB: "bold",
    KeyI: "italic",
    KeyK: "link",
};

export const EDITOR_MODES: { id: EditorMode; label: string }[] = [
    { id: "write", label: "Текст" },
    { id: "preview", label: "Превью" },
];