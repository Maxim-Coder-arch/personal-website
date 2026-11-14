const WORDS_PER_MINUTE = 200;

export const getReadingStats = (text: string) => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;

    return {
        words,
        minutes: words === 0 ? 0 : Math.max(1, Math.ceil(words / WORDS_PER_MINUTE)),
    };
};