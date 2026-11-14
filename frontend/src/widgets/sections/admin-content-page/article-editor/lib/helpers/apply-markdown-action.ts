import type { EditorState, MarkdownActionId } from "../../model/types";

const LINE_PREFIXES = {
    heading: /^#{1,6}\s/,
    quote: /^>\s?/,
    bulletList: /^[-*+]\s/,
    orderedList: /^\d+\.\s/,
} as const;

const getLineBounds = (value: string, start: number, end: number) => {
    const lineStart = start === 0 ? 0 : value.lastIndexOf("\n", start - 1) + 1;
    const effectiveEnd = end > start && value[end - 1] === "\n" ? end - 1 : end;
    const lineEndIndex = value.indexOf("\n", effectiveEnd);

    return { lineStart, lineEnd: lineEndIndex === -1 ? value.length : lineEndIndex };
};

const wrapSelection = (
    { value, start, end }: EditorState,
    before: string,
    after: string,
    placeholder: string,
): EditorState => {
    const selected = value.slice(start, end);

    const canUnwrap =
        start >= before.length &&
        value.slice(start - before.length, start) === before &&
        value.slice(end, end + after.length) === after;

    if (canUnwrap) {
        return {
            value: value.slice(0, start - before.length) + selected + value.slice(end + after.length),
            start: start - before.length,
            end: end - before.length,
        };
    }

    const inner = selected || placeholder;
    const next = value.slice(0, start) + before + inner + after + value.slice(end);

    return {
        value: next,
        start: start + before.length,
        end: start + before.length + inner.length,
    };
};

const wrapCodeBlock = (state: EditorState): EditorState => {
    const needsBreak = state.start > 0 && state.value[state.start - 1] !== "\n";

    return wrapSelection(state, `${needsBreak ? "\n" : ""}\`\`\`\n`, "\n```\n", "код");
};

const toggleLinePrefix = (
    { value, start, end }: EditorState,
    getPrefix: (index: number) => string,
    existing: RegExp,
): EditorState => {
    const { lineStart, lineEnd } = getLineBounds(value, start, end);
    const lines = value.slice(lineStart, lineEnd).split("\n");
    const allPrefixed = lines.every((line) => existing.test(line));

    const next = lines
        .map((line, index) => {
            const clean = line.replace(existing, "");

            return allPrefixed ? clean : `${getPrefix(index)}${clean}`;
        })
        .join("\n");

    return {
        value: value.slice(0, lineStart) + next + value.slice(lineEnd),
        start: lineStart,
        end: lineStart + next.length,
    };
};

const insertLink = ({ value, start, end }: EditorState): EditorState => {
    const selected = value.slice(start, end);
    const label = selected || "текст";
    const url = "https://";
    const next = `${value.slice(0, start)}[${label}](${url})${value.slice(end)}`;

    if (selected) {
        const urlStart = start + label.length + 3;

        return { value: next, start: urlStart, end: urlStart + url.length };
    }

    return { value: next, start: start + 1, end: start + 1 + label.length };
};

const insertDivider = ({ value, end }: EditorState): EditorState => {
    const insert = "\n\n---\n\n";
    const cursor = end + insert.length;

    return {
        value: value.slice(0, end) + insert + value.slice(end),
        start: cursor,
        end: cursor,
    };
};

export const applyMarkdownAction = (id: MarkdownActionId, state: EditorState): EditorState => {
    switch (id) {
        case "bold":
            return wrapSelection(state, "**", "**", "жирный текст");
        case "italic":
            return wrapSelection(state, "_", "_", "курсив");
        case "strike":
            return wrapSelection(state, "~~", "~~", "зачёркнутый");
        case "code":
            return wrapSelection(state, "`", "`", "код");
        case "codeBlock":
            return wrapCodeBlock(state);
        case "heading":
            return toggleLinePrefix(state, () => "## ", LINE_PREFIXES.heading);
        case "quote":
            return toggleLinePrefix(state, () => "> ", LINE_PREFIXES.quote);
        case "bulletList":
            return toggleLinePrefix(state, () => "- ", LINE_PREFIXES.bulletList);
        case "orderedList":
            return toggleLinePrefix(state, (index) => `${index + 1}. `, LINE_PREFIXES.orderedList);
        case "link":
            return insertLink(state);
        case "divider":
            return insertDivider(state);
    }
};