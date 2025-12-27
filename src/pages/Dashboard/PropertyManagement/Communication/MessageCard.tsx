export interface MessageCardProps {
    avatar?: string;
    name: string;
    subtitle?: string; // e.g. group name or role
    lastMessage: string;
    time: string; // e.g. '10 m ago', '18 Aug, 2025'
    unreadCount?: number;
    selected?: boolean;
    online?: boolean;
    onClick?: () => void;
}

const MessageCard: React.FC<MessageCardProps> = ({
    avatar,
    name,
    subtitle,
    lastMessage,
    time,
    unreadCount = 0,
    selected = false,
    online = false,
    onClick,
}) => (
    <div
        className={`flex items-center gap-3 px-4 py-3 cursor-pointer rounded-xl transition-colors ${selected ? 'bg-[#F6FAFF]' : 'hover:bg-[#F6F6FB]'}`}
        onClick={onClick}
    >
        <div className="relative h-12 w-12 shrink-0">
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-[#0A2D50] overflow-hidden">
                {avatar ? (
                    <img src={avatar} alt="avatar" className="h-full w-full object-cover rounded-full" />
                ) : (
                    name.charAt(0)
                )}
            </div>
            {online && (
                <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-[#16C784] border-2 border-white"></span>
            )}
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-[#0A2D50] text-[15px] truncate max-w-30">{name}</span>
                {subtitle && (
                    <span className="text-xs text-[#64748B] font-medium truncate max-w-20">{subtitle}</span>
                )}
            </div>
            <div className="text-xs text-[#64748B] truncate max-w-45">{lastMessage}</div>
        </div>
        <div className="flex flex-col items-end min-w-14 ml-2">
            <span className="text-xs text-[#98A2B3] mb-1">{time}</span>
            {unreadCount > 0 && (
                <span className="inline-flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-[#0A66B2] text-white text-xs font-semibold">
                    {unreadCount}
                </span>
            )}
        </div>
    </div>
);

export default MessageCard;
