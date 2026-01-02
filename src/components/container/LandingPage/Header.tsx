import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { MdClose } from 'react-icons/md';

interface HeaderProps {
    isSticky: boolean;
    hasHero?: boolean;
}

export default function Header({ isSticky, hasHero = true }: HeaderProps) {
    const [mobileOpen, setMobileOpen] = useState(false); // slide state
    const [menuVisible, setMenuVisible] = useState(false); // mount state
    const location = useLocation();

    // Helper function to check if a path is active
    const isActivePath = (path: string) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    const getHeaderClasses = () => {
        if (!hasHero) {
            return 'bg-white';
        }
        return isSticky ? 'bg-secondary' : '';
    };

    const getTextClasses = (isActive = false) => {
        if (!hasHero) {
            return isActive ? 'text-primary' : 'text-gray-700 hover:text-primary';
        }
        return isActive ? 'text-white' : 'text-gray-300 hover:text-primary';
    };

    const getButtonClasses = () => {
        if (!hasHero) {
            return {
                login: 'text-gray-700 hover:text-primary px-6 py-1 border border-primary-600 rounded-full font-medium',
                getStarted:
                    'bg-primary text-secondary px-6 py-1 rounded-full border-primary-600 hover:bg-primary/90 font-medium',
            };
        }
        return {
            login: 'text-gray-300 hover:text-primary px-6 py-1 border border-primary-600 rounded-full font-medium',
            getStarted:
                'bg-primary text-secondary px-6 py-1 rounded-full border-primary-600 hover:bg-border font-medium',
        };
    };

    const buttonStyles = getButtonClasses();

    useEffect(() => {
        // Lock body scroll while menu is visible (includes exit animation)
        if (menuVisible) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => document.body.classList.remove('overflow-hidden');
    }, [menuVisible]);

    const openMenu = () => {
        setMenuVisible(true);
        // allow next frame for transition start
        requestAnimationFrame(() => setMobileOpen(true));
    };

    const closeMenu = () => {
        setMobileOpen(false);
        // unmount after animation ends
        setTimeout(() => setMenuVisible(false), 300);
    };

    return (
        <header
            className={`fixed top-0 w-full z-30 h-[100px] transition-colors backdrop-blur-md ${getHeaderClasses()}`}
        >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    <div className="flex items-center">
                        <Link to="/">
                            <img
                                src={hasHero ? '/assets/logo/logo-full.png' : '/assets/logo/logo-small-black.png'}
                                alt="Kadamora Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                    </div>
                    <div className="hidden lg:flex space-x-8 font-medium">
                        <Link to="/" className={`nav-anim ${getTextClasses(isActivePath('/'))} relative`}>
                            Home
                        </Link>
                        <Link to="/about" className={`nav-anim ${getTextClasses(isActivePath('/about'))} relative`}>
                            About Us
                        </Link>
                        <Link
                            to="/timeline"
                            className={`nav-anim ${getTextClasses(isActivePath('/timeline'))} relative`}
                        >
                            Timeline
                        </Link>
                        <Link to="/contact" className={`nav-anim ${getTextClasses(isActivePath('/contact'))} relative`}>
                            Contact Us
                        </Link>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4">
                        <Link to="/auth/login" className={buttonStyles.login}>
                            Login
                        </Link>
                        <Link to="/auth/signup" className={buttonStyles.getStarted}>
                            Get Started
                        </Link>
                    </div>
                    {/* Mobile hamburger */}
                    <div
                        aria-label="Open menu"
                        aria-controls="mobile-menu"
                        onClick={openMenu}
                        className={`lg:hidden ${hasHero ? 'text-white' : 'text-gray-700'} cursor-pointer`}
                    >
                        <span className="sr-only">Open main menu</span>
                        <div className="space-y-1.5">
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                            <span className="block w-7 h-0.5 bg-current rounded"></span>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile full-screen menu */}
            {menuVisible && (
                <div
                    id="mobile-menu"
                    className={`fixed inset-0 z-50 w-screen h-screen bg-[#001731] text-white px-6 py-6 flex flex-col transform transition-transform duration-300 ease-out ${
                        mobileOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <div className="flex items-center justify-between">
                        <Link to="/" onClick={closeMenu}>
                            <img src={'/assets/logo/logo-full.png'} alt="Kadamora Logo" className="h-13 w-auto" />
                        </Link>
                        <button
                            aria-label="Close menu"
                            onClick={closeMenu}
                            className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center"
                        >
                            <span className="text-xl leading-none">
                                <MdClose color="#ffffff" size={24} />
                            </span>
                        </button>
                    </div>

                    <nav className="mt-20 space-y-8">
                        <Link to="/" onClick={closeMenu} className="block text-4xl font-medium">
                            Home
                        </Link>
                        <Link to="/about" onClick={closeMenu} className="block text-4xl font-medium">
                            About Us
                        </Link>
                        {/* <Link to="/timeline" onClick={closeMenu} className="block text-4xl font-medium">
                            Timeline
                        </Link> */}
                        {/* <Link to="/dashboard" onClick={closeMenu} className="block text-4xl font-medium">
                            Dashboard
                        </Link> */}
                        <Link to="/contact" onClick={closeMenu} className="block text-4xl font-medium">
                            Contact Us
                        </Link>

                        {/* Auth Links */}
                        <div className="pt-8 border-t border-gray-600 space-y-6">
                            <Link
                                to="/auth/login"
                                onClick={closeMenu}
                                className="block text-[35px] font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/auth/signup"
                                onClick={closeMenu}
                                className="block text-2xl font-medium bg-primary text-secondary px-6 py-3 rounded-full hover:bg-primary/90 transition-colors w-fit"
                            >
                                Get Started
                            </Link>
                        </div>
                    </nav>

                    <div className="mt-auto text-sm text-gray-300">
                        {new Date().getFullYear()} © Kadamora. All rights reserved.
                    </div>
                </div>
            )}
        </header>
    );
}
