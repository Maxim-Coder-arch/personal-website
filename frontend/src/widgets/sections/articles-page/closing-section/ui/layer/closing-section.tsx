"use client";

import { useTranslations } from "next-intl";

import { STATEMENT_KEYS } from "../../model/data";
import type { ClosingSectionProps } from "../../model/types";

import { buildStatement } from "../../lib/helpers/build-statement";
import { useClosingSection } from "../../lib/hooks/use-closing-section";

import { ClosingLayout } from "./components/closing-layout";
import { ClosingMarquee } from "./components/closing-marquee";
import { ClosingStatement } from "./components/closing-statement";

export const ClosingSection = ({ titles }: ClosingSectionProps) => {
    const t = useTranslations("articlesPage.closing");
    const { ref, progress } = useClosingSection();

    const lines = buildStatement(STATEMENT_KEYS.map((key) => t(`lines.${key}`).split(" ")));
    const total = lines.flat().length;

    return (
        <ClosingLayout>
            <ClosingStatement
                ref={ref}
                lines={lines}
                total={total}
                progress={progress}
            />

            <ClosingMarquee items={titles} />
        </ClosingLayout>
    );
};