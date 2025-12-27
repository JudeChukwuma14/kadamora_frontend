import React, { useEffect } from 'react';
import type { RequestCardProps } from './RequestCard';
import amountIcon from '@pages/Dashboard/PropertyManagement/Overview/components/icons/amount.svg';
import serviceIcon from '@pages/Dashboard/PropertyManagement/Overview/components/icons/services.svg';

interface DetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    item?: RequestCardProps;
}

const RequestDetailsModal: React.FC<DetailsModalProps> = ({ isOpen, onClose, item }) => {
    useEffect(() => {
        if (isOpen) {
            const original = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = original;
            };
        }
    }, [isOpen]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen, onClose]);

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-stretch justify-end">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
            <div className="relative w-full sm:max-w-[500px] xl:max-w-[600px] h-full bg-white overflow-auto shadow-border animate-fade-slide-in-right transition-all duration-300">
                <div className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white z-10 border-b border-[#CCE3FD]">
                    <h3 className="text-lg font-semibold">Maintenance Details</h3>
                    <button
                        title="Close"
                        aria-label="Close details panel"
                        className="w-8 h-8 rounded-full border border-[#D4D4D8] flex items-center justify-center hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                    >
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* Body */}
                <div className="p-6">
                    {/* Optional large image */}
                    <div className="w-full rounded-lg overflow-hidden mb-4">
                        <img
                            src={
                                item.avatar ??
                                'https://images.unsplash.com/photo-1545452419-4b0c4e1a4da0?auto=format&fit=crop&w=1200&q=60'
                            }
                            alt={item.title}
                            className="w-full h-[220px] object-cover rounded-lg"
                        />
                    </div>

                    <div className="mb-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                        <h4 className="text-2xl font-semibold text-[#0A2D50]">{item.title}</h4>
                        {item.priority && (
                            <span
                                className={`px-3 py-1 rounded text-sm font-semibold ${item.priority === 'High' ? 'bg-[#FFF0F0] text-[#D02929]' : item.priority === 'Medium' ? 'bg-[#FFFBEB] text-[#9A6B1A]' : 'bg-[#F1F9FF] text-[#0C5E9C]'}`}
                            >
                                {item.priority}
                            </span>
                        )}
                        {item.status && (
                            <span className="px-3 py-1 rounded-full bg-[#F1F8FF] text-[#0A66B2] sm:ml-auto">
                                {item.status}
                            </span>
                        )}
                    </div>

                    {item.description && (
                        <p className="text-[15px] text-[#475467] leading-relaxed mb-3">{item.description}</p>
                    )}

                    {/* lists and meta */}
                    <ul className="list-disc pl-5 my-3 text-[#6B7280] text-[15px]">
                        <li>Leak is getting worse over time</li>
                        <li>Water pooling slightly around the base of the faucet</li>
                        <li>Potential water waste and risk of further damage</li>
                    </ul>

                    <div className="mt-6 text-[14px] text-[#0A2D50] font-semibold">
                        Raised On:{' '}
                        <span className="font-normal text-[#6B7280]">{item.scheduled ?? '03 June, 2025'}</span>
                    </div>

                    <div className="mt-6 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-[#0A2D50]">
                                {item.assignee?.charAt(0) ?? '-'}
                            </div>
                            <div>
                                <div className="text-[16px] font-semibold">{item.assignee}</div>
                                <div className="text-[14px] text-[#6B7280]">{item.property}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F3F6F9]">
                                <img src={amountIcon} alt="cost" className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-[#0A2D50]">₦ {item.cost}</div>
                                <div className="text-sm text-[#6B7280]">Service Cost</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-[#F3F6F9]">
                                <img src={serviceIcon} alt="type" className="h-6 w-6" />
                            </div>
                            <div>
                                <div className="font-semibold text-[#0A2D50]">{item.serviceType}</div>
                                <div className="text-sm text-[#6B7280]">Service Type</div>
                            </div>
                        </div>

                        {item.assignedTo && (
                            <div className="text-sm text-[#0A2D50]">
                                Assigned to: <span className="font-semibold text-[#6B7280]">{item.assignedTo}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RequestDetailsModal;
