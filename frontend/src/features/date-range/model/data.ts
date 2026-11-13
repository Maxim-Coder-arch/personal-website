import type { DateRangeOption, RangePresetId } from "./types";

export const DATE_FORMAT = "yyyy-MM-dd";

export const DEFAULT_PRESET: RangePresetId = "7d";

export const DATE_RANGE_PILL_ID = "date-range-pill";

export const RANGE_PRESETS: { id: RangePresetId; label: string; days: number }[] = [
    { id: "today", label: "Сегодня", days: 1 },
    { id: "7d", label: "7 дней", days: 7 },
    { id: "30d", label: "30 дней", days: 30 },
    { id: "90d", label: "90 дней", days: 90 },
];

export const PICKER_OPTIONS: DateRangeOption[] = [
    ...RANGE_PRESETS.map(({ id, label }) => ({ id, label })),
    { id: "custom", label: "Период" },
];