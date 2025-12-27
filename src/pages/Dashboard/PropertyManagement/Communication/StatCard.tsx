import React from 'react';

export interface StatCardProps {
    icon?: React.ReactNode;
    label: string;
    value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => (
    <div className="rounded-lg border border-[#E6EEF7] bg-white p-4 shadow-sm flex items-center gap-4">
        <div className="h-12 w-12 rounded-full flex items-center justify-center bg-gray-100">{icon}</div>
        <div>
            <div className="text-xs font-medium text-[#516F8A]">{label}</div>
            <div className="text-[18px] font-semibold text-[#093154]">{value}</div>
        </div>
    </div>
);

export default StatCard;
