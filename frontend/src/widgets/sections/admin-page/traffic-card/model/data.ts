export const TRAFFIC_METRICS = [
  { id: "visitors", label: "Посетители" },
  { id: "sessions", label: "Сессии" },
  { id: "pageViews", label: "Просмотры" },
] as const;

export const TRAFFIC_INTERVALS = [
  { id: "auto", label: "Авто" },
  { id: "hour", label: "Часы" },
  { id: "day", label: "Дни" },
  { id: "week", label: "Недели" },
  { id: "month", label: "Месяцы" },
] as const;