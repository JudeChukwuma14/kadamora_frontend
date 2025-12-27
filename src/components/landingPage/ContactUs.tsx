import { Link } from 'react-router';

export default function ContactUs() {
    return (
        <section
            className="relative flex items-center justify-center min-h-100 md:min-h-125 py-16 md:py-20"
            style={{
                backgroundImage: `url(/assets/contact_us_bg.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black/60 md:bg-black/70"></div>
            <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 md:px-4 max-w-6xl mx-auto text-center md:text-left">
                {/* Mobile: Centered layout, Desktop: Left-aligned with button on right */}
                <div className="flex flex-col md:flex-row items-center justify-between w-full">
                    <div className="flex-1 flex flex-col items-center md:items-start justify-center mb-8 md:mb-0 md:py-8">
                        <h2 className="text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] font-bold text-white mb-4 md:mb-6 drop-shadow-lg text-center md:text-left leading-tight">
                            Stay Close, We Are Always Here
                        </h2>
                        <p className="text-white/90 text-base sm:text-lg md:text-xl text-center md:text-left max-w-xl md:max-w-2xl drop-shadow-lg leading-relaxed">
                            Have more questions or need assistance? Our friendly and knowledgeable team is here to help.
                            Don't hesitate to reach out — we're just a message away!
                        </p>
                    </div>

                    {/* Button Container */}
                    <div className="flex justify-center md:justify-end items-center w-full md:w-auto md:py-8">
                        <Link
                            to="/contact"
                            className="bg-primary hover:bg-primary-600 text-secondary font-semibold h-10 w-50 flex justify-center items-center md:px-10 md:py-4 rounded-full text-lg md:text-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
