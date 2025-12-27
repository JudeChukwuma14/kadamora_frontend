import React, { useState } from 'react';
import StatCard from './StatCard';
import Chat from './Chat';
import AnnouncementCard from './AnnouncementCard';

const statData = [
    {
        label: 'Today Messages',
        value: 8,
        icon: (
            <svg
                className="h-7 w-7 text-[#0A66B2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
            >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <path d="M8 2v4M16 2v4" />
            </svg>
        ),
    },
    {
        label: 'Active Announcements',
        value: 4,
        icon: (
            <svg
                className="h-7 w-7 text-[#0B7A52]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path d="M12 19V5M5 12h14" />
            </svg>
        ),
    },
    {
        label: 'Unread Messages',
        value: 3,
        icon: (
            <svg
                className="h-7 w-7 text-[#0A66B2]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
            >
                <rect x="4" y="4" width="16" height="16" rx="4" />
                <path d="M8 2v4M16 2v4" />
            </svg>
        ),
    },
    {
        label: 'Total Recipients',
        value: 9,
        icon: (
            <svg
                className="h-7 w-7 text-[#F9B233]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
            >
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
            </svg>
        ),
    },
];

const tabList = ['Messages', 'Announcements'] as const;

// const messages = [
//     {
//         name: 'Rent Remainder',
//         subtitle: 'John Smith',
//         lastMessage: 'Hi John, this is a friendly reminder that your rent payment for unit Diamond A is due tomorrow',
//         time: '19 July,2025 11:30 AM',
//         unreadCount: 0,
//     },
//     {
//         name: 'AC Issue follow up',
//         subtitle: 'Sarah Johnson',
//         lastMessage: 'Thank you for scheduling the AC repair. When can I expect the technician to arrive?',
//         time: '19 July,2025 1:30 PM',
//         unreadCount: 1,
//     },
//     {
//         name: 'Rent Remainder',
//         subtitle: 'Charles David',
//         lastMessage: 'Hi John, this is a friendly reminder that your rent payment for unit Diamond A is due tomorrow',
//         time: '18 July,2025 11:30 AM',
//         unreadCount: 0,
//     },
// ];

const announcements = [
    {
        title: 'Building Maintenance Notice',
        to: 'All Tenants - Hilltop Terrace',
        content:
            'We will be performing a routine maintenance check on the elevator system this Saturday from 10 AM to 3 PM',
        date: '19 July,2025',
        time: '11:30 AM',
    },
    {
        title: 'Building Maintenance Notice',
        to: 'All Tenants - Dominion Duplex',
        content:
            'We will be performing a routine maintenance check on the water system this Saturday from 10 AM to 3 PM',
        date: '19 July,2025',
        time: '11:30 AM',
    },
    {
        title: 'Building Maintenance Notice',
        to: 'All Tenants - Hilton Estate',
        content:
            'We will be performing a routine maintenance check on the Drainage system this Friday from 12 PM to 5 PM',
        date: '19 July,2025',
        time: '11:30 AM',
    },
];

const CommunicationPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<(typeof tabList)[number]>('Messages');
    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {statData.map((s) => (
                        <StatCard key={s.label} label={s.label} value={s.value} icon={s.icon} />
                    ))}
                </div>
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex items-center gap-6 mb-6">
                        {tabList.map((tab) => (
                            <button
                                key={tab}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-md border-b-2 ${activeTab === tab ? 'border-[#0A66B2] text-[#0A66B2] bg-[#F1F9FF]' : 'border-transparent text-[#475467] bg-[#FAFBFC]'}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div>
                        {activeTab === 'Messages' && <Chat />}
                        {activeTab === 'Announcements' && (
                            <div>
                                {announcements.map((a, idx) => (
                                    <AnnouncementCard
                                        key={idx}
                                        icon={
                                            <svg
                                                className="h-6 w-6 text-[#0A66B2]"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path d="M12 19V5M5 12h14" />
                                            </svg>
                                        }
                                        {...a}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunicationPage;
