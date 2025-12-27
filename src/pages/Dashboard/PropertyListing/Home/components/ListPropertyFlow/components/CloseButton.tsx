import React from 'react';

const CloseButton: React.FC<{ onClick: () => void; className?: string }> = ({ onClick, className = '' }) => (
    <button
        onClick={onClick}
        aria-label="Close"
        className={`h-8 w-8 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#94A3B8] ${className}`}
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
);

export default CloseButton;
