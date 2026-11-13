"use client";

import { CountryFlag, RankedText } from "@/src/shared/ui/admin-ui";

import { BREAKDOWNS_CONFIG } from "../../model/config";
import { REFERRER_LABELS, translateKey } from "@/src/shared/lib/helpers/analytics-labels";

import { BreakdownListCard } from "./components/breakdown-list-card";
import { BreakdownsLayout } from "./components/breakdowns-layout";
import { DevicesCard } from "./components/devices-card";
import { HoursCard } from "./components/hours-card";

const { delays } = BREAKDOWNS_CONFIG;

export const AdminBreakdowns = () => {
    return (
        <BreakdownsLayout>
            <BreakdownListCard
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

            <DevicesCard />

            <BreakdownListCard
                title="Браузеры"
                breakdownKey="browser"
                delay={delays.browsers}
            />

            <BreakdownListCard
                title="Источники"
                breakdownKey="referrer"
                delay={delays.referrers}
                renderLabel={(item) => (
                    <RankedText>{translateKey(item.key, REFERRER_LABELS)}</RankedText>
                )}
            />

            <HoursCard />
        </BreakdownsLayout>
    );
};