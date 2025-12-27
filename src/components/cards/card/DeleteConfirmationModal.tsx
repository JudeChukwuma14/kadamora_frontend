import React from 'react';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    message?: string;
    onConfirm: () => void;
    onClose: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    title = 'Delete Property',
    message,
    onConfirm,
    onClose,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />

            <div className="relative w-full sm:max-w-[560px] max-w-[100vw] bg-white backdrop-blur-sm rounded-3xl shadow-[0_8px_40px_-4px_rgba(16,24,40,0.15)] overflow-hidden animate-[fadeScale_.35s_ease]">
                <div className="w-full flex justify-end p-3 shadow-sm">
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-gray-100/60 transition-colors"
                        aria-label="Close confirmation"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
                <div className="px-7 pt-10 pb-10">
                    <div className="mb-4 flex flex-col justify-center">
                        <img
                            src="/assets/icons/delete.svg"
                            alt="delete"
                            className="w-[101px] h-[101px] object-contain drop-shadow-sm animate-[popIn_.55s_cubic-bezier(.4,0,.2,1)_both,softFloat_5.5s_ease-in-out_1s_infinite]"
                            loading="lazy"
                        />
                    </div>
                    <h3 className="text-[20px] font-bold text-secondary tracking-tight mb-2">{title}</h3>
                    <p className="leading-relaxed text-[#52525B] mb-10 font-medium">
                        {message ??
                            'Are you sure you want to delete this property? This action is permanent and cannot be undone.'}
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onConfirm}
                            className="bg-[#002E62] hover:bg-[#013463] focus:ring-2 focus:ring-offset-2 focus:ring-[#013463]/40 transition-colors text-white text-[14px] font-medium rounded-lg px-8 py-3 inline-flex items-center justify-center shadow-sm"
                        >
                            Yes
                        </button>
                        <button
                            onClick={onClose}
                            className="border border-[#004493] hover:border-[#94A3B8] text-[#0A2D50] rounded-lg px-8 py-3 text-[14px] font-medium transition-colors"
                        >
                            No
                        </button>
                    </div>
                </div>
                <style>{`
@keyframes popIn {0%{opacity:0;transform:scale(.6) translateY(12px) rotate(-8deg);}60%{opacity:1;transform:scale(1.05) translateY(-4px) rotate(2deg);}100%{opacity:1;transform:scale(1) translateY(0) rotate(0);} }
@keyframes softFloat {0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)} }
@keyframes fadeScale_ {0%{opacity:0;transform:scale(.97) translateY(6px);}100%{opacity:1;transform:scale(1) translateY(0);} }
                `}</style>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
