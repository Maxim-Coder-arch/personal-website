import { useLayoutEffect, useRef } from "react";
import type { KeyboardEvent } from "react";

import { MARKDOWN_SHORTCUTS } from "../../model/data";
import type { MarkdownActionId } from "../../model/types";
import { applyMarkdownAction } from "../helpers/apply-markdown-action";

export const useMarkdownEditor = (value: string, onChange: (value: string) => void) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const pendingSelection = useRef<{ start: number; end: number } | null>(null);

    useLayoutEffect(() => {
        const selection = pendingSelection.current;
        const textarea = textareaRef.current;

        if (!selection || !textarea) return;

        textarea.focus();
        textarea.setSelectionRange(selection.start, selection.end);
        pendingSelection.current = null;
    }, [value]);

    const applyAction = (id: MarkdownActionId) => {
        const textarea = textareaRef.current;

        if (!textarea) return;

        const result = applyMarkdownAction(id, {
            value,
            start: textarea.selectionStart,
            end: textarea.selectionEnd,
        });

        pendingSelection.current = { start: result.start, end: result.end };
        onChange(result.value);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!(event.ctrlKey || event.metaKey) || event.shiftKey || event.altKey) return;

        const action = MARKDOWN_SHORTCUTS[event.code];

        if (!action) return;

        event.preventDefault();
        applyAction(action);
    };

    return { textareaRef, applyAction, handleKeyDown };
};