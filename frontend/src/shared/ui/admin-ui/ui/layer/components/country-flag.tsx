import type { ComponentType } from "react";
import * as Flags from "country-flag-icons/react/3x2";

import type { CountryFlagProps } from "../../../model/types";

import styles from "../../styles/admin-ui.module.scss";

type FlagComponent = ComponentType<{ className?: string }>;

const flags = Flags as unknown as Record<string, FlagComponent>;

export const CountryFlag = ({ code }: CountryFlagProps) => {
    if (!code) return null;

    const Flag = flags[code.toUpperCase()];

    if (!Flag) return null;

    return <Flag className={styles["flag"]} />;
};