import React, { useState, useEffect, useCallback } from 'react';

import StepsSidebar from './components/StepsSidebar';
import { type StepDef } from './components/types';

import DetailsStep from './components/DetailsStep';
import RentPaymentStep from './components/RentPaymentStep';
import LeasePricingStep from './components/LeasePricingStep';
import PricingBookingStep from './components/PricingBookingStep';
import LocationRulesStep from './components/LocationRulesStep';
import PricingStep from './components/PricingStep';
import MediaStep from './components/MediaStep';

import ListingTypeSelection, { type ListingTypeInfo } from './components/ListingTypeSelection';

// Listing types
const LISTING_TYPES: ListingTypeInfo[] = [
    {
        key: 'rent',
        title: 'Rent',
        desc: 'List your property for long-term rental and connect with tenants looking for a home to stay.',
    },
    {
        key: 'short_let',
        title: 'Short Let',
        desc: 'Post your fully furnished space for short-term rentals to travelers or temporary guests.',
    },
    {
        key: 'lease',
        title: 'Lease',
        desc: 'Offer your property on a fixed-term lease, ideal for businesses or tenants seeking extended stays.',
    },
    {
        key: 'sell',
        title: 'Sell',
        desc: 'Put your property up for sale and reach buyers interested in making a full purchase.',
    },
];

// Types
export type ListingType = 'rent' | 'lease' | 'short_let' | 'sell';

interface Props {
    open: boolean;
    step?: number;
    onClose: () => void;
    goTo?: (s: number) => void;
}

const getStepsForType = (type: ListingType): StepDef[] => {
    switch (type) {
        case 'rent':
            return [
                { id: 'details', title: 'Property Details' },
                { id: 'rent_payment', title: 'Rent And Payment Information' },
                { id: 'media', title: 'Media' },
            ];
        case 'lease':
            return [
                { id: 'details', title: 'Property Details' },
                { id: 'lease_pricing', title: 'Lease Term And Pricing' },
                { id: 'media_docs', title: 'Media And Document' },
            ];
        case 'short_let':
            return [
                { id: 'details', title: 'Property Details' },
                { id: 'pricing_booking', title: 'Pricing And Booking Information' },
                { id: 'location_rules', title: 'Location And Rules' },
                { id: 'media', title: 'Media' },
            ];
        case 'sell':
            return [
                { id: 'details', title: 'Property Details' },
                { id: 'pricing', title: 'Pricing' },
                { id: 'media_docs', title: 'Media And Document' },
            ];
    }
};

const ListPropertyFlowModal: React.FC<Props> = ({ open, onClose }) => {
    const [listingType, setListingType] = useState<ListingType | null>(null);
    const [currentIdx, setCurrentIdx] = useState(0);

    useEffect(() => {
        if (!open) return; // lock scroll
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', handler);
        };
    }, [open]);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => {
            setListingType(null);
            setCurrentIdx(0);
        }, 250);
    }, [onClose]);

    if (!open) return null;

    const steps = listingType ? getStepsForType(listingType) : [];
    const activeStep = steps[currentIdx];
    const isLast = currentIdx === steps.length - 1;

    const goNext = () => {
        if (!isLast) setCurrentIdx((i) => i + 1);
        else handleClose();
    };
    const goPrev = () => {
        if (currentIdx === 0) return;
        setCurrentIdx((i) => i - 1);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <div
                className={`relative w-full ${!listingType ? 'max-w-200' : 'max-w-270'} min-h-[30vh] rounded-xl bg-white shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] flex flex-col max-h-[90vh] md:max-h-none`}
            >
                <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
                {/* Close */}

                {!listingType && (
                    <ListingTypeSelection
                        listingTypes={LISTING_TYPES}
                        onSelect={setListingType}
                        onClose={handleClose}
                    />
                )}

                {/* Flow forms */}
                {listingType && (
                    <div className="flex">
                        <StepsSidebar steps={steps} currentIdx={currentIdx} listingType={listingType} />
                        {/* Content */}
                        <div className="flex-1 p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
                            <h3 className="block text-[15px] font-semibold text-[#0A2D50]">
                                List Property for <span className="capitalize">{listingType}</span>
                            </h3>
                            <div className="space-y-6">
                                {activeStep?.id === 'details' && <DetailsStep />}
                                {activeStep?.id === 'rent_payment' && <RentPaymentStep />}
                                {activeStep?.id === 'lease_pricing' && <LeasePricingStep />}
                                {activeStep?.id === 'pricing_booking' && <PricingBookingStep />}
                                {activeStep?.id === 'location_rules' && <LocationRulesStep />}
                                {activeStep?.id === 'pricing' && <PricingStep />}
                                {(activeStep?.id === 'media' || activeStep?.id === 'media_docs') && (
                                    <MediaStep includeDocs={activeStep?.id === 'media_docs'} />
                                )}
                            </div>
                            {/* Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
                                <div className="flex gap-3">
                                    <button
                                        disabled={currentIdx === 0}
                                        onClick={goPrev}
                                        className={`h-9 px-6 rounded-md text-[13px] font-medium border ${currentIdx === 0 ? 'border-[#E2E8F0] text-[#94A3B8] bg-white' : 'border-[#E2E8F0] text-[#0A2D50] bg-white hover:bg-[#F1F5F9]'}`}
                                    >
                                        Previous
                                    </button>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={goNext}
                                        className="h-9 px-6 rounded-md text-[13px] font-medium bg-[#0A2D50] text-white hover:bg-[#08345F]"
                                    >
                                        {isLast ? 'Submit' : 'Proceed'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListPropertyFlowModal;
