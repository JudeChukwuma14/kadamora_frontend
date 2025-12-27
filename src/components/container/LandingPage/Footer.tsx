export default function Footer() {
    return (
        <footer className="bg-[#001731] py-12 md:h-[500px] text-[#ffffff] relative overflow-hidden md:flex md:items-center">
            {/* Pattern background in bottom right corner */}
            <div
                className="absolute bottom-0 right-[5%] w-100 h-100 bg-no-repeat bg-bottom bg-contain"
                style={{ backgroundImage: 'url(/assets/vector2.png)' }}
            ></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Left half: logo/info */}
                    <div className="md:w-1/2 w-full flex flex-col justify-between mb-8 md:mb-0">
                        <img
                            src="/assets/logo/logo-full-white.svg"
                            alt="Kadamora Logo"
                            className="h-12 w-[200px] mb-4"
                        />
                        {/* <div className="text-2xl font-bold text-emerald-600 mb-4">Kadamora</div> */}
                        <p className="text-white text-sm mb-4 max-w-[400px]">
                            Our all-in-one real estate management platform designed to streamline property operations
                            and enhance the living experience.
                        </p>
                        <div className="flex space-x-4">
                            <div className="w-8 h-8 border border-primary rounded-full flex justify-center items-center">
                                <img src="/assets/icons/twitter.png" alt="Twitter" className="h-[16px]" />
                            </div>
                            <div className="w-8 h-8 border border-primary rounded-full flex justify-center items-center">
                                <img src="/assets/icons/facebook.png" alt="Facebook" className="h-[16px]" />
                            </div>
                            <div className="w-8 h-8 border border-primary rounded-full flex justify-center items-center">
                                <img src="/assets/icons/instagram.png" alt="Instagram" className="h-[16px]" />
                            </div>
                            <div className="w-8 h-8 border border-primary rounded-full flex justify-center items-center">
                                <img src="/assets/icons/linkedin.png" alt="LinkedIn" className="h-[16px]" />
                            </div>
                            <div className="w-8 h-8 border border-primary rounded-full flex justify-center items-center">
                                <img src="/assets/icons/whatsapp.png" alt="WhatsApp" className="h-[16px]" />
                            </div>
                        </div>
                    </div>
                    {/* Right half: navigation/services/contact */}
                    <div className="md:w-1/2 w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="font-semibold text-white mb-4">INFO</h4>
                            <ul className="space-y-2 text-sm text-white">
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Our Services
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Get Started
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">LEGAL</h4>
                            <ul className="space-y-2 text-sm text-white">
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Privacy Policy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-emerald-600">
                                        Terms of Use
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-white mb-4">Contact Info</h4>
                            <ul className="space-y-2 text-sm text-white">
                                <li>contact@Kadamora.com</li>
                                <li>+234 8101735245</li>
                                <li>123 Opebi Allen Avenue, Ikeja Lagos, Nigeria</li>
                                <li>123 Opebi Allen Avenue, Ikeja Lagos, Nigeria</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t border-[#D9D9D9] mt-8 pt-8 text-sm text-white">
                    <p>&copy; 2025 Kadamora. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
