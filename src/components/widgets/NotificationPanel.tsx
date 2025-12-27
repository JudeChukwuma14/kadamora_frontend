import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export interface NotificationItem {
    id: string | number;
    title: string;
    body: string;
    date: string; // ISO or human readable
    read?: boolean;
    avatarUrl?: string;
}

interface NotificationPanelProps {
    open: boolean;
    onClose: () => void;
    notifications: NotificationItem[];
    onMarkAllRead: () => void;
}

// Order adjusted to match design (All, Read, Unread)
const tabs = ['All', 'Read', 'Unread'] as const;

const NotificationPanel: React.FC<NotificationPanelProps> = ({ open, onClose, notifications, onMarkAllRead }) => {
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('All');
    const panelRef = useRef<HTMLDivElement | null>(null);

    // Disable background scroll while panel open & manage ESC key
    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            const onKey = (e: KeyboardEvent) => {
                if (e.key === 'Escape') onClose();
            };
            window.addEventListener('keydown', onKey);
            return () => {
                document.body.style.overflow = prev;
                window.removeEventListener('keydown', onKey);
            };
        }
    }, [open, onClose]);

    // Focus trap start focus inside panel
    useEffect(() => {
        if (open && panelRef.current) {
            const focusable = panelRef.current.querySelector<HTMLElement>('button, [href], input');
            focusable?.focus();
        }
    }, [open]);

    const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);
    const filtered = useMemo(() => {
        if (activeTab === 'Unread') return notifications.filter((n) => !n.read);
        if (activeTab === 'Read') return notifications.filter((n) => n.read);
        return notifications;
    }, [notifications, activeTab]);

    return (
        <div className={`fixed inset-0 z-50 ${open ? '' : 'pointer-events-none'}`} role="presentation">
            {/* Backdrop */}
            <div
                onClick={onClose}
                className={`absolute inset-0 bg-[#101828] transition-opacity duration-300 ${open ? 'opacity-40' : 'opacity-0'}`}
            />
            {/* Panel */}
            <aside
                ref={panelRef}
                className={`absolute right-0 top-0 flex h-full w-full max-w-160 flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : 'translate-x-full'}`}
                role="dialog"
                aria-modal="true"
                aria-label="Notifications"
            >
                <header className="flex items-center justify-between px-8 pt-8 pb-5">
                    <h2 className="text-[20px] font-medium text-[#111827]">Notification</h2>
                    <button
                        onClick={onClose}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F2F4F7] text-[#667085] focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                        aria-label="Close notifications"
                    >
                        <FaTimes size={14} />
                    </button>
                </header>
                {/* Tabs + actions */}
                <div className="px-8">
                    <div className="flex items-center gap-4">
                        <div className="inline-flex rounded-md border border-[#E4E7EC] bg-[#F9FAFB] text-[13px] font-medium overflow-hidden">
                            {tabs.map((t) => {
                                const active = t === activeTab;
                                return (
                                    <button
                                        key={t}
                                        onClick={() => setActiveTab(t)}
                                        className={`relative px-7 py-2 transition-colors ${active ? 'bg-white text-[#101828]' : 'text-[#667085] hover:text-[#101828]'}`}
                                        aria-current={active ? 'true' : undefined}
                                    >
                                        {t}
                                        {active && (
                                            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-emerald-500" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <button
                            type="button"
                            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#F2F4F7] text-[#101828] hover:bg-[#E4E7EC] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                            aria-label="More options"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* List */}
                <div className="mt-6 flex-1 overflow-y-auto px-8 pb-10 divide-y divide-[#F2F4F7]">
                    {filtered.map((n, idx) => {
                        const colorClasses = [
                            'ring-emerald-500/70',
                            'ring-purple-500/60',
                            'ring-emerald-600/60',
                            'ring-amber-500/70',
                            'ring-violet-500/60',
                            'ring-rose-500/60',
                        ];
                        const ringClass = colorClasses[idx % colorClasses.length];
                        return (
                            <div key={n.id} className="relative flex gap-5 py-6 text-[13px]">
                                <div
                                    className={`h-12 w-12 rounded-full ring-2 ${ringClass} flex items-center justify-center overflow-hidden bg-white`}
                                >
                                    {n.avatarUrl ? (
                                        <img src={n.avatarUrl} alt="avatar" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-semibold text-[#101828]">
                                            {n.title.charAt(0).toUpperCase()}
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 pr-6">
                                    <p className="text-[#1D2739] leading-relaxed">
                                        <span className="font-semibold">{n.title}</span>{' '}
                                        <span className="text-[#475467]">{n.body}</span>
                                    </p>
                                    <p className="mt-2 text-[11px] text-[#667085]">{n.date}</p>
                                </div>
                                {!n.read && (
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[#005BD3]" />
                                )}
                            </div>
                        );
                    })}
                    {filtered.length === 0 && (
                        <div className="py-20 text-center text-sm text-[#667085]">No notifications</div>
                    )}
                </div>
                <footer className="px-8 py-4 border-t border-[#E4E7EC] text-[12px] text-[#667085] flex items-center justify-between">
                    <span>{unreadCount} unread</span>
                    <button
                        onClick={onMarkAllRead}
                        disabled={unreadCount === 0}
                        className="text-emerald-600 hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Mark all as read
                    </button>
                </footer>
            </aside>
        </div>
    );
};

export default NotificationPanel;
