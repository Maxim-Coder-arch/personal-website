"use client";

import { MARQUEE_ITEMS, STATEMENT_LINES } from "../../model/data";

import { buildStatement } from "../../lib/helpers/build-statement";
import { useClosingSection } from "../../lib/hooks/use-closing-section";

import { ClosingLayout } from "./components/closing-layout";
import { ClosingMarquee } from "./components/closing-marquee";
import { ClosingStatement } from "./components/closing-statement";

export const ClosingSection = () => {
    const { ref, progress } = useClosingSection();

    const lines = buildStatement(STATEMENT_LINES);
    const total = lines.flat().length;

    return (
        <ClosingLayout>
            <ClosingStatement
                ref={ref}
                lines={lines}
                total={total}
                progress={progress}
            />

            <ClosingMarquee items={MARQUEE_ITEMS} />
        </ClosingLayout>
    );
};