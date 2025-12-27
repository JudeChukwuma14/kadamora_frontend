import React, { useEffect, useRef, useState } from 'react';
import CardMenuItem from './CardMenuItem';
import DeleteConfirmationModal from './DeleteConfirmationModal';

export interface PropertyCard2Props {
    id: number | string;
    name: string;
    address?: string;
    tenants?: number | string;
    // optional callbacks
    onEdit?: (id: number | string) => void;
    onAddTenant?: (id: number | string) => void;
    onDelete?: (id: number | string) => void;
}

const PropertyCard2: React.FC<PropertyCard2Props> = ({ id, name, address, tenants, onEdit, onAddTenant, onDelete }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const firstItemRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) setMenuOpen(false);
        }

        function handleKey(e: KeyboardEvent) {
            if (e.key === 'Escape') setMenuOpen(false);
        }

        if (menuOpen) {
            document.addEventListener('mousedown', handleClick);
            document.addEventListener('keydown', handleKey);
            // focus the first item for quick keyboard navigation
            setTimeout(() => firstItemRef.current?.focus(), 0);
        }

        return () => {
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [menuOpen]);

    const tenantsIcon = (
        <span className="h-10 w-10 rounded-full bg-[#F3F6F9] flex items-center justify-center">
            {/* <img src={activeTenantsIcon} alt="Tenants" className="h-8 w-8" /> */}
        </span>
    );

    return (
        <>
            <article
                data-id={id}
                className={`rounded-2xl border border-[#CCE3FD] bg-white p-4 relative group flex flex-col gap-2 min-w-[320px] cursor-pointer transform transition-all duration-200 ease-in-out hover:bg-[#F8FBFF] hover:border-[#BEE7FF] hover:-translate-y-1 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#BEE7FF] ${menuOpen ? 'z-50' : 'hover:z-20'}`}
            >
                {/* three-dot menu */}
                <div className="absolute top-4 right-4 text-[#6B7280]">
                    <div className="relative inline-block" ref={menuRef}>
                        {/* toggler */}
                        <button
                            type="button"
                            aria-haspopup="menu"
                            aria-expanded={menuOpen}
                            aria-controls={`prop-menu-${id}`}
                            onClick={() => setMenuOpen((s) => !s)}
                            className="p-2 rounded-full hover:bg-gray-100/60 transition-colors"
                            aria-label="Open property actions"
                        >
                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                                <circle cx="5" cy="12" r="1.5" />
                                <circle cx="12" cy="12" r="1.5" />
                                <circle cx="19" cy="12" r="1.5" />
                            </svg>
                        </button>

                        {menuOpen && (
                            <div
                                id={`prop-menu-${id}`}
                                role="menu"
                                aria-orientation="vertical"
                                className="absolute right-0 mt-2 w-[220px] bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-100 overflow-hidden"
                            >
                                <CardMenuItem
                                    ref={firstItemRef}
                                    label="Edit Property"
                                    iconSrc="/assets/icons/pen-line.svg"
                                    iconAlt="Edit Property"
                                    onActivate={() => {
                                        setMenuOpen(false);
                                        onEdit?.(id);
                                    }}
                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                />

                                <CardMenuItem
                                    label="Add Tenant"
                                    iconSrc="/assets/icons/plus.svg"
                                    iconAlt="Add Tenant"
                                    onActivate={() => {
                                        setMenuOpen(false);
                                        onAddTenant?.(id);
                                    }}
                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                />

                                <div className="h-px bg-[#EEF4FB] my-1" />

                                <CardMenuItem
                                    label="Delete Property"
                                    iconSrc="/assets/icons/trash-2.svg"
                                    iconAlt="Delete"
                                    onActivate={() => {
                                        // close menu and open confirm modal
                                        setMenuOpen(false);
                                        setShowDeleteConfirm(true);
                                    }}
                                    className="text-[#D02929] hover:bg-[#FFF5F5]"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <h3 className="text-[18px] font-medium text-[#002E62] mb-1">{name}</h3>
                    <p className="text-[13px] text-[#6B7280] mb-1">{address}</p>
                </div>
                <div className="flex items-center gap-4">
                    {tenantsIcon}
                    <div>
                        <div className="text-[16px] font-medium text-[#002E62]">
                            {tenants?.toString().padStart(3, '0')}
                        </div>
                        <div className="text-[14px] text-[#6B7280]">Tenants</div>
                    </div>
                </div>
            </article>
            {/* delete confirmation modal */}
            <DeleteConfirmationModal
                isOpen={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={() => {
                    onDelete?.(id);
                    setShowDeleteConfirm(false);
                }}
            />
        </>
    );
};

export default PropertyCard2;
