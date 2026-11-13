"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ADMIN_COLORS } from "../../../../../config/admin-colors";
import styles from "../../styles/admin-ui.module.scss";

type SparklineProps = {
  values: number[];
  color?: string;
};

export function Sparkline({ values, color = ADMIN_COLORS.accent }: SparklineProps) {
  const gradientId = `spark${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const data = values.map((value) => ({ value }));

  return (
    <div className={styles["sparkline"]}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.8}
            fill={`url(#${gradientId})`}
            dot={false}
            isAnimationActive
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}