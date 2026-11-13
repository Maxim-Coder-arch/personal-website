export type DeviceFilter = "all" | "desktop" | "mobile" | "tablet";

export type VisitorFilter = "all" | "new" | "returning";

export interface FilterOption<T extends string> {
    id: T;
    label: string;
}