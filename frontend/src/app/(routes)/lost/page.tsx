import type { Metadata } from "next";

import { NotFoundPage } from "@/src/(views)/not-found-page";

export const metadata: Metadata = {
    title: "404 — Maxim Novikov",
    description: "A page that does not exist, on purpose.",
    robots: { index: false, follow: true },
};

const LostRoute = () => <NotFoundPage />;

export default LostRoute;