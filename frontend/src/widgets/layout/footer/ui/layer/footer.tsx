import { useTranslations } from "next-intl";

import { FOOTER_CONFIG, FOOTER_NAV, FOOTER_SOCIALS } from "../../model/data";

import { FooterClock } from "./components/footer-clock";
import { FooterHero } from "./components/footer-hero";
import { FooterLayout } from "./components/footer-layout";
import { FooterLost } from "./components/footer-lost";
import { FooterNav } from "./components/footer-nav";
import { FooterSocials } from "./components/footer-socials";
import { FooterWordmark } from "./components/footer-wordmark";

import styles from "../styles/footer.module.scss";

export const Footer = () => {
    const t = useTranslations("footer");

    const navLinks = FOOTER_NAV.map((link) => ({
        ...link,
        label: t(`nav.links.${link.id}`),
    }));

    return (
        <FooterLayout>
            <FooterHero
                eyebrow={t("hero.eyebrow")}
                titleTop={t("hero.titleTop")}
                titleBottom={t("hero.titleBottom")}
                highlight={t("hero.highlight")}
                ctaLabel={t("hero.cta")}
                ctaHref={FOOTER_CONFIG.hero.ctaHref}
            />

            <div className={styles["footer__columns"]}>
                <FooterNav
                    label={t("nav.label")}
                    links={navLinks}
                />

                <FooterSocials
                    label={t("socials.label")}
                    links={FOOTER_SOCIALS}
                />

                <FooterClock
                    label={t("clock.label")}
                    place={t("clock.place")}
                />

                <FooterLost
                    label={t("lost.label")}
                    code={FOOTER_CONFIG.lost.code}
                    text={t("lost.text")}
                    href={FOOTER_CONFIG.lost.href}
                />
            </div>

            <FooterWordmark text={t("wordmark")} />
        </FooterLayout>
    );
};
