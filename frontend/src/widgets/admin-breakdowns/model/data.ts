import { ADMIN_COLORS } from "@/src/shared/config/admin-colors";

export const DEVICE_LABELS: Record<string, string> = {
  desktop: "Компьютер",
  mobile: "Телефон",
  tablet: "Планшет",
};

export const DEVICE_COLORS = [ADMIN_COLORS.accent, "#7fb8e0", "#e08fb3", "#8fe0b0", "#b49be0"];

export const REFERRER_LABELS: Record<string, string> = {
  direct: "Прямой заход",
};

export const translateKey = (key: string, dictionary?: Record<string, string>) => {
  if (key === "Unknown") return "Неизвестно";
  return dictionary?.[key.toLowerCase()] ?? key;
};