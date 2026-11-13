import { useMemo } from "react";

import { useBreakdown } from "@/src/entities/api/analytics/analytics-queries";
import { useDateRange } from "@/src/features/date-range";
import { translateKey } from "@/src/shared/lib/helpers/analytics-labels";

import type { CountryOption } from "../../model/types";

export const useCountryOptions = (selected?: string) => {
    const { range } = useDateRange();
    const query = useBreakdown(range, "country");

    return useMemo(() => {
        const options: CountryOption[] = (query.data ?? []).flatMap((item) =>
            item.code ? [{ code: item.code.toUpperCase(), label: translateKey(item.key) }] : [],
        );

        if (selected && !options.some((option) => option.code === selected)) {
            options.push({ code: selected, label: selected });
        }

        return options;
    }, [query.data, selected]);
};