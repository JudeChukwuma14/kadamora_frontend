import React from 'react';
import paymentIcon from './icons/payment.svg';
import maintainanceIcon from './icons/maintainance_report.svg';
import noticeIcon from './icons/rent.svg';

export interface ActivityItem {
    id: number | string;
    title: string;
    subtitle?: string;
    date?: string;
    amount?: string;
    type?: 'payment' | 'maintenance' | 'notice' | 'other';
}

const ActivityRow: React.FC<{ a: ActivityItem }> = ({ a }) => {
    const iconMap: Record<string, string> = {
        payment: paymentIcon,
        maintenance: maintainanceIcon,
        notice: noticeIcon,
        other: paymentIcon,
    };
    const colorMap: Record<string, string> = {
        payment: 'bg-[#E6F6F3] text-[#256D51]',
        maintenance: 'bg-[#FFF7E6] text-[#B27A0A]',
        notice: 'bg-[#FFF0F0] text-[#D02929]',
        other: 'bg-[#F9F9FB] text-[#4B5563]',
    };
    const labelMap: Record<string, string> = {
        payment: 'Payment',
        maintenance: 'Maintenance',
        notice: 'Lease',
        other: 'Other',
    };
    const initials = a.subtitle?.split(' ')[0]?.[0] + (a.subtitle?.split(' ')[1]?.[0] || '');
    return (
        <div className="flex items-center gap-4 py-4 border-b last:border-b-0">
            <span className={`h-11 w-11 rounded-full flex items-center justify-center ${colorMap[a.type ?? 'other']}`}>
                <img src={iconMap[a.type ?? 'other']} alt={a.type} className="h-11 w-11" />
            </span>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-[17px] font-medium text-[#0A2D50] truncate">{a.title}</span>
                    <span className="px-2 py-1 rounded-md bg-[#F3F6F9] text-[#0A2D50] text-xs font-medium">
                        {labelMap[a.type ?? 'other']}
                    </span>
                </div>
                <div className="text-[15px] text-[#475467] truncate">{a.subtitle}</div>
                <div className="text-[13px] text-[#94A3B8]">{a.date}</div>
            </div>
            <span className="h-9 w-9 rounded-full bg-[#F3F6F9] flex items-center justify-center text-[#0A2D50] font-medium text-[15px] border">
                {initials}
            </span>
        </div>
    );
};

const RecentActivities: React.FC<{ items?: ActivityItem[] }> = ({ items }) => {
    const list = items ?? [];
    return (
        <aside className="rounded-2xl border border-[#CCE3FD] bg-white p-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-[20px] font-medium text-[#093154] flex items-center gap-2">
                    <span className="inline-block">
                        <img src="/assets/icons/info.svg" alt="Recent Activities" className="h-6 w-6" />
                    </span>
                    Recent Activities
                </h3>
                <a href="#" className="text-sm text-[#0A66B2] font-medium">
                    View All
                </a>
            </div>
            <div className="mt-2 divide-y divide-[#F3F6F9]">
                {list.map((it) => (
                    <ActivityRow key={String(it.id)} a={it} />
                ))}
                {list.length === 0 && <div className="text-sm text-[#94A3B8] py-8">No recent activities.</div>}
            </div>
        </aside>
    );
};

export default RecentActivities;
