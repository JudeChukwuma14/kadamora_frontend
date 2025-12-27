import LandingPageContainer from "@components/container/LandingPage/LandingPageContainer";
import { AboutSEO } from "@components/SEO/SEO";
import Stats from "./components/Stats";
import Teams from "./components/Teams";
import ContactUs from "../ContactUs";
import Hero from "./components/Hero";


export default function AboutUs() {
    return (
        <>
            <AboutSEO />
            <LandingPageContainer hero={Hero}>
                <Stats />
                <Teams />
                <ContactUs />
            </LandingPageContainer>
        </>
    );
}
