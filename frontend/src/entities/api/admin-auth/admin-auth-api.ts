import { BACKEND_PROXY } from "@/src/shared/config/api";

import type { AdminCredentials, IAdmin, LoginErrorReason } from "./types";

const AUTH_URL = `${BACKEND_PROXY}/api/admin/auth`;

export class LoginError extends Error {
    reason: LoginErrorReason;

    constructor(reason: LoginErrorReason) {
        super(reason);

        this.reason = reason;
    }
}

export const adminAuthApi = {
    async login({ email, password }: AdminCredentials): Promise<IAdmin> {
        let response: Response;

        try {
            response = await fetch(`${AUTH_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
        } catch {
            throw new LoginError("unknown");
        }

        if (response.status === 401 || response.status === 400) {
            throw new LoginError("invalid");
        }

        if (response.status === 429) {
            throw new LoginError("rate-limited");
        }

        if (!response.ok) {
            throw new LoginError("unknown");
        }

        return response.json();
    },

    async logout(): Promise<void> {
        await fetch(`${AUTH_URL}/logout`, { method: "POST" });
    },
};