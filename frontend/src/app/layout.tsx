import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AnalyticsTracker } from "../features/analytics-tracker";

import { Menu } from "../widgets/layout/menu";
import { Footer } from "../widgets/layout/footer";
import { PageLoader } from "../widgets/layout/page-loader";

import { QueryProvider } from "./providers/query-provider";
import { IntroProvider } from "./providers/intro-provider";
import { SiteChrome } from "../widgets/layout/site-chrome/site-chrome";

import "./styles/css/globals.css";
import "./styles/scss/globals.scss";

export const metadata: Metadata = {
  title: "Maxim Novikov — Frontend Developer",
  description: "Portfolio of Maxim Novikov: projects, articles and contacts.",
};

interface RootLayoutProps {
  children: ReactNode;
  modal: ReactNode;
}

const RootLayout = ({ children, modal }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <IntroProvider />
        <AnalyticsTracker />
        <SiteChrome
          top={
            <>
              <PageLoader />
              <Menu />
            </>
          }
          bottom={<Footer />}
        >
          <QueryProvider>
            {children}
          </QueryProvider>
        </SiteChrome>
        {modal}
      </body>
    </html>
  );
}

export default RootLayout;