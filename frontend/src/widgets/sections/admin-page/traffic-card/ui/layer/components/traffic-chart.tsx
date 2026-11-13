"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";
import type { TrafficRow } from "../../../model/types";
import { TrafficTooltip } from "./traffic-tooltip";
import styles from "../../styles/admin-traffic-card.module.scss";

type TrafficChartProps = {
  rows: TrafficRow[];
  compare: boolean;
  metricLabel: string;
};

const tick = { fill: ADMIN_COLORS.muted, fontSize: 12 };

export function TrafficChart({ rows, compare, metricLabel }: TrafficChartProps) {
  return (
    <div className={styles["chart"]}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={rows} margin={{ top: 8, right: 8, bottom: 0, left: -16 }}>
          <defs>
            <linearGradient id="traffic-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={ADMIN_COLORS.accent} stopOpacity={0.35} />
              <stop offset="100%" stopColor={ADMIN_COLORS.accent} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={ADMIN_COLORS.grid} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={tick} minTickGap={24} />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} tick={tick} width={48} />
          <Tooltip
            content={<TrafficTooltip metricLabel={metricLabel} />}
            cursor={{ stroke: ADMIN_COLORS.muted, strokeDasharray: "3 3" }}
          />
          {compare && (
            <Line
              type="monotone"
              dataKey="previous"
              stroke={ADMIN_COLORS.muted}
              strokeWidth={1.5}
              strokeDasharray="5 5"
              dot={false}
              isAnimationActive={false}
            />
          )}
          <Area
            type="monotone"
            dataKey="value"
            stroke={ADMIN_COLORS.accent}
            strokeWidth={2.5}
            fill="url(#traffic-fill)"
            dot={false}
            activeDot={{ r: 5, stroke: ADMIN_COLORS.accent, fill: ADMIN_COLORS.bg, strokeWidth: 2 }}
            animationDuration={700}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}