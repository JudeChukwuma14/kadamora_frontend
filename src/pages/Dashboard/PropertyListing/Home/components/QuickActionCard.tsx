import { Link } from 'react-router';

const QuickActionCard: React.FC<{
    title: string;
    desc: string;
    icon?: React.ReactNode;
    to?: string;
    onClick?: () => void;
    disabled?: boolean; // locked / disabled state
    lockedLabel?: string; // optional label override
}> = ({ title, desc, icon, to, onClick, disabled, lockedLabel }) => {
    const rootClassEnabled =
        "group no-tap-highlight relative w-full h-full rounded-[15px] border border-[#CCE3FD] bg-white p-[20px] cursor-pointer overflow-hidden transition-all duration-300 ease-[cubic-bezier(.4,.14,.3,1)] hover:bg-[#F9FCFF] hover:shadow-[0_8px_24px_-8px_rgba(16,185,129,0.25)] hover:-translate-y-[2px] before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.18),transparent_60%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100 after:content-[''] after:absolute after:top-0 after:left-[-120%] after:h-full after:w-[120%] after:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.6),transparent)] after:opacity-0 group-hover:after:animate-[qc_shimmer_1200ms_ease-in-out] group-hover:after:opacity-60";
    const rootClassDisabled =
        'relative w-full h-full rounded-[15px] border border-[#E2E8F0] bg-white p-[20px] cursor-not-allowed overflow-hidden opacity-60 select-none';
    const handleClick = () => {
        if (disabled) return;
        onClick?.();
    };
    const base = (
        <div
            onClick={handleClick}
            className={disabled ? rootClassDisabled : rootClassEnabled}
            aria-disabled={disabled ? 'true' : 'false'}
            {...(!to && onClick && !disabled ? { role: 'button', tabIndex: 0 } : { tabIndex: -1 })}
        >
            {disabled && (
                <>
                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]" />
                    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 text-[11px] font-medium text-[#0A2D50] shadow-sm">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-3.5 w-3.5"
                            stroke="currentColor"
                            fill="none"
                            strokeWidth={1.7}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <rect x="4" y="11" width="16" height="9" rx="2" />
                            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
                        </svg>
                        <span>{lockedLabel || 'Locked'}</span>
                    </div>
                </>
            )}
            {/* Icon cluster */}
            <div className="relative flex items-start pb-1">
                <div
                    className={`relative flex h-12.5 w-12.5 items-center justify-center rounded-full border border-[#CBEEDB] bg-[#F5FCF9] ${disabled ? '' : 'transition-transform duration-300 ease-out group-hover:scale-[1.07] group-hover:rotate-[4deg]'}`}
                >
                    {!disabled && (
                        <span className="pointer-events-none absolute inset-0 rounded-full bg-emerald-300/40 opacity-0 group-hover:animate-ping group-hover:opacity-60" />
                    )}
                    <div className="relative flex h-10 w-10 items-center justify-center rounded-full text-emerald-600">
                        {icon || (
                            <svg
                                viewBox="0 0 24 24"
                                className="h-9 w-9"
                                stroke="currentColor"
                                fill="none"
                                strokeWidth={1.4}
                            >
                                <path d="M3 11h18M5 11V7l7-4 7 4v4M5 11l2 10h10l2-10" />
                            </svg>
                        )}
                    </div>
                </div>
            </div>
            {/* Text */}
            <div className="flex-1 pr-12">
                <p
                    className={`text-[17px] leading-snug font-semibold mb-3 tracking-tight ${disabled ? 'text-[#475569]' : 'text-[#002E62] group-hover:text-[#013A83] transition-colors duration-300'}`}
                >
                    {title}
                </p>
                <p
                    className={`text-[13px] leading-snug max-w-110 transition-colors duration-300 ${disabled ? 'text-[#64748B]' : 'text-[#52525B] group-hover:text-[#374151]'}`}
                >
                    {desc}
                </p>
            </div>
            {/* Arrow */}
            {!disabled && (
                <div
                    className="absolute right-10 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#0A2D50]
                transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                >
                    <svg
                        className="h-6 w-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            )}
        </div>
    );
    return to ? (
        <Link to={to} className="block h-full">
            {base}
        </Link>
    ) : (
        base
    );
};

export default QuickActionCard;
