"use client";

import { CountryFlag, RankedText } from "@/src/shared/ui/admin-ui";
import { entryLabel, translateKey } from "../../model/data";
import { AudienceListCard } from "./components/audience-list-card";
import { VisitorsSplitCard } from "./components/visitors-split-card";
import { WeekdaysCard } from "./components/weekdays-card";
import styles from "../styles/admin-audience.module.scss";

export function AdminAudience() {
  return (
    <div className={styles["root"]}>
      <VisitorsSplitCard />
      <div className={styles["grid"]}>
        <AudienceListCard
          title="Страны"
          breakdownKey="country"
          delay={0.1}
          renderLabel={(item) => (
            <>
              <CountryFlag code={item.code} />
              <RankedText>{translateKey(item.key)}</RankedText>
            </>
          )}
        />
        <AudienceListCard title="Регионы" breakdownKey="region" delay={0.15} />
        <AudienceListCard title="Операционные системы" breakdownKey="os" delay={0.2} />
        <AudienceListCard title="Разрешения экрана" breakdownKey="screen" delay={0.25} />
        <AudienceListCard title="Языки" breakdownKey="language" delay={0.3} />
        <AudienceListCard
          title="Точки входа"
          breakdownKey="entry"
          delay={0.35}
          renderLabel={(item) => <RankedText>{entryLabel(item.key)}</RankedText>}
        />
        <WeekdaysCard />
      </div>
    </div>
  );
}