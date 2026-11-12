import type { ReactNode } from "react";

export interface LoginFieldProps {
    id: string;
    label: string;
    type: "email" | "password" | "text";
    value: string;
    autoComplete: string;
    autoFocus?: boolean;
    trailing?: ReactNode;
    onChange: (value: string) => void;
}