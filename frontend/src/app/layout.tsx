import type { Metadata } from "next";
import type { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { AnalyticsTracker } from "../features/analytics-tracker";

import { Menu } from "../widgets/layout/menu";
import { Footer } from "../widgets/layout/footer";
import { PageLoader } from "../widgets/layout/page-loader";
import { AnalyticsNotice } from "../widgets/layout/analytics-notice";
import { SiteChrome } from "../widgets/layout/site-chrome/site-chrome";

import { QueryProvider } from "./providers/query-provider";
import { IntroProvider } from "./providers/intro-provider";

import { YandexMetrika } from "../features/yandex-metrika";

import { buildPageMetadata } from "../shared/lib/helpers/build-page-metadata";
import { SITE_URL, SITE_VERIFICATION } from "../shared/config/site";

import "./styles/css/globals.css";
import "./styles/scss/globals.scss";

export const generateMetadata = async (): Promise<Metadata> => {
  const [t, locale] = await Promise.all([getTranslations("meta"), getLocale()]);

  return {
    ...buildPageMetadata({
      title: t("home.title"),
      description: t("home.description"),
      siteName: t("siteName"),
      locale,
      path: "/",
    }),
    ...(SITE_URL && { metadataBase: new URL(SITE_URL) }),
    applicationName: t("siteName"),
    authors: [{ name: t("author") }],
    creator: t("author"),
    keywords: t("keywords")
      .split(",")
      .map((keyword) => keyword.trim()),
    verification: {
      ...(SITE_VERIFICATION.google && { google: SITE_VERIFICATION.google }),
      ...(SITE_VERIFICATION.yandex && { yandex: SITE_VERIFICATION.yandex }),
    },
  };
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout = async ({ children, modal }: RootLayoutProps) => {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <IntroProvider />
          <AnalyticsTracker />
          <SiteChrome
            top={
              <>
                <PageLoader />
                <Menu />
                <AnalyticsNotice />
                <YandexMetrika />
              </>
            }
            bottom={<Footer />}
          >
            <QueryProvider>
              {children}
            </QueryProvider>
          </SiteChrome>
          {modal}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;