import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router';
import { FaRegBell } from 'react-icons/fa';
import './dashboardLayout.css';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import type { NotificationItem } from '../widgets/NotificationPanel';
import NotificationPanel from '../widgets/NotificationPanel';
import { logout } from '@store/slices/auth.slice';

export interface DashboardLayoutProps {
    children?: React.ReactNode;
    /** Current value of the global dashboard search */
    searchValue?: string;
    /** Change handler for the search input; if omitted, the search bar is hidden */
    onSearchChange?: (value: string) => void;
    /** Optional user display information */
    userName?: string;
    userEmail?: string;
    userInitials?: string;
}

const navItems = [
    { label: 'Home', to: '/dashboard/home', iconClass: 'icon-home' },
    // { label: 'Timeline', to: '/dashboard/timeline', iconClass: 'icon-timeline' },
    { label: 'Chat', to: '/dashboard/chat', iconClass: 'icon-chat' },
    // { label: 'Marketplace', to: '/dashboard/marketplace', iconClass: 'icon-marketplace' },
    // { label: 'Services', to: '/dashboard/services', iconClass: 'icon-services' },
    { label: 'Subscription', to: '/dashboard/subscription', iconClass: 'icon-subscription' },
    { label: 'Settings', to: '/dashboard/settings', iconClass: 'icon-settings' },
];

const userMenuItems = [
    {
        label: 'Profile',
        icon: <img src="/assets/icons/circle-user-round.svg" alt="Profile" className="h-6 w-6" />,
        path: '/dashboard/profile',
    },
    {
        label: 'My Listing',
        icon: <img src="/assets/icons/list-check.svg" alt="My Listing" className="h-6 w-6" />,
        path: '/dashboard/my-listing',
    },
    {
        label: 'Saved',
        icon: <img src="/assets/icons/heart-plus.svg" alt="Saved" className="h-6 w-6" />,
        path: '/dashboard/saved',
    },
    {
        label: 'My Investment',
        icon: <img src="/assets/icons/sprout.svg" alt="Investment" className="h-6 w-6 opacity-70" />,
        path: '/dashboard/investment',
        disabled: true,
        badge: 'Coming Soon',
    },
    {
        label: 'Settings',
        icon: <img src="/assets/icons/settings2.svg" alt="Settings" className="h-6 w-6" />,
        path: '/dashboard/settings',
    },
    {
        label: 'Help Center',
        icon: <img src="/assets/icons/circle-question-mark.svg" alt="Help" className="h-6 w-6" />,
        path: '/help',
    },
    {
        label: 'Sign Out',
        icon: <img src="/assets/icons/log-out.svg" alt="Sign Out" className="h-6 w-6" />,
        action: 'signout',
    },
];

