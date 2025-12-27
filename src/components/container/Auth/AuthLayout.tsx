import { Outlet } from 'react-router';
import bg from './images/bg.png';
import logo from './images/logo.png';
import Header from '../LandingPage/Header';

export default function AuthLayout() {
    return (
        <div className="min-h-screen bg-white">
            {/* Mobile Header - Only visible on small screens */}
            <div className="lg:hidden">
                <Header isSticky={false} hasHero={false} />
            </div>

            {/* Main Content Grid */}
            <div className="min-h-screen lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-[100px] lg:pt-0">
                {/* Left visual panel - Hidden on mobile */}
                <div className="hidden lg:block relative bg-secondary overflow-hidden" aria-hidden>
                    {/* Brand */}
                    <a href="/">
                        <img
                            src={logo}
                            alt="Kadamora logo"
                            className="absolute top-[24px] left-[24px] w-[200px] h-auto z-20"
                        />
                    </a>

                    {/* Smart Estate caption bubble */}
                    {/* <div className="absolute top-[112px] right-[40px] w-[520px] z-10">
                        <div className="relative rounded-[30px] text-white p-6 overflow-visible transition-colors backdrop-blur-md">
                            <div className="absolute top-0 right-[-24px] w-[96px] h-[48px] rounded-[24px]" />
                            <div className="relative z-10">
                                <h2 className="text-[25px] leading-snug font-semibold">
                                    <span className="text-green-400">Smart</span> Estate Management for
                                    <br /> Modern Living
                                </h2>
                                <div className="flex">
                                    <p className="mt-3 max-w-[330px]">
                                        Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur
                                        euismod
                                    </p>
                                    <div className="ml-6 flex items-center self-end">
                                        <div className="flex -space-x-2">
                                            <div className="h-8 w-8 rounded-full bg-transparent ring-2 ring-white/40 border border-white/30" />
                                            <div className="h-8 w-8 rounded-full bg-transparent ring-2 ring-white/40 border border-white/30" />
                                            <div className="h-8 w-8 rounded-full bg-transparent ring-2 ring-white/40 border border-white/30" />
                                        </div>
                                        <span className="h-8 w-8 rounded-full ml-3 text-xs bg-[#E6F2FF] text-secondary border border-white/30 flex items-center justify-center">
                                            +20K
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Building visual */}
                    <img
                        src={bg}
                        alt="Kadamora building"
                        className="absolute bottom-0 left-0 w-full h-auto object-contain pointer-events-none select-none z-0"
                    />
                </div>

                {/* Right content panel */}
                <div className="flex items-center justify-center px-4 sm:px-8 py-8 lg:py-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
