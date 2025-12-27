// import { fakeDb } from '@components/fakeDB/index';
import { fakeDb } from '@components/fakeDB/fakeDb';
import { useRef, useState, useEffect } from 'react';

export default function Testimonials() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const cardWidth = 450; // Width of each testimonial card
    const cardGap = 24; // Gap between cards (6 * 4px = 24px for gap-6)
    const scrollStep = cardWidth + cardGap; // How much to scroll per click

    // Update navigation state based on scroll position
    const updateNavigationState = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 10); // Small tolerance for floating point precision
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    // Handle scroll to update navigation state
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', updateNavigationState);
            updateNavigationState(); // Initial check
            return () => container.removeEventListener('scroll', updateNavigationState);
        }
    }, []);

    // Scroll to previous testimonials
    const scrollToPrevious = () => {
        if (scrollContainerRef.current && canScrollLeft) {
            const currentScrollLeft = scrollContainerRef.current.scrollLeft;
            const newScrollPosition = Math.max(0, currentScrollLeft - scrollStep);

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    // Scroll to next testimonials
    const scrollToNext = () => {
        if (scrollContainerRef.current && canScrollRight) {
            const currentScrollLeft = scrollContainerRef.current.scrollLeft;
            const newScrollPosition = currentScrollLeft + scrollStep;

            scrollContainerRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };
    return (
        <section className="py-16 bg-[#f7f8fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-4 text-center">
                        What people Say About Us
                    </h2>
                    <p className="text-gray-600 max-w-150 text-center">
                        Lorem ipsum dolor sit amet consectetur. Rutrum risus consequat interdum tempus sapien sed amet
                        dignissim aliquam. Consequat adipiscing et venenatis ultricies ut vestibulum.
                    </p>
                </div>

                {/* Testimonials Carousel Container */}
                <div className="relative">
                    {/* Scrollable Testimonials Container */}
                    <div ref={scrollContainerRef} className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-6 pb-4 w-max">
                            {fakeDb.testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="bg-white rounded-lg border border-gray-200 p-6 w-112.5 shrink-0 relative overflow-hidden"
                                >
                                    {/* Background vector image */}
                                    <div className="absolute bottom-0 right-0 pointer-events-none">
                                        <img src="/assets/vector2.png" alt="" className="w-24 h-24 object-contain" />
                                    </div>
                                    <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                                        "{testimonial.text}"
                                    </p>
                                    <div className="flex items-center relative z-10">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={testimonial.avatar}
                                                alt={testimonial.author}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full bg-gray-400 rounded-full flex items-center justify-center text-white font-semibold">${testimonial.author.charAt(0)}</div>`;
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-start items-center mt-6.25">
                        <div className="mr-3.75">
                            <button
                                onClick={scrollToPrevious}
                                disabled={!canScrollLeft}
                                title="Previous testimonials"
                                aria-label="Previous testimonials"
                                className={`w-12 h-12 bg-white rounded-full border flex items-center justify-center transition-colors group ${
                                    canScrollLeft
                                        ? 'border-[#BABABA] hover:border-[#43CC88] hover:bg-[#E6FAF3] cursor-pointer'
                                        : 'border-gray-300 cursor-not-allowed opacity-50'
                                }`}
                            >
                                <svg
                                    className={`w-6 h-6 ${
                                        canScrollLeft ? 'text-[#BABABA] group-hover:text-[#43CC88]' : 'text-gray-300'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="">
                            <button
                                onClick={scrollToNext}
                                disabled={!canScrollRight}
                                title="Next testimonials"
                                aria-label="Next testimonials"
                                className={`w-12 h-12 bg-white rounded-full border flex items-center justify-center transition-colors group ${
                                    canScrollRight
                                        ? 'border-[#BABABA] hover:border-[#43CC88] hover:bg-[#E6FAF3] cursor-pointer'
                                        : 'border-gray-300 cursor-not-allowed opacity-50'
                                }`}
                            >
                                <svg
                                    className={`w-6 h-6 ${
                                        canScrollRight ? 'text-[#BABABA] group-hover:text-[#43CC88]' : 'text-gray-300'
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
