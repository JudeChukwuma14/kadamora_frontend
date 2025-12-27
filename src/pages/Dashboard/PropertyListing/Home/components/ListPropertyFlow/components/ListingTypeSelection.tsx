import React from 'react';
import type { ListingType } from '../ListPropertyFlowModal';


export interface ListingTypeInfo {
    key: ListingType;
    title: string;
    desc: string;
}

interface Props {
    listingTypes: ListingTypeInfo[];
    onSelect: (t: ListingType) => void;
    onClose: () => void;
}

const ListingTypeSelection: React.FC<Props> = ({ listingTypes, onSelect, onClose }) => {
    return (
        <div className="pt-0 pb-6 flex flex-col h-full overflow-hidden">
            {/* Header bar */}
            <div className="flex items-center justify-between h-14 px-8 border-b border-[#E2E8F0]">
                <h1 className="text-[16px] font-semibold text-[#0A2D50]">Property Type</h1>
                <button
                    aria-label="Close"
                    onClick={onClose}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                    <span className="text-[17px]">×</span>
                </button>
            </div>
            <div className="px-8 pb-2 flex-1 overflow-y-auto custom-scrollbar">
                <h2 className="text-[15px] md:text-[18px] font-semibold text-secondary mt-6 mb-5">
                    Select Listing Option
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {listingTypes.map((t, idx) => {
                        let iconSrc = '/assets/icons/home.svg';
                        if (t.key === 'rent') iconSrc = '/assets/icons/new_property.svg';
                        if (t.key === 'lease') iconSrc = '/assets/icons/manage_property.svg';
                        if (t.key === 'short_let') iconSrc = '/assets/icons/home.svg';
                        if (t.key === 'sell') iconSrc = '/assets/icons/investment.svg';
                        return (
                            <div
                                key={t.key}
                                onClick={() => onSelect(t.key)}
                                className={`lt-card lt-animate-in ${idx === 0 ? 'lt-delay-1' : ''} ${idx === 1 ? 'lt-delay-2' : ''} ${idx === 2 ? 'lt-delay-3' : ''} ${idx === 3 ? 'lt-delay-4' : ''} ${idx === 4 ? 'lt-delay-5' : ''} group cursor-pointer relative h-full w-full items-stretch rounded-xl border border-[#CCE3FD] bg-white px-5 py-4 text-left
                                transition-transform duration-300 ease-[cubic-bezier(.4,.14,.3,1)] hover:-translate-y-0.5 active:scale-[0.985]
                                focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40`}
                            >
                                <span className="flex h-11 w-11 mb-3.75 shrink-0 items-center justify-center rounded-full bg-[#E6F7F0] text-emerald-600 ring-1 ring-[#B7E4D3] shadow-sm">
                                    <img src={iconSrc} alt={t.title + ' icon'} className="h-6 w-6 object-contain" />
                                </span>
                                <div className="flex gap-4 w-full">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[16px] font-semibold text-secondary mb-1 leading-tight">
                                            {t.title}
                                        </p>
                                        <p className="text-[12px] font-medium text-[#52525B] leading-snug">{t.desc}</p>
                                    </div>
                                </div>
                                <span className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2 transition-transform duration-200 ease-out group-hover:translate-x-1">
                                    <img src="/assets/icons/move-right.svg" alt="" className="h-5 w-5" />
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ListingTypeSelection;
