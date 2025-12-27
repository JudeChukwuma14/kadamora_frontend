import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

interface Slide {
    id: string;
    src: string;
    alt: string;
    overlayClass: string;
}

const SLIDE_DURATION = 5000;

export default function Hero() {
    const slides = useMemo<Slide[]>(
        () => [
            {
                id: 'modern-home',
                src: '/assets/hero.png',
                alt: 'Modern home exterior at dusk',
                overlayClass: 'from-black/90 via-black/55 to-black/20',
            },
            {
                id: 'luxury-interior',
                src: '/assets/hero2.png',
                alt: 'Luxury living room interior',
                overlayClass: 'from-[#05060d]/85 via-[#0f172a]/60 to-transparent',
            },
            {
                id: 'cityscape',
                src: '/assets/contact_us_bg.jpg',
                alt: 'City skyline at sunset',
                overlayClass: 'from-[#020617]/85 via-[#0b1220]/65 to-transparent',
            },
        ],
        [],
    );

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return undefined;
        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, SLIDE_DURATION);
        return () => window.clearInterval(interval);
    }, [slides.length]);

    const handleSelectSlide = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <section className="relative isolate min-h-[70vh] overflow-hidden">
            <div className="absolute inset-0" aria-hidden>
                {slides.map((slide, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        >
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className={`h-full w-full object-cover transition-transform duration-2000 ease-in-out ${
                                    isActive ? 'scale-100' : 'scale-105'
                                }`}
                            />
                            <div
                                className={`absolute inset-0 bg-linear-to-r ${slide.overlayClass} transition-opacity duration-700 ${
                                    isActive ? 'opacity-100' : 'opacity-0'
                                }`}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Slide indicators */}
            {slides.length > 1 ? (
                <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4">
                    {slides.map((slide, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <button
                                key={slide.id}
                                type="button"
                                onClick={() => handleSelectSlide(index)}
                                className="grid h-6 w-6 place-items-center rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
                                aria-label={`Show slide ${index + 1} of ${slides.length}`}
                                aria-pressed={isActive}
                            >
                                <span
                                    className={`flex h-6 w-6 items-center justify-center rounded-full border transition-colors duration-300 ${
                                        isActive
                                            ? 'border-[#22C55E] bg-black/50 shadow-[0_0_0_4px_rgba(34,197,94,0.18)]'
                                            : 'border-white/50 bg-black/30 hover:border-white/80'
                                    }`}
                                >
                                    <span
                                        className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                                            isActive ? 'bg-[#22C55E]' : 'bg-white/40'
                                        }`}
                                    />
                                </span>
                            </button>
                        );
                    })}
                </div>
            ) : null}

            {/* Hero Content */}
            <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-7xl items-end px-4 pb-12.5 pt-30 sm:px-6 lg:px-8">
                <div className="grid w-full items-end gap-12 lg:grid-cols-2">
                    {/* Left side - Text content */}
                    <div className="max-w-2xl">
                        <div className="flex h-7.5 w-55 items-center rounded-[50px] bg-[rgba(57,55,53,0.65)] pl-2.5 backdrop-blur-md">
                            <img src="/assets/icons/check_mark.png" alt="Check" className="mr-2 h-4 w-4" />
                            <span className="text-white font-medium">Smart Kadamora</span>
                        </div>
                        <div className="mb-6 text-4xl font-bold text-white md:text-[50px]">
                            Smart Real <span className="text-primary">Estate Management</span> for Modern Living
                        </div>
                    </div>

                    {/* Right side - Information card */}
                    <div className="block justify-end lg:flex">
                        <div className="rounded-lg p-0 lg:p-6">
                            <p className="mb-4 text-white leading-7">
                                Our all-in-one real estate management system simplifies property listings, tenant
                                communication, maintenance tracking, and financial reporting. Whether you manage
                                residential, commercial, or mixed-use spaces
                            </p>
                            <Link
                                to="/auth/signup"
                                className="rounded-full bg-primary px-8 py-1 text-lg text-secondary transition-colors hover:bg-border"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
