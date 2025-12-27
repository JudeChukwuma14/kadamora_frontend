import React from 'react';
import CloseButton from './CloseButton';

interface ListingSuccessPromptProps {
    message?: string;
    onOkay: () => void;
}

const ListingSuccessPrompt: React.FC<ListingSuccessPromptProps> = ({ message, onOkay }) => (
    <div className="relative w-full sm:w-140 max-w-[100vw] bg-white backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-4px_rgba(16,24,40,0.15)] overflow-hidden animate-[fadeScale_.35s_ease]">
        <div className="w-full flex justify-end p-3 shadow-sm">
            <CloseButton onClick={onOkay} />
        </div>
        <div className="px-7 pt-8 pb-10 text-center">
            <div className="mb-7 flex items-center justify-center">
                <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-[#E6F9F0]">
                    <span className="absolute inset-0 rounded-full border border-[#34D399]/30 animate-ping" />
                    <span className="absolute inset-0 rounded-full border border-[#34D399]/20 animate-ping delay-150" />
                    <img src="/assets/icons/success.svg" alt="Listing created" className="relative z-10 h-14 w-14" />
                </div>
            </div>
            <h3 className="text-[20px] font-bold text-[#0A2D50] mb-3">Property Listing Created!</h3>
            <p className="leading-relaxed text-[#5A6473] mb-8">
                {message ??
                    'Your property has been submitted successfully. We will take you to your listings so you can keep track of its status.'}
            </p>
            <div className="flex w-full justify-center items-center">
                <button
                    onClick={onOkay}
                    className="inline-flex items-center justify-center bg-[#002A54] hover:bg-[#013463] text-white text-[14px] font-semibold rounded-lg px-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#013463]/60 focus:ring-offset-1"
                >
                    Okay
                </button>
            </div>
        </div>
        <style>{`
@keyframes fadeScale {0%{opacity:0;transform:scale(.92) translateY(12px);}100%{opacity:1;transform:scale(1) translateY(0);}}
        `}</style>
    </div>
);

export default ListingSuccessPrompt;