const notificationsSample: NotificationItem[] = [
    {
        id: 1,
        title: 'Ayo Ola',
        body: 'Vorem ipsum dolor sit amet, consectetur adipiscing elit. Vorem ipsum dolor sit amet.',
        date: 'March 01, 2025 7:55 pm',
        read: false,
    },
    {
        id: 2,
        title: 'Dayo David',
        body: 'A property you follow has new updates. Check the dashboard for details.',
        date: 'March 01, 2025 7:50 pm',
        read: true,
    },
    {
        id: 3,
        title: 'Ope Ade',
        body: 'You have a new inquiry regarding one of your listings.',
        date: 'March 01, 2025 7:45 pm',
        read: false,
    },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    searchValue = '',
    onSearchChange,
    userName: fallbackName = 'Charles John',
    userEmail: fallbackEmail = 'charlesjohn@gmail.com',
    userInitials: fallbackInitials = 'CJ',
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const account = useAppSelector((s) => s.auth.user);

    const derivedName = useMemo(() => {
        if (!account) return fallbackName;
        const fullName = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
        return fullName || fallbackName;
    }, [account, fallbackName]);

    const derivedEmail = account?.email ?? fallbackEmail;

    const derivedInitials = useMemo(() => {
        if (account) {
            const initialSource = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
            if (initialSource) {
                const parts = initialSource.split(' ').filter(Boolean);
                const initials = parts
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? '')
                    .join('');
                return initials || fallbackInitials;
            }
        }
        return fallbackInitials;
    }, [account, fallbackInitials]);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    // Sidebar slides over content (overlay style) on all breakpoints; start closed.
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsSample);

    const unreadCount = notifications.filter((n) => !n.read).length;
    const toggleNotif = () => setNotifOpen((o) => !o);
    const markAllRead = useCallback(() => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);
    const location = useLocation();

    // Sidebar animation trigger class for stagger effect each time it opens
    const [sidebarAnimating, setSidebarAnimating] = useState(false);
    useEffect(() => {
        if (sidebarOpen) {
            setSidebarAnimating(true);
            const t = setTimeout(() => setSidebarAnimating(false), 600);
            return () => clearTimeout(t);
        }
    }, [sidebarOpen]);

    // Close user menu on outside click / escape
    const userMenuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (!userMenuOpen) return;
        const handler = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setUserMenuOpen(false);
            }
        };
        const esc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setUserMenuOpen(false);
        };
        document.addEventListener('mousedown', handler);
        document.addEventListener('keydown', esc);
        return () => {
            document.removeEventListener('mousedown', handler);
            document.removeEventListener('keydown', esc);
        };
    }, [userMenuOpen]);

    const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

    const handleSignOut = useCallback(() => {
        dispatch(logout());
        navigate('/auth/login', { replace: true });
    }, [dispatch, navigate]);

    const handleMenuItemSelect = useCallback(
        (item: (typeof userMenuItems)[number]) => {
            if ((item as { disabled?: boolean }).disabled) {
                return;
            }
            if (item.action === 'signout') {
                handleSignOut();
                return;
            }

            if (item.path) {
                navigate(item.path);
            }
        },
        [handleSignOut, navigate],
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#f2fcf7] via-[#fcfcfc] to-white text-[#101828] flex">
            {/* Navigation Sidebar */}
            <aside
                id="dashboard-sidebar"
                className={`sidebar-panel fixed inset-y-0 left-0 z-40 w-[300px] flex flex-col overflow-y-auto border-r border-[#E4E7EC] bg-white px-6 pt-6 pb-8 shadow-sm transition-transform duration-300 ease-[cubic-bezier(.4,.0,.2,1)] will-change-transform
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} ${sidebarOpen && sidebarAnimating ? 'sidebar-opening' : ''}`}
            >
                <div className="w-full">
                    <div className="flex items-center gap-3 mb-10 sticky top-0 bg-white pt-2">
                        <a href="/dashboard">
                            <img src="/assets/logo/logo-small-black.png" alt="Kadamora Logo" className="h-10 w-auto" />
                        </a>
                    </div>
                    <nav className="space-y-2" aria-label="Primary">
                        {navItems.map((item) => {
                            const active = isActive(item.to);
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`menu-link group relative flex items-center gap-3 rounded-xl px-5 py-3 font-medium transition
                                        ${active ? 'bg-emerald-50 text-[#359F6A]' : 'text-[#093154] hover:bg-emerald-50/60 hover:text-[#359F6A]'}
                                    `}
                                >
                                    <span
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-10 w-[6px] rounded-full bg-emerald-500 transition-opacity ${
                                            active ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                                        }`}
                                    />
                                    <span className="flex items-center justify-center">
                                        <span
                                            aria-hidden="true"
                                            className={`mask-icon h-[30px] w-[30px] ${item.iconClass} transition-colors duration-300 ${
                                                active ? 'bg-emerald-600' : 'bg-[#98A2B3] group-hover:bg-emerald-500'
                                            }`}
                                        />
                                    </span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Overlay for all breakpoints when sidebar is open */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[2px]"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Main column */}
            <div className="flex min-h-screen flex-1 flex-col sticky top-0 max-h-screen overflow-y-auto">
                <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md">
                    <div className="mx-auto flex h-[70px] max-w-[1240px] w-full items-center px-3">
                        <button
                            onClick={() => setSidebarOpen((o) => !o)}
                            aria-label={sidebarOpen ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-controls="dashboard-sidebar"
                            data-expanded={sidebarOpen ? 'true' : 'false'}
                            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow hover:bg-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition-colors"
                        >
                            {sidebarOpen ? (
                                <svg
                                    className="h-8 w-8 transition-transform duration-300 rotate-90"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
                                </svg>
                            ) : (
                                <svg
                                    className="h-8 w-8 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h10" />
                                </svg>
                            )}
                        </button>
                        {/* Desktop logo */}
                        <div className="hidden lg:flex items-center gap-2 shrink-0 ml-4">
                            <Link to="/dashboard">
                                <img
                                    src="/assets/logo/logo-small-black.png"
                                    alt="Kadamora Logo"
                                    className="h-10 w-auto"
                                />
                            </Link>
                        </div>
                        {/* Search hidden on small screens to match minimalist mobile header */}
                        {onSearchChange && (
                            <div className="relative flex-1 hidden md:block ml-6">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98A2B3]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                    <circle cx="11" cy="11" r="7" />
                                </svg>
                                <input
                                    value={searchValue}
                                    onChange={(e) => onSearchChange(e.target.value)}
                                    placeholder="Search anything"
                                    className="w-[400px] rounded-lg border border-[#AFC7B9] bg-white pl-9 pr-3 py-2 text-sm focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition"
                                />
                            </div>
                        )}
                        {/* Right cluster */}
                        <div className="ml-auto flex items-center gap-4">
                            <button
                                onClick={toggleNotif}
                                className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#AFC7B9] bg-white text-[#093154] hover:text-emerald-600 hover:border-emerald-400 transition"
                                aria-label="Notifications"
                            >
                                <FaRegBell className="h-6 w-6" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 inline-flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] leading-none h-4 px-1 font-semibold">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            <div className="relative" ref={userMenuRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserMenuOpen((o) => !o)}
                                    className="flex items-center gap-3 rounded-full px-1 md:px-2 py-1 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 transition"
                                    aria-haspopup="menu"
                                >
                                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#CCD5DD] bg-white text-sm font-semibold text-[#093154] overflow-hidden">
                                        {/* Fallback initials if no avatar image */}
                                        {derivedInitials}
                                    </span>
                                    <span className="hidden md:flex flex-col text-left leading-tight">
                                        <span className="text-sm font-bold text-[#091E42]">{derivedName}</span>
                                        <span className="text-[12px] text-[#505F79]">{derivedEmail}</span>
                                    </span>
                                    <svg
                                        className={`hidden md:block h-4 w-4 text-primary transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {userMenuOpen && (
                                    <div
                                        role="menu"
                                        aria-label="User menu"
                                        className="absolute right-0 mt-3 w-56 origin-top-right rounded-xl border border-[#E4E7EC] bg-white shadow-lg ring-1 ring-black/5 p-2 animate-[fadeIn_.18s_ease-out]"
                                    >
                                        {userMenuItems.map((itm) => (
                                            <div
                                                key={itm.label}
                                                role="menuitem"
                                                aria-disabled={
                                                    (itm as { disabled?: boolean }).disabled ? 'true' : 'false'
                                                }
                                                onClick={() => {
                                                    if ((itm as { disabled?: boolean }).disabled) {
                                                        return;
                                                    }
                                                    setUserMenuOpen(false);
                                                    handleMenuItemSelect(itm);
                                                }}
                                                className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition ${
                                                    (itm as { disabled?: boolean }).disabled
                                                        ? 'cursor-not-allowed text-[#A0AEC0] bg-[#F8FAFC]'
                                                        : 'cursor-pointer text-[#52525B] hover:bg-[#F1FCF7] hover:text-[#359F6A] focus:outline-none focus:bg-[#F1FCF7]'
                                                }`}
                                            >
                                                <div className="mr-[5px]">{itm.icon}</div>
                                                <div className="flex-1 flex flex-col">
                                                    <span>{itm.label}</span>
                                                    {'badge' in itm && itm.badge ? (
                                                        <span className="mt-1 inline-flex w-max rounded-full bg-[#E4F4EC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#359F6A]">
                                                            {itm.badge}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </header>
                <main className="mx-auto max-w-[1240px] px-3 pt-4 w-full">
                    {/* Prefer passed children; fallback to <Outlet/> for route-based layout usage */}
                    {children ? children : <Outlet />}
                </main>
            </div>

            <NotificationPanel
                open={notifOpen}
                onClose={() => setNotifOpen(false)}
                notifications={notifications}
                onMarkAllRead={markAllRead}
            />
        </div>
    );
};

export default DashboardLayout;
