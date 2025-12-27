import React from 'react';

export interface AnnouncementCardProps {
    icon?: React.ReactNode;
    title: string;
    to: string;
    content: string;
    date: string;
    time: string;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ icon, title, to, content, date, time }) => (
    <div className="flex items-start gap-4 py-4 border-b border-[#F1F4F7] last:border-b-0">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">{icon}</div>
        <div className="flex-1">
            <div className="font-semibold text-[#0A2D50] text-[15px]">{title}</div>
            <div className="text-xs text-[#475467] mb-1">
                To: <span className="font-medium">{to}</span>
            </div>
            <div className="text-[13px] text-[#475467] mb-1">{content}</div>
        </div>
        <div className="text-right min-w-30 text-xs text-[#98A2B3]">
            <div>{date}</div>
            <div>{time}</div>
        </div>
    </div>
);

export default AnnouncementCard;
