"use client";

import { REFERRER_LABELS, translateKey } from "../../model/data";
import { BreakdownListCard } from "./components/breakdown-list-card";
import { DevicesCard } from "./components/devices-card";
import { HoursCard } from "./components/hours-card";
import { CountryFlag, RankedText } from "@/src/shared/ui/admin-ui";
import styles from "../styles/admin-breakdowns.module.scss";

export function AdminBreakdowns() {
  return (
    <div className={styles["grid"]}>
      <BreakdownListCard
        title="Страны"
        breakdownKey="country"
        delay={0.4}
        renderLabel={(item) => (
          <>
            <CountryFlag code={item.code} />
            <RankedText>{translateKey(item.key)}</RankedText>
          </>
        )}
      />
      <DevicesCard />
      <BreakdownListCard title="Браузеры" breakdownKey="browser" delay={0.45} />
      <BreakdownListCard
            title="Источники"
            breakdownKey="referrer"
            delay={0.5}
            renderLabel={(item) => (
                <RankedText>{translateKey(item.key, REFERRER_LABELS)}</RankedText>
            )}
        />
      <HoursCard />
    </div>
  );
}