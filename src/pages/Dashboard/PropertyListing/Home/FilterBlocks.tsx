import React, { useEffect } from 'react';

interface FilterCardProps {
    title: string;
    children: React.ReactNode;
}

const FilterCard: React.FC<FilterCardProps> = ({ title, children }) => (
    <div className="rounded-2xl border border-[#CCE3FD] bg-white overflow-hidden">
        <div className="bg-[#F3F3F9] px-5 py-3">
            <h4 className="text-[#001731] text-[13px] font-semibold leading-none">{title}</h4>
        </div>
        <div className="px-5 py-4">{children}</div>
    </div>
);

const PillButton: React.FC<{ label: string; active?: boolean }> = ({ label, active }) => (
    <button
        type="button"
        className={[
            'text-[13px]  rounded-md px-4 py-2 border transition-colors',
            active
                ? 'bg-[#EBFAF3] border-[#CBEEDB] text-[#0A2D50]'
                : 'bg-[#F4F6FA] border-transparent text-[#475467] hover:bg-[#EDF1F7]',
        ].join(' ')}
    >
        {label}
    </button>
);

export const FilterBlocks: React.FC = () => (
    <>
        <FilterCard title="Property Type">
            <div className="flex flex-wrap gap-2">
                <PillButton label="Rent (62)" active />
                <PillButton label="Lease (234)" />
                <PillButton label="Sell (120)" />
                <PillButton label="Shortlet (234)" />
            </div>
        </FilterCard>
        <FilterCard title="Property Category">
            <div className="flex flex-wrap gap-2">
                <PillButton label="Affordable" />
                <PillButton label="Luxurious (34)" />
                <PillButton label="Ultra-Luxurious (83)" />
            </div>
        </FilterCard>
        <FilterCard title="Category Type">
            <div className="flex flex-wrap gap-2">
                <PillButton label="Residentials (634)" />
                <PillButton label="Commercial (62)" />
                <PillButton label="Mixed Used Property (234)" />
                <PillButton label="Land Listing (234)" />
                <PillButton label="Others (234)" />
            </div>
        </FilterCard>
        <FilterCard title="Location">
            <div className="px-1 py-1">
                <button
                    type="button"
                    className="w-full flex items-center justify-between rounded-md border border-transparent bg-[#F4F6FA] hover:bg-[#EDF1F7] px-4 py-3 text-left text-[12px] text-[#0A2D50] "
                >
                    <span>All (Nigeria)</span>
                    <svg
                        className="h-4 w-4 text-[#475467]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </FilterCard>
        <FilterCard title="Price Range">
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-[13px]  text-[#475467] mb-1">Min Price</p>
                        <input
                            placeholder="₦ 0.00"
                            className="w-full rounded-md border border-transparent bg-[#F4F6FA] px-3 py-2 text-[13px] text-[#0A2D50] focus:border-emerald-400 focus:bg-white focus:outline-none"
                        />
                    </div>
                    <div>
                        <p className="text-[13px]  text-[#475467] mb-1">Max Price</p>
                        <input
                            placeholder="₦ 0.00"
                            className="w-full rounded-md border border-transparent bg-[#F4F6FA] px-3 py-2 text-[13px] text-[#0A2D50] focus:border-emerald-400 focus:bg-white focus:outline-none"
                        />
                    </div>
                </div>
                <div className="flex justify-between text-[13px]">
                    <button className="text-[#475467] hover:underline" type="button">
                        Reset
                    </button>
                    <button className="text-emerald-600 hover:underline " type="button">
                        Filter
                    </button>
                </div>
            </div>
        </FilterCard>
        <FilterCard title="Property Condition">
            <div className="flex flex-wrap gap-2">
                <PillButton label="New (634)" />
                <PillButton label="Renovated (62)" />
                <PillButton label="Not New (234)" />
            </div>
        </FilterCard>
    </>
);

export const MobileFilterModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    useEffect(() => {
        if (!open) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [open, onClose]);

    useEffect(() => {
        if (open) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = prev;
            };
        }
    }, [open]);

    if (!open) return null;
    return (
        <div
            className="fixed inset-0 z-40 flex items-start justify-center bg-black/60 px-4 pt-16 md:hidden"
            role="dialog"
            aria-modal="true"
        >
            <div className="w-100 max-w-full bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden animate-fade-in-up">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#E3ECF5]">
                    <h3 className="text-[#0A2D50] text-[15px] font-semibold">Filters</h3>
                    <button
                        onClick={onClose}
                        className="h-8 w-8 flex items-center justify-center rounded-full border border-[#E3ECF5] text-[#475467] hover:bg-[#F4F6FA]"
                        aria-label="Close filters"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-4 w-4"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>
                <div className="p-5 space-y-5 overflow-y-auto max-h-[60vh] pb-6">
                    <FilterBlocks />
                </div>
                <div className="mt-auto px-5 py-4 border-t border-[#E3ECF5] bg-white">
                    <button
                        onClick={onClose}
                        className="w-full rounded-md bg-[#002A54] text-white text-[14px]  py-3 hover:bg-[#013463] transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBlocks;
