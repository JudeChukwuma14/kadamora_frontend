// import LandingPageContainer from '@components/containers/LandingPage';
// import { ContactSEO } from '@components/SEO';
// import ContactForm from '@components/landingPage/contactus/ContactForm';
// import FAQ from '@components/landingPage/faq';

import LandingPageContainer from "@components/container/LandingPage/LandingPageContainer";
import ContactForm from "@components/landingPage/ContactForm";
import FAQ from "@components/landingPage/FAQ";

import { ContactSEO } from "@components/SEO/SEO";

export default function ContactUs() {
    return (
        <>
            <ContactSEO />
            <LandingPageContainer>
                <ContactForm />
                <div className="bg-[#ffffff]">
                    <FAQ />
                </div>
            </LandingPageContainer>
        </>
    );
}
