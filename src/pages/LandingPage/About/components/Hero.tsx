export default function Hero() {
    return (
        <>
            {/* Background Image */}
            <div className="absolute inset-0">
                <img src="/assets/about-us-bg.png" alt="Hero Background" className="w-full h-full object-cover" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-[70vh] flex flex-col justify-center">
                {/* Top section - Company intro */}
                <div className="text-left mb-5 mt-20">
                    <div className="backdrop-blur-md bg-gray-800/80 flex items-center mb-6 h-7.5 rounded-[50px] px-4 w-fit">
                        <img src="/assets/icons/check_mark.png" alt="Check" className="w-4 h-4 mr-2" />
                        <span className="font-medium text-white">Smart Kadamora</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">Kadamora</h1>
                    <p className="text-white text-sm md:text-base max-w-4xl mt-4 leading-relaxed">
                        Kadamora Connecting People, Places & Professional ServicesWhether you're searching for your next
                        home, exploring hospitality and tour opportunities, or managing complex construction and
                        logistics needs, Kadamora is your all-in-one platform. List properties, find destinations, or
                        offer professional services—Kadamora brings users and providers together to create a more
                        connected, efficient experience
                    </p>
                </div>

                {/* Bottom section - Mission and Vision */}
                <div className="grid md:grid-cols-2 gap-8 mt-7.5 md:mt-auto">
                    {/* Our Mission */}
                    <div className="rounded-lg p-0 md:p-6">
                        <div className="flex items-center mb-4">
                            <div className="rounded-full flex items-center justify-center mr-3">
                                <img src="/assets/icons/mission.png" alt="Mission" className="w-9 h-9" />
                            </div>
                            <h3 className="text-white text-xl font-semibold">Our Mission</h3>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            To simplify the property experience by offering seamless listing, management, and support
                            services that empower property owners, connect buyers and tenants.
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="rounded-lg p-0 md:p-6">
                        <div className="flex items-center mb-4">
                            <div className="rounded-full flex items-center justify-center mr-3">
                                <img src="/assets/icons/vision.png" alt="Vision" className="w-9 h-9" />
                            </div>
                            <h3 className="text-white text-xl font-semibold">Vision</h3>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed">
                            To become the most trusted and innovative property platform, transforming how people list,
                            manage, and interact with real estate across communities.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
