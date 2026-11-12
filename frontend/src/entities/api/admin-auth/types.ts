export interface IAdmin {
    email: string;
}

export interface AdminCredentials {
    email: string;
    password: string;
}

export type LoginErrorReason = "invalid" | "rate-limited" | "unknown";