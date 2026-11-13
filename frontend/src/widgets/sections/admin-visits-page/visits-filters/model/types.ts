export interface CountryOption {
    code: string;
    label: string;
}

export interface CountrySelectProps {
    value?: string;
    options: CountryOption[];
    onChange: (code?: string) => void;
}