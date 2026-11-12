"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatDecimal, getDelta } from "@/src/shared/lib/helpers/format-metrics";
import { AdminCard, AnimatedNumber, Sparkline } from "@/src/shared/ui/admin-ui";
import type { MetricConfig } from "../../../model/types";
import styles from "../../styles/admin-metrics-grid.module.scss";

type MetricCardProps = {
  config: MetricConfig;
  current: number;
  previous: number;
  series?: number[];
  index: number;
};

export function MetricCard({ config, current, previous, series, index }: MetricCardProps) {
  const delta = getDelta(current, previous);
  const direction = delta === null ? 1 : Math.sign(delta);
  const good = config.inverse ? direction < 0 : direction > 0;
  const bad = config.inverse ? direction > 0 : direction < 0;

  const deltaClass = [
    styles["delta"],
    good ? styles["delta--up"] : "",
    bad ? styles["delta--down"] : "",
  ].join(" ");

  const Icon = direction > 0 ? ArrowUpRight : direction < 0 ? ArrowDownRight : Minus;
  const text =
    delta === null ? "новое" : `${delta > 0 ? "+" : ""}${formatDecimal(delta)}%`;

  return (
    <AdminCard compact delay={index * 0.05}>
      <div className={styles["metric"]}>
        <span className={styles["metric__label"]}>{config.label}</span>
        <AnimatedNumber
          className={styles["metric__value"]}
          value={current}
          format={config.format}
        />
        <span className={deltaClass}>
          <Icon size={14} />
          {text}
        </span>
        {series && series.length > 1 && (
          <div className={styles["metric__spark"]}>
            <Sparkline values={series} />
          </div>
        )}
      </div>
    </AdminCard>
  );
}