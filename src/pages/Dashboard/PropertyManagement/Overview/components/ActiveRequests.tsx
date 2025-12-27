import React from 'react';
import RequestCard from '@components/cards/card/RequestCard';

export interface RequestItem {
    id: number | string;
    title: string;
    description?: string;
    assignee?: string;
    property?: string;
    cost?: string;
    serviceType?: string;
    status?: 'In-progress' | 'Pending' | 'Completed' | 'Assigned';
    priority?: 'High' | 'Medium' | 'Low';
    assignedTo?: string;
    scheduled?: string;
    showActions?: boolean;
}

const ActiveRequests: React.FC<{ requests?: RequestItem[] }> = ({ requests }) => {
    const list = requests ?? [];
    return (
        <section className="rounded-lg border border-[#E8F1F9] bg-white p-4 xs:p-2">
            <div className="flex justify-between items-center">
                <h3 className="text-[18px] font-semibold text-[#093154] flex items-center gap-2">
                    <span className="inline-block">
                        <img src="/assets/icons/info.svg" alt="Recent Activities" className="h-6 w-6" />
                    </span>
                    Active Request
                </h3>
                <a href="#" className="text-sm text-[#0A66B2] font-medium">
                    View All
                </a>
            </div>
            <div className="mt-4 space-y-3">
                {list.map((r) => (
                    <RequestCard key={String(r.id)} {...r} />
                ))}
                {list.length === 0 && <div className="text-sm text-[#94A3B8] py-8">No active requests.</div>}
            </div>
        </section>
    );
};

export default ActiveRequests;
