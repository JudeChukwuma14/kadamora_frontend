import { useState, useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import RedirectIfAuthenticated from '../../guards/RedirectIfAuthenticated';

interface LandingPageContainerProps {
    children: ReactNode;
    hero?: () => ReactNode;
}

export default function LandingPageContainer({ children, hero }: LandingPageContainerProps) {
    const [isSticky, setIsSticky] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                const heroBottom = heroRef.current.getBoundingClientRect().bottom;
                setIsSticky(heroBottom <= 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <RedirectIfAuthenticated>
            <div className="min-h-screen">
                {/* Header/Navigation */}
                <Header isSticky={isSticky} hasHero={!!hero} />
                {hero && (
                    <section ref={heroRef} className="relative bg-gray-900">
                        {hero()}
                    </section>
                )}

                <section className={!hero ? 'mt-[100px]' : ''}>{children}</section>
                <Footer />
            </div>
        </RedirectIfAuthenticated>
    );
}
