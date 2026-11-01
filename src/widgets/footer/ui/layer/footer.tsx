import { FOOTER_CONFIG, FOOTER_SOCIALS } from "../../model/data";

import { FooterIdentity } from "./components/footer-identity";
import { FooterLayout } from "./components/footer-layout";
import { FooterSocials } from "./components/footer-socials";

export const Footer = () => {
    return (
       <FooterLayout>
        <FooterIdentity
            eyebrow={FOOTER_CONFIG.identity.eyebrow}
            name={FOOTER_CONFIG.identity.name}
            role={FOOTER_CONFIG.identity.role}
        />

        <FooterSocials
            label={FOOTER_CONFIG.socials.label}
            links={FOOTER_SOCIALS}
        />
       </FooterLayout>
    );
};