import type { Metadata } from "next";

import { NotFoundPage } from "@/src/(views)/not-found-page";

export const metadata: Metadata = {
    title: "404 — Maxim Novikov",
    description: "Страница не найдена.",
};

const NotFound = () => <NotFoundPage />;

export default NotFound;