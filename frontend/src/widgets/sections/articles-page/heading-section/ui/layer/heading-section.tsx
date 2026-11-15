"use client";

import { useTranslations } from "next-intl";

import type { HeadingSectionProps } from "../../model/types";

import { useHeadingSection } from "../../lib/hooks/use-heading-section";

import { HeadingFooter } from "./components/heading-footer";
import { HeadingLayout } from "./components/heading-layout";
import { HeadingMeta } from "./components/heading-meta";
import { HeadingTitle } from "./components/heading-title";

export const HeadingSection = ({ total }: HeadingSectionProps) => {
    const t = useTranslations("articlesPage.heading");
    const { revealed, shouldReduceMotion } = useHeadingSection();

    return (
        <HeadingLayout
            revealed={revealed}
            shouldReduceMotion={shouldReduceMotion}
        >
            <HeadingMeta
                eyebrow={t("eyebrow")}
                total={total}
            />

            <HeadingTitle title={t("title")} />

            <HeadingFooter
                description={t("description")}
                hint={t("hint")}
            />
        </HeadingLayout>
    );
};