import React, { useState } from 'react';

import StatusCard from './StatusCard';
import pendingIcon from './icons/pendinf.svg';
import progressIcon from './icons/progress.svg';
import scheduledIcon from './icons/scheduled.svg';
import completedIcon from './icons/completed.svg';
import RequestCard from '@components/cards/card/RequestCard';
import type { RequestStatus, Priority } from '@components/cards/card/RequestCard';
import Input from '@components/forms/Input';

const statusStats = [
    {
        label: 'Pending',
        value: 8,
        icon: <img src={pendingIcon} alt="Pending" className="h-12 w-12" />,
    },
    {
        label: 'In-Progress',
        value: 4,
        icon: <img src={progressIcon} alt="In-Progress" className="h-12 w-12" />,
    },
    {
        label: 'Scheduled',
        value: 3,
        icon: <img src={scheduledIcon} alt="Scheduled" className="h-12 w-12" />,
    },
    {
        label: 'Completed',
        value: 9,
        icon: <img src={completedIcon} alt="Completed" className="h-12 w-12" />,
    },
];

const tabList = ['Pending', 'In-Progress', 'Scheduled', 'Completed'] as const;

const requestsData = {
    'Pending': [
        {
            title: 'Leaking Bathroom Faucet',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Pending' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Plumber',
            showActions: true,
        },
        {
            title: 'Circuit Overheating',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Pending' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Electrician',
            showActions: true,
        },
    ],
    'In-Progress': [
        {
            title: 'Leaking Bathroom Faucet',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'In-progress' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Plumber',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
            percent: 40,
        },
        {
            title: 'Circuit Overheating',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'In-progress' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Plumber',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
            percent: 80,
        },
    ],
    'Scheduled': [
        {
            title: 'Circuit Overheating',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Scheduled' as RequestStatus,
            priority: 'Medium' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Electrician',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
        },
        {
            title: 'Faulty Door Handle',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Scheduled' as RequestStatus,
            priority: 'Low' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Carpenter',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
        },
    ],
    'Completed': [
        {
            title: 'Leaking Roof',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Completed' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Carpenter',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
            percent: 100,
        },
        {
            title: 'Circuit Overheating',
            description:
                'Lorem ipsum dolor sit amet consectetur. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet. Ut morbi tortor non fringilla nec urna. Purus eu erat nunc nisl. Massa commodo in sed mattis.',
            status: 'Completed' as RequestStatus,
            priority: 'High' as Priority,
            assignee: 'Michael Chamberlain',
            property: 'Hilltop DiamondA',
            serviceType: 'Plumber',
            cost: '35,000.00',
            assignedTo: 'Chukwu & Co Plumbing Services',
            scheduled: '03 June, 2025',
            percent: 100,
        },
    ],
};

const MaintenancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<(typeof tabList)[number]>('Pending');
    const [search, setSearch] = useState('');
    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-4 flex items-center gap-2 flex-wrap">
                    {/* Tabs are rendered in the root layout */}
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {statusStats.map((s) => (
                        <StatusCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:gap-6 sm:overflow-x-auto sm:flex-nowrap">
                        <div className="flex gap-2 sm:gap-6 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                            {tabList.map((tab) => (
                                <button
                                    key={tab}
                                    className={`px-3 py-1.5 text-sm font-semibold border-b-2 whitespace-nowrap ${activeTab === tab ? 'border-[#002E62] text-[#002E62]' : 'border-transparent text-[#71717A]'}`}
                                    onClick={() => setActiveTab(tab)}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2 sm:ml-auto">
                            <div className="relative flex-1 max-w-xs m-1">
                                <svg
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98A2B3]"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                    <circle cx="11" cy="11" r="7" />
                                </svg>
                                <Input
                                    title={undefined}
                                    containerClassName="w-full"
                                    className="pl-9 pr-3 py-2 text-[14px]"
                                    placeholder="Search ..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {requestsData[activeTab]
                            .filter((r) => {
                                if (!search) return true;
                                const q = search.toLowerCase();
                                return (
                                    r.title.toLowerCase().includes(q) ||
                                    r.description.toLowerCase().includes(q) ||
                                    (r.assignee ?? '').toLowerCase().includes(q) ||
                                    (r.property ?? '').toLowerCase().includes(q) ||
                                    (r.serviceType ?? '').toLowerCase().includes(q)
                                );
                            })
                            .map((r, idx) => (
                                <RequestCard key={idx} {...r} />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaintenancePage;
