import React, { useEffect } from 'react';

interface ModalProps {
    isOpen: boolean;
    isClosing: boolean;
    title: string;
    onClose: () => void;
    children: React.ReactNode;
    maxWidth?: string;
    height?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    isClosing,
    title,
    onClose,
    children,
    maxWidth = 'max-w-3xl',
    height = 'max-h-[80vh]',
}) => {
    // Hide body scrollbar when modal is open
    useEffect(() => {
        if (isOpen && !isClosing) {
            // Store original overflow style
            const originalStyle = window.getComputedStyle(document.body).overflow;
            // Hide scrollbar
            document.body.style.overflow = 'hidden';

            // Cleanup function to restore original overflow
            return () => {
                document.body.style.overflow = originalStyle;
            };
        }
    }, [isOpen, isClosing]);

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 transition-opacity duration-200 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
        >
            <div
                className={`bg-white rounded-2xl shadow-border ${maxWidth} w-full mx-4 ${height} flex flex-col overflow-hidden transition-all duration-300 ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10 shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
                    <div className="flex items-center gap-2">
                        <button
                            title="More options"
                            aria-label="More options"
                            className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                        <button
                            title="Close modal"
                            aria-label="Close modal"
                            className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                            onClick={onClose}
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                            >
                                <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                                <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
