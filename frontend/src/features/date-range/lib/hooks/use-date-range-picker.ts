"use client";

import { format } from "date-fns";

import { DATE_FORMAT } from "../../model/data";
import type { PickerValue } from "../../model/types";

import { useDateRange } from "./use-date-range";

export const useDateRangePicker = () => {
    const { range, preset, setPreset, setCustom } = useDateRange();
    const maxDate = format(new Date(), DATE_FORMAT);

    const handleChange = (id: PickerValue) => {
        if (id === "custom") {
            setCustom(range.from, range.to);
            return;
        }

        setPreset(id);
    };

    const handleFromChange = (value: string) => {
        if (!value) return;

        setCustom(value, value > range.to ? value : range.to);
    };

    const handleToChange = (value: string) => {
        if (!value) return;

        setCustom(value < range.from ? value : range.from, value);
    };

    return { range, preset, maxDate, handleChange, handleFromChange, handleToChange };
};