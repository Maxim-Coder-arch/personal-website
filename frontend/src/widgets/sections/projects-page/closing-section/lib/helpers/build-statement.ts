import type { StatementWord } from "../../model/types";

export const buildStatement = (
    lines: readonly (readonly string[])[],
): StatementWord[][] => {
    let index = 0;

    return lines.map((line) =>
        line.map((text) => ({ text, index: index++ })),
    );
};