import React from 'react';

export interface StatCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="rounded-lg border border-[#CCE3FD] bg-white p-4 w-full flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-primary mx-auto xs:mx-0">
                {icon ?? (
                    <svg className="h-6 w-6 text-[#0A2D50]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeWidth={1.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 11V3m0 0L7.5 7.5M12 3l4.5 4.5"
                        />
                    </svg>
                )}
            </div>
            <div className="flex-1 ml-3.75">
                <div className="text-xs font-medium text-[#52525B] truncate">{title}</div>
                <div className="text-[20px] font-semibold text-secondary truncate">{value}</div>
            </div>
        </div>
    );
};

export default StatCard;
