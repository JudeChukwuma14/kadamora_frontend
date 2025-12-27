import React from 'react';

export type DocStatus = 'Active' | 'Expired' | 'Pending' | 'Approved' | 'Issued';

const STATUS_STYLES: Record<DocStatus, string> = {
    Active: 'bg-[#E6F9F0] text-[#0B7A52] border border-[#DFF4EA]',
    Expired: 'bg-[#FFEAEA] text-[#D02929] border border-[#FFD6D6]',
    Pending: 'bg-[#FFF8E8] text-[#9A6B1A] border border-[#FEF2C7]',
    Approved: 'bg-[#E6E9F9] text-[#4B5CB7] border border-[#D6D6FF]',
    Issued: 'bg-[#E6F1F9] text-[#0A66B2] border border-[#CFE8FF]',
};

const StatusTag: React.FC<{ status: DocStatus }> = ({ status }) => (
    <span className={`inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold ${STATUS_STYLES[status]}`}>
        {status}
    </span>
);

export default StatusTag;
