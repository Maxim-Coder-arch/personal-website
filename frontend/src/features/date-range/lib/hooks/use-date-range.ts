"use client";

import { useCallback, useMemo } from "react";
import { differenceInCalendarDays, format, isValid, parseISO, subDays } from "date-fns";

import { useUrlParams } from "@/src/shared/lib/hooks/use-url-params";

import { DATE_FORMAT, DEFAULT_PRESET, RANGE_PRESETS } from "../../model/data";
import type { DateRangeState, RangePresetId } from "../../model/types";

const toIso = (date: Date) => format(date, DATE_FORMAT);

const LIST_PARAMS_RESET = { page: null, session: null } as const;

export const useDateRange = (): DateRangeState => {
    const { searchParams, update } = useUrlParams();

    const rangeParam = searchParams.get("range");
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    const resolved = useMemo(() => {
        if (fromParam && toParam) {
            const from = parseISO(fromParam);
            const to = parseISO(toParam);

            if (isValid(from) && isValid(to) && from <= to) {
                return { preset: null, from: fromParam, to: toParam };
            }
        }

        const today = new Date();
        const preset =
            RANGE_PRESETS.find((item) => item.id === rangeParam) ??
            RANGE_PRESETS.find((item) => item.id === DEFAULT_PRESET)!;

        return {
            preset: preset.id,
            from: toIso(subDays(today, preset.days - 1)),
            to: toIso(today),
        };
    }, [rangeParam, fromParam, toParam]);

    const { from, to, preset } = resolved;

    const range = useMemo(() => ({ from, to }), [from, to]);

    const previous = useMemo(() => {
        const length = differenceInCalendarDays(parseISO(to), parseISO(from)) + 1;
        const previousTo = subDays(parseISO(from), 1);
        const previousFrom = subDays(previousTo, length - 1);

        return { from: toIso(previousFrom), to: toIso(previousTo) };
    }, [from, to]);

    const setPreset = useCallback(
        (id: RangePresetId) => {
            update({ range: id, from: null, to: null, ...LIST_PARAMS_RESET });
        },
        [update],
    );

    const setCustom = useCallback(
        (nextFrom: string, nextTo: string) => {
            update({ from: nextFrom, to: nextTo, range: null, ...LIST_PARAMS_RESET });
        },
        [update],
    );

    return { range, previous, preset, setPreset, setCustom };
};