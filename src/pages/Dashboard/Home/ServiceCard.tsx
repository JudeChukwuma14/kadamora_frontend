import React from 'react';
import type { ServiceItem } from './service';

interface Props {
    item: ServiceItem;
}

// animate-pulse-gentle

export const ServiceCard: React.FC<Props> = ({ item }) => {
    const isLocked = !item.active;
    const canNavigate = !isLocked && item.url;

    const commonClasses = `group relative flex flex-col items-start text-left rounded-2xl border border-[#E4E7EC] bg-white/80 p-5 md:p-6 backdrop-blur-sm shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 ${
        isLocked
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:-translate-y-0.5 hover:shadow-md hover:border-emerald-400 cursor-pointer'
    }`;

    const content = (
        <>
            <span className="pointer-events-none absolute right-4 bottom-2 h-24 w-24 translate-y-2 translate-x-4 select-none opacity-[0.04] transition-opacity duration-300 group-hover:opacity-[0.07]">
                <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain"
                    loading="lazy"
                />
            </span>
            <img
                src={item.icon}
                alt={item.title}
                className="h-18.5 w-18.5 object-contain mb-3.75"
                loading="lazy"
            />

            <div className="flex w-full items-start gap-4 pr-10">
                <div className="flex flex-col items-start text-left">
                    <div className="mb-2 line-clamp-2 text-[15px] md:text-lg font-semibold leading-snug text-secondary">
                        {item.title}
                    </div>
                    <p className="line-clamp-3 text-xs md:text-[14px] leading-relaxed">{item.description}</p>
                </div>
            </div>

            {/* Lock icon for inactive items */}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-white/30 to-gray-100/20 rounded-2xl backdrop-blur-[2px] animate-fade-in">
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full animate-shimmer"></div>
                    </div>

                    <div className="relative flex flex-col items-center justify-center text-gray-600 z-10">
                        <svg
                            className="h-10 w-10 mb-3 animate-pulse-gentle hover:animate-bounce-gentle"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                        <span className="text-sm font-semibold tracking-wide animate-fade-in-up">Coming Soon</span>
                        <div className="mt-2 flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot animation-delay-0"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot animation-delay-150"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce-dot animation-delay-300"></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Arrow icon - only visible when not locked */}
            {!isLocked && (
                <svg
                    className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[#98A2B3] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            )}
        </>
    );

    if (canNavigate) {
        return (
            <a href={item.url} aria-label={item.title} className={commonClasses}>
                {content}
            </a>
        );
    }

    return (
        <div aria-label={item.title} className={commonClasses}>
            {content}
        </div>
    );
};

export default ServiceCard;
