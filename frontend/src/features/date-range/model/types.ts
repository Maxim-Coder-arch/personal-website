import { DateRange } from "@/src/entities/api/analytics/types";

export type RangePresetId = "today" | "7d" | "30d" | "90d";

export type DateRangeState = {
  range: DateRange;
  previous: DateRange;
  preset: RangePresetId | null;
  setPreset: (id: RangePresetId) => void;
  setCustom: (from: string, to: string) => void;
};