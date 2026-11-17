import type { Metadata } from "next";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";

import { AnalyticsTracker } from "../features/analytics-tracker";

import { Menu } from "../widgets/layout/menu";
import { Footer } from "../widgets/layout/footer";
import { PageLoader } from "../widgets/layout/page-loader";

import { QueryProvider } from "./providers/query-provider";
import { IntroProvider } from "./providers/intro-provider";
import { SiteChrome } from "../widgets/layout/site-chrome/site-chrome";

import "./styles/css/globals.css";
import "./styles/scss/globals.scss";
import { AnalyticsNotice } from "../widgets/layout/analytics-notice";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("meta.home");

  return { title: t("title"), description: t("description") };
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