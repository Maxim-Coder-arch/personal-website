interface SectionProgress {
    index: number;
    value: number;
}

export const getSectionProgress = (tops: number[], line: number): SectionProgress => {
    let index = 0;

    tops.forEach((top, current) => {
        if (top <= line) index = current;
    });

    const next = tops[index + 1];

    if (next === undefined || !Number.isFinite(next)) {
        return { index, value: index };
    }

    const span = next - tops[index];
    const fraction = span > 0 ? Math.min(Math.max((line - tops[index]) / span, 0), 1) : 0;

    return { index, value: index + fraction };
};