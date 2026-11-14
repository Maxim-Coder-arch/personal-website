export const BACKEND_PROXY = "/backend";

const BACKEND_ORIGIN = process.env.BACKEND_URL ?? "http://localhost:5062";

export const PUBLIC_API_URL =
    typeof window === "undefined" ? BACKEND_ORIGIN : BACKEND_PROXY;