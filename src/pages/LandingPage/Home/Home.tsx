import LandingPageContainer from "@components/container/LandingPage/LandingPageContainer";
import { HomeSEO } from "@components/SEO/SEO";
import Services from "./components/Services";
import Listings from "./components/Listings";
import Features from "./components/Features";
import Why from "./components/Why";
import Testimonials from "./components/Testimonials";
import ContactForm from "@components/landingPage/ContactForm";
import Hero from "./components/Hero";
import FAQ from "@components/landingPage/FAQ";

export default function Home() {
    return (
        <>
            <HomeSEO />
            <LandingPageContainer hero={Hero}>
                <Services />
                <Listings />
                <Features />
                <Why />
                <div className="bg-[#f7f8fa]">
                    <FAQ />
                </div>
                <Testimonials />
                <ContactForm />
            </LandingPageContainer>
        </>
    );
}
