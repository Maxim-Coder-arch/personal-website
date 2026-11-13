"use client";

import { X } from "lucide-react";

import {
    DEVICE_FILTER_OPTIONS,
    VISITOR_FILTER_OPTIONS,
    useVisitsParams,
} from "@/src/features/visits-params";
import { Segmented } from "@/src/shared/ui/admin-ui";

import { useCountryOptions } from "../../lib/hooks/use-country-options";
import { VISITS_FILTERS_CONFIG } from "../../model/config";

import { CountrySelect } from "./components/country-select";
import { VisitsFiltersLayout } from "./components/visits-filters-layout";

import styles from "../styles/visits-filters.module.scss";

export const VisitsFilters = () => {
    const { device, visitor, country, hasFilters, setDevice, setVisitor, setCountry, reset } = useVisitsParams();

    const countries = useCountryOptions(country);

    return (
        <VisitsFiltersLayout>
            <Segmented
                options={DEVICE_FILTER_OPTIONS}
                value={device}
                onChange={setDevice}
                layoutId={VISITS_FILTERS_CONFIG.pills.device}
            />

            <Segmented
                options={VISITOR_FILTER_OPTIONS}
                value={visitor}
                onChange={setVisitor}
                layoutId={VISITS_FILTERS_CONFIG.pills.visitor}
            />

            <CountrySelect value={country} options={countries} onChange={setCountry} />

            {hasFilters && (
                <button type="button" className={styles["reset"]} onClick={reset}>
                    <X size={14} />
                    Сбросить
                </button>
            )}
        </VisitsFiltersLayout>
    );
};