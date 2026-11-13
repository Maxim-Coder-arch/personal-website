import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";

export const SEGMENT_COLORS = {
  newVisitors: ADMIN_COLORS.accent,
  returningVisitors: "#7fb8e0",
} as const;

export const WEEKDAYS = [
  { key: "Mon", label: "Пн" },
  { key: "Tue", label: "Вт" },
  { key: "Wed", label: "Ср" },
  { key: "Thu", label: "Чт" },
  { key: "Fri", label: "Пт" },
  { key: "Sat", label: "Сб" },
  { key: "Sun", label: "Вс" },
] as const;

export const translateKey = (key: string) => (key === "Unknown" ? "Неизвестно" : key);

export const entryLabel = (path: string) => (path === "/" ? "Главная" : path);