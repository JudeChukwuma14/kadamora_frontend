const gridData = [
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Pending',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Completed',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'In-progress',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        status: 'Scheduled',
        scheduled: '03 June, 2025 at 2 PM - 3 PM',
        type: 'Virtual',
    },
];
const statusColors: Record<string, string> = {
    'Pending': 'bg-[#E6F1FB] text-[#0A66B2]',
    'In-progress': 'bg-[#E9F7F1] text-[#12B76A]',
    'Scheduled': 'bg-[#F4F8FF] text-[#0A66B2]',
    'Completed': 'bg-[#FFF9E6] text-[#F7B500]',
};
import React, { useState } from 'react';
// Dummy avatars, use gray background for images
const avatar = (
    <span className="inline-flex h-8 w-8 rounded-full bg-gray-200 items-center justify-center">
        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5" />
        </svg>
    </span>
);

const statCards = [
    { label: 'Pending', value: 8, icon: 'calendar', color: 'bg-[#F4F8FF]' },
    { label: 'In-Progress', value: 4, icon: 'progress', color: 'bg-[#F4F8FF]' },
    { label: 'Scheduled', value: 3, icon: 'clock', color: 'bg-[#F4F8FF]' },
    { label: 'Completed', value: 9, icon: 'check', color: 'bg-[#F4F8FF]' },
];

const calendarData = [
    {
        name: 'John David',
        property: 'Hilltop DiamondA',
        type: 'Hybrid',
        day: 1,
        startTime: '12:00 PM',
        endTime: '02:00 PM',
    },
    {
        name: 'Miracle Stephen',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 2,
        startTime: '02:00 PM',
        endTime: '04:00 PM',
    },
    {
        name: 'Adeoye Adeniyi',
        property: 'Hilltop DiamondC',
        type: 'Physical',
        day: 1,
        startTime: '04:00 PM',
        endTime: '05:00 PM',
    },
    {
        name: 'Michael Chamberlain',
        property: 'Hilltop DiamondA',
        type: 'Virtual',
        day: 3,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'Faith Joshua',
        property: 'Hilltop DiamondA',
        type: 'Virtual',
        day: 3,
        startTime: '05:00 PM',
        endTime: '07:00 PM',
    },
    {
        name: 'Aishat Mohammed',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 4,
        startTime: '02:00 PM',
        endTime: '03:00 PM',
    },
    {
        name: 'Steve Daniella',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 5,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'John Phillip',
        property: 'Dominion DuplexC',
        type: 'Virtual',
        day: 5,
        startTime: '02:00 PM',
        endTime: '03:00 PM',
    },
    {
        name: 'Israel Daniel',
        property: 'Hilltop DiamondA',
        type: 'Physical',
        day: 6,
        startTime: '12:00 PM',
        endTime: '01:00 PM',
    },
    {
        name: 'Godwin Joseph',
        property: 'Hilltop GoldE',
        type: 'Hybrid',
        day: 6,
        startTime: '02:00 PM',
        endTime: '04:00 PM',
    },
    {
        name: 'Jacob Gabriel',
        property: 'Hilltop DiamondA',
        type: 'Hybrid',
        day: 4,
        startTime: '09:00 PM',
        endTime: '11:00 PM',
    },
];

const baseDate = new Date(2025, 10, 15); // Nov 15, 2025
function getWeekDays(offset: number): string[] {
    const daysArr: string[] = [];
    for (let i = 0; i < 6; i++) {
        const d = new Date(baseDate);
        d.setDate(baseDate.getDate() + offset * 7 + i);
        daysArr.push(`${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`);
    }
    return daysArr;
}

// Remove static days, use dynamic week days
const times = [
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
    '09:00 PM',
    '10:00 PM',
    '11:00 PM',
];

function getTimeIndex(time: string): number {
    return times.indexOf(time);
}
function getDuration(start: string, end: string): number {
    return getTimeIndex(end) - getTimeIndex(start) + 1;
}

