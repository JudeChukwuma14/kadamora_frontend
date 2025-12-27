import React from 'react';
import CloseButton from './OnboardingAgent/components/CloseButton';

interface VerificationInProgressModalProps {
    open: boolean;
    onClose: () => void;
}

const VerificationInProgressModal: React.FC<VerificationInProgressModalProps> = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md px-4">
            <div className="w-full sm:w-140 max-w-[100vw] bg-white backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-4px_rgba(16,24,40,0.15)] overflow-hidden relative animate-[fadeScale_.35s_ease]">
                <div className="w-full flex justify-end p-3 shadow-sm">
                    <CloseButton onClick={onClose} />
                </div>
                <div className="px-7 pt-10 pb-10 text-left">
                    <div className="mb-4 flex justify-start">
                        <img
                            src="/assets/icons/requires.svg"
                            alt="Verification in progress icon"
                            className="w-25.25 h-25.25 object-contain drop-shadow-sm animate-[popIn_.55s_cubic-bezier(.4,0,.2,1)_both,softFloat_5.5s_ease-in-out_1s_infinite]"
                            loading="lazy"
                        />
                    </div>
                    <h3 className="text-[20px] font-bold text-secondary tracking-tight">Verification In Progress</h3>
                    <p className="leading-relaxed text-[#71717A] mb-10">
                        Your agent profile is currently under review. Once it is approved, you&apos;ll be able to list
                        new properties and access the full management toolkit.
                    </p>
                    <button
                        onClick={onClose}
                        className="bg-[#002A54] hover:bg-[#013463] focus:ring-2 focus:ring-offset-2 focus:ring-[#013463]/40 transition-colors text-white text-[14px] font-medium rounded-lg px-8 py-3 inline-flex items-center justify-center shadow-sm"
                    >
                        Okay, got it
                    </button>
                </div>
                <style>{`
@keyframes popIn {0%{opacity:0;transform:scale(.6) translateY(12px) rotate(-8deg);}60%{opacity:1;transform:scale(1.05) translateY(-4px) rotate(2deg);}100%{opacity:1;transform:scale(1) translateY(0) rotate(0);} }
@keyframes softFloat {0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)} }
                `}</style>
            </div>
        </div>
    );
};

export default VerificationInProgressModal;
