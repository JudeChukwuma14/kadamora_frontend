import React from 'react';

export type StatusType = 'Paid' | 'Due';

const STATUS_STYLES: Record<StatusType, string> = {
    Paid: 'bg-[#E6F9F0] text-[#0B7A52] border border-[#DFF4EA]',
    Due: 'bg-[#FFEAEA] text-[#D02929] border border-[#FFD6D6]',
};

const StatusTag: React.FC<{ status: StatusType }> = ({ status }) => (
    <span className={`inline-block px-4 py-1.5 rounded-full text-[13px] font-semibold ${STATUS_STYLES[status]}`}>
        {status}
    </span>
);

export default StatusTag;