const InspectionPage: React.FC = () => {
    const [tab, setTab] = useState<'calendar' | 'grid'>('calendar');
    const [weekOffset, setWeekOffset] = useState(0);
    const days = getWeekDays(weekOffset);
    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">Property Management</h1>
                        <nav className="mb-2 text-[13px] flex items-center gap-1 text-[#475467]">
                            <a href="/dashboard/home" className="hover:underline">
                                Home
                            </a>
                            <span>/</span>
                            <span className="text-[#0A66B2]">Manage My Property</span>
                        </nav>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF]">
                            + Add Inspection
                        </button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-4 gap-4 mb-6">
                    {statCards.map((card) => (
                        <div
                            key={card.label}
                            className={`rounded-xl border border-[#E8F4F8] p-4 flex items-center gap-3 ${card.color}`}
                        >
                            <span className="inline-flex h-10 w-10 rounded-full bg-gray-100 items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-[#0A66B2]"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                </svg>
                            </span>
                            <div>
                                <div className="text-[15px] font-semibold text-[#002E62]">
                                    {card.value.toString().padStart(2, '0')}
                                </div>
                                <div className="text-[13px] text-[#475467]">{card.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex items-center gap-6 mb-4">
                        <button
                            onClick={() => setTab('calendar')}
                            className={`text-[15px] font-medium pb-2 border-b-2 ${tab === 'calendar' ? 'border-[#0A66B2] text-[#0A66B2]' : 'border-transparent text-[#475467]'}`}
                        >
                            Calendar
                        </button>
                        <button
                            onClick={() => setTab('grid')}
                            className={`text-[15px] font-medium pb-2 border-b-2 ${tab === 'grid' ? 'border-[#0A66B2] text-[#0A66B2]' : 'border-transparent text-[#475467]'}`}
                        >
                            Grid
                        </button>
                        <div className="flex-1" />
                        <div className="relative max-w-xs">
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
                            <input
                                className="w-full rounded-md border border-[#E4E7EC] bg-white pl-9 pr-3 py-2 text-[14px] focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 outline-none"
                                placeholder="Search ..."
                            />
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <button
                                className="h-8 w-8 rounded bg-[#F1F4F7] text-[#475467] flex items-center justify-center"
                                title="Previous week"
                                aria-label="Previous week"
                                onClick={() => setWeekOffset(weekOffset - 1)}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button
                                className="h-8 w-8 rounded bg-[#0A2D50] text-white flex items-center justify-center"
                                title="Next week"
                                aria-label="Next week"
                                onClick={() => setWeekOffset(weekOffset + 1)}
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                            <button className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF] ml-2">
                                Week
                            </button>
                            <button className="px-3 py-2 rounded-md border border-[#CCE3FD] bg-white text-[#0A66B2] hover:bg-[#F4F8FF]">
                                Today
                            </button>
                        </div>
                    </div>

                    {tab === 'calendar' ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left text-[14px]">
                                <thead>
                                    <tr className="bg-[#F9FBFC] text-[#475467]">
                                        <th className="px-3 py-2 font-medium">Time</th>
                                        {days.map((day) => (
                                            <th key={day} className="px-3 py-2 font-medium">
                                                {day}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {times.map((time, rowIdx) => (
                                        <tr key={time}>
                                            <td className="px-3 py-2 font-medium text-[#475467]">{time}</td>
                                            {days.map((day, colIdx) => {
                                                // Find entry that starts at this time and day
                                                const entry = calendarData.find(
                                                    (e) => e.day === colIdx + 1 && e.startTime === time,
                                                );
                                                // Check if this cell is covered by a spanning entry
                                                const spanningEntry = calendarData.find((e) => {
                                                    const startIdx = getTimeIndex(e.startTime);
                                                    const endIdx = getTimeIndex(e.endTime);
                                                    return (
                                                        e.day === colIdx + 1 && rowIdx >= startIdx && rowIdx <= endIdx
                                                    );
                                                });
                                                // Only render the card at the start cell, empty for spanned cells
                                                if (entry) {
                                                    const duration = getDuration(entry.startTime, entry.endTime);
                                                    return (
                                                        <td
                                                            key={day}
                                                            className="px-3 py-2 align-top"
                                                            rowSpan={duration}
                                                        >
                                                            <div
                                                                className={`rounded-lg p-2 mb-1 ${entry.type === 'Hybrid' ? 'bg-[#FFF9E6]' : entry.type === 'Physical' ? 'bg-[#E9F7F1]' : 'bg-[#E6F1FB]'}`}
                                                                style={{ minHeight: `${duration * 48}px` }}
                                                            >
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    {avatar}
                                                                    <span className="font-semibold text-[#002E62] text-[13px]">
                                                                        {entry.name}
                                                                    </span>
                                                                </div>
                                                                <div className="text-[12px] text-[#475467]">
                                                                    {entry.property}
                                                                </div>
                                                                <div className="text-[12px] text-[#98A2B3]">
                                                                    {entry.type}
                                                                </div>
                                                            </div>
                                                        </td>
                                                    );
                                                } else if (spanningEntry && spanningEntry.startTime !== time) {
                                                    // Empty cell for spanned rows
                                                    return null;
                                                } else {
                                                    return <td key={day} className="px-3 py-2" />;
                                                }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-6">
                            {/* @ts-ignore */}
                            {gridData &&
                                gridData.map((item: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="rounded-xl border border-[#E8F4F8] bg-white p-5 flex gap-4 items-center"
                                    >
                                        {avatar}
                                        <div className="flex-1">
                                            <div className="font-semibold text-[#002E62] text-[15px] mb-1">
                                                {item.name}
                                            </div>
                                            <div className="text-[13px] text-[#475467] mb-1">{item.property}</div>
                                            <div className="text-[13px] text-[#475467] mb-1">
                                                Scheduled: {item.scheduled}
                                            </div>
                                            <div className="text-[13px] text-[#475467]">
                                                Inspection Type: {item.type}
                                            </div>
                                        </div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-[13px] font-medium ${statusColors ? statusColors[item.status] : ''}`}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InspectionPage;
