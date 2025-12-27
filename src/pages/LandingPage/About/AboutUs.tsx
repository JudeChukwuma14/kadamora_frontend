import Hero from './components/hero';
import Stats from './components/stats';
import Teams from './components/teams';

import ContactUs from '@components/landingPage/contactus';
import LandingPageContainer from '@components/containers/LandingPage';
import { AboutSEO } from '@components/SEO';

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
