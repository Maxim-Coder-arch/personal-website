"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { differenceInCalendarDays, format, isValid, parseISO, subDays } from "date-fns";
import { DATE_FORMAT, DEFAULT_PRESET, RANGE_PRESETS } from "../../model/data";
import type { DateRangeState, RangePresetId } from "../../model/types";

const toIso = (date: Date) => format(date, DATE_FORMAT);

export function useDateRange(): DateRangeState {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
      router.replace(`${pathname}?range=${id}`, { scroll: false });
    },
    [router, pathname],
  );

  const setCustom = useCallback(
    (nextFrom: string, nextTo: string) => {
      router.replace(`${pathname}?from=${nextFrom}&to=${nextTo}`, { scroll: false });
    },
    [router, pathname],
  );

  return { range, previous, preset, setPreset, setCustom };
}