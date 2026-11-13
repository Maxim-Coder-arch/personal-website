import type { DeviceFilter, FilterOption, VisitorFilter } from "./types";

export const DEVICE_FILTER_OPTIONS: FilterOption<DeviceFilter>[] = [
    { id: "all", label: "Все" },
    { id: "desktop", label: "Компьютер" },
    { id: "mobile", label: "Телефон" },
    { id: "tablet", label: "Планшет" },
];

export const VISITOR_FILTER_OPTIONS: FilterOption<VisitorFilter>[] = [
    { id: "all", label: "Все" },
    { id: "new", label: "Новые" },
    { id: "returning", label: "Вернувшиеся" },
];