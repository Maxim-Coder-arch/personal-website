"use client";

import type { CountrySelectProps } from "../../../model/types";

import styles from "../../styles/visits-filters.module.scss";

export const CountrySelect = ({ value, options, onChange }: CountrySelectProps) => {
    return (
        <select
            className={styles["select"]}
            value={value ?? ""}
            aria-label="Страна"
            onChange={(event) => onChange(event.target.value || undefined)}
        >
            <option value="">Все страны</option>

            {options.map((option) => (
                <option key={option.code} value={option.code}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};