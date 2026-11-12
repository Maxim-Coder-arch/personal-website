import { cache } from "react";

import { cookies } from "next/headers";

import type { IAdmin } from "./types";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:5062";

export const getAdmin = cache(async (): Promise<IAdmin | null> => {
    const cookieStore = await cookies();

    const header = cookieStore
        .getAll()
        .filter(({ name }) => name.startsWith("admin_session"))
        .map(({ name, value }) => `${name}=${value}`)
        .join("; ");

    if (!header) {
        return null;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/admin/auth/me`, {
            headers: { cookie: header },
            cache: "no-store",
        });

        return response.ok ? ((await response.json()) as IAdmin) : null;
    } catch {
        return null;
    }
});