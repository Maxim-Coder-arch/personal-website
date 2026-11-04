"use client";

import { HEADING_CONTENT } from "../../model/data";
import type { HeadingSectionProps } from "../../model/types";

import { useHeadingSection } from "../../lib/hooks/use-heading-section";

import { HeadingFooter } from "./components/heading-footer";
import { HeadingLayout } from "./components/heading-layout";
import { HeadingMeta } from "./components/heading-meta";
import { HeadingTitle } from "./components/heading-title";

export const HeadingSection = ({ total }: HeadingSectionProps) => {
    const { revealed, shouldReduceMotion } = useHeadingSection();

    return (
        <HeadingLayout
            revealed={revealed}
            shouldReduceMotion={shouldReduceMotion}
        >
            <HeadingMeta
                eyebrow={HEADING_CONTENT.eyebrow}
                total={total}
            />

            <HeadingTitle title={HEADING_CONTENT.title} />

            <HeadingFooter
                description={HEADING_CONTENT.description}
                hint={HEADING_CONTENT.hint}
            />
        </HeadingLayout>
    );
};