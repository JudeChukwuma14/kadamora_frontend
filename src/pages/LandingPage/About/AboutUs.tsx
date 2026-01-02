import LandingPageContainer from "@components/container/LandingPage/LandingPageContainer";
import { AboutSEO } from "@components/SEO/SEO";
import Stats from "./components/Stats";
import Teams from "./components/Teams";
import ContactForm from "@components/landingPage/ContactForm";
import FAQ from "@components/landingPage/FAQ";
import Hero from "./components/Hero";


export default function AboutUs() {
    return (
        <>
            <AboutSEO />
            <LandingPageContainer hero={Hero}>
                <Stats />
                <Teams />
                <ContactForm />
                <div className="bg-[#ffffff]">
                    <FAQ />
                </div>
            </LandingPageContainer>
        </>
    );
}
