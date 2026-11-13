import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export type UrlParamChanges = Record<string, string | null>;

export const useUrlParams = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const update = useCallback(
        (changes: UrlParamChanges) => {
            const next = new URLSearchParams(searchParams.toString());

            Object.entries(changes).forEach(([key, value]) => {
                if (value === null) {
                    next.delete(key);
                    return;
                }

                next.set(key, value);
            });

            const query = next.toString();

            router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
        },
        [searchParams, pathname, router],
    );

    return { searchParams, update };
};