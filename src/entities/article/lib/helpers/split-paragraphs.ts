export const splitParagraphs = (text: string): string[] => {
    return text
            .split(/\n\s*\n/)
            .map((paragraph) => paragraph.replace(/\s*\n\s*/g, " ").trim())
            .filter(Boolean);
}