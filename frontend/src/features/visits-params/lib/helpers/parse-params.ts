import { DEVICE_FILTER_OPTIONS, VISITOR_FILTER_OPTIONS } from "../../model/data";
import type { DeviceFilter, VisitorFilter } from "../../model/types";

const COUNTRY_CODE = /^[A-Za-z]{2}$/;

export const parseDevice = (value: string | null): DeviceFilter =>
    DEVICE_FILTER_OPTIONS.find((option) => option.id === value)?.id ?? "all";

export const parseVisitor = (value: string | null): VisitorFilter =>
    VISITOR_FILTER_OPTIONS.find((option) => option.id === value)?.id ?? "all";

export const parseCountry = (value: string | null) =>
    value && COUNTRY_CODE.test(value) ? value.toUpperCase() : undefined;

export const parsePage = (value: string | null) => {
    const page = Number(value);

    return Number.isInteger(page) && page > 1 ? page : 1;
};