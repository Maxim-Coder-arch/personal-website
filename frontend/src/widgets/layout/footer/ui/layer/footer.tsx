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
    return (
        <FooterLayout>
            <FooterHero
                eyebrow={FOOTER_CONFIG.hero.eyebrow}
                titleTop={FOOTER_CONFIG.hero.titleTop}
                titleBottom={FOOTER_CONFIG.hero.titleBottom}
                highlight={FOOTER_CONFIG.hero.highlight}
                ctaLabel={FOOTER_CONFIG.hero.ctaLabel}
                ctaHref={FOOTER_CONFIG.hero.ctaHref}
            />

            <div className={styles["footer__columns"]}>
                <FooterNav
                    label={FOOTER_CONFIG.nav.label}
                    links={FOOTER_NAV}
                />

                <FooterSocials
                    label={FOOTER_CONFIG.socials.label}
                    links={FOOTER_SOCIALS}
                />

                <FooterClock
                    label={FOOTER_CONFIG.clock.label}
                    place={FOOTER_CONFIG.clock.place}
                />

                <FooterLost
                    label={FOOTER_CONFIG.lost.label}
                    code={FOOTER_CONFIG.lost.code}
                    text={FOOTER_CONFIG.lost.text}
                    href={FOOTER_CONFIG.lost.href}
                />
            </div>

            <FooterWordmark text={FOOTER_CONFIG.wordmark} />
        </FooterLayout>
    );
};