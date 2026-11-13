"use client";

import { useId } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";

import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";

import { ADMIN_UI_CONFIG } from "../../../model/animations";
import type { SparklineProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

export const Sparkline = ({ values, color = ADMIN_COLORS.accent }: SparklineProps) => {
    const gradientId = `spark${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
    const data = values.map((value) => ({ value }));

    return (
        <div className={styles["sparkline"]}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="0%"
                                stopColor={color}
                                stopOpacity={ADMIN_UI_CONFIG.sparkline.fillOpacity}
                            />
                            <stop offset="100%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke={color}
                        strokeWidth={ADMIN_UI_CONFIG.sparkline.strokeWidth}
                        fill={`url(#${gradientId})`}
                        dot={false}
                        isAnimationActive
                        animationDuration={ADMIN_UI_CONFIG.sparkline.duration}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};