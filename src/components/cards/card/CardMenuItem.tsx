import React from 'react';

export interface CardMenuItemProps {
    label: string;
    iconSrc?: string;
    iconAlt?: string;
    className?: string; // additional classes
    onActivate?: () => void;
}

const CardMenuItem = React.forwardRef<HTMLDivElement, CardMenuItemProps>(
    ({ label, iconSrc, iconAlt = '', className = '', onActivate }, ref) => {
        const handleKey = (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onActivate?.();
            }
        };

        return (
            <div
                ref={ref}
                role="menuitem"
                tabIndex={0}
                className={`flex items-center justify-start gap-3 w-full px-4 py-3 transition-colors text-left cursor-pointer ${className}`}
                onClick={() => onActivate?.()}
                onKeyDown={handleKey}
            >
                {iconSrc ? <img src={iconSrc} alt={iconAlt} className="h-4 w-4" /> : null}
                <span className="text-sm font-semibold">{label}</span>
            </div>
        );
    },
);

CardMenuItem.displayName = 'CardMenuItem';
export default CardMenuItem;
