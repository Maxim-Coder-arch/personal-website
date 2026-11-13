"use client";

import { CountryFlag, RankedText } from "@/src/shared/ui/admin-ui";

import { AUDIENCE_CONFIG } from "../../model/config";
import { entryLabel } from "../../model/data";

import { translateKey } from "@/src/shared/lib/helpers/analytics-labels";

import { AudienceGrid } from "./components/audience-grid";
import { AudienceLayout } from "./components/audience-layout";
import { AudienceListCard } from "./components/audience-list-card";
import { VisitorsSplitCard } from "./components/visitors-split-card";
import { WeekdaysCard } from "./components/weekdays-card";

const { delays } = AUDIENCE_CONFIG;

export const AdminAudience = () => {
    return (
        <AudienceLayout>
            <VisitorsSplitCard />

            <AudienceGrid>
                <AudienceListCard
                    title="Страны"
                    breakdownKey="country"
                    delay={delays.countries}
                    renderLabel={(item) => (
                        <>
                            <CountryFlag code={item.code} />
                            <RankedText>{translateKey(item.key)}</RankedText>
                        </>
                    )}
                />

                <AudienceListCard title="Регионы" breakdownKey="region" delay={delays.regions} />
                <AudienceListCard
                    title="Операционные системы"
                    breakdownKey="os"
                    delay={delays.os}
                />
                <AudienceListCard
                    title="Разрешения экрана"
                    breakdownKey="screen"
                    delay={delays.screens}
                />
                <AudienceListCard title="Языки" breakdownKey="language" delay={delays.languages} />
                <AudienceListCard
                    title="Точки входа"
                    breakdownKey="entry"
                    delay={delays.entries}
                    renderLabel={(item) => <RankedText>{entryLabel(item.key)}</RankedText>}
                />

                <WeekdaysCard />
            </AudienceGrid>
        </AudienceLayout>
    );
};