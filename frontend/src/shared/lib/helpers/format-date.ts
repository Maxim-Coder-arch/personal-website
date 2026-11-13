import { format } from "date-fns";
import { ru } from "date-fns/locale";

const HAS_ZONE = /(Z|[+-]\d{2}:?\d{2})$/;

export const parseUtcDate = (value: string) =>
    new Date(HAS_ZONE.test(value) ? value : `${value}Z`);

export const formatDateTime = (value: string) =>
    format(parseUtcDate(value), "d MMM, HH:mm", { locale: ru });

export const formatTime = (value: string) => format(parseUtcDate(value), "HH:mm:ss");