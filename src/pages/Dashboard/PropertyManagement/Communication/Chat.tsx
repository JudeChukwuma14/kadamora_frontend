import React, { useState } from 'react';
import MessageCard from './MessageCard';

import './styles/chat.css';
import { getChats, getMessages, sendMessage } from './fakeDB';
import type { ChatSummary } from './fakeDB';
import Input from '@components/forms/Input';

const Chat: React.FC = () => {
    const [chats] = useState<ChatSummary[]>(getChats());
    const [activeChatId, setActiveChatId] = useState<string>(chats.find((c) => c.selected)?.id || chats[0].id);
    const [messages, setMessages] = useState(getMessages(activeChatId));
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');

    // Responsive: show/hide chat list on mobile
    const [showList, setShowList] = useState(false);

    React.useEffect(() => {
        setMessages(getMessages(activeChatId));
    }, [activeChatId]);

    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!message.trim()) return;
        const msg = sendMessage(activeChatId, message);
        setMessages([...messages, msg]);
        setMessage('');
    };

    const filteredChats = chats.filter(
        (c) =>
            c.user.name.toLowerCase().includes(search.toLowerCase()) ||
            (c.user.subtitle && c.user.subtitle.toLowerCase().includes(search.toLowerCase())),
    );

    // Responsive layout
    return (
        <div className="flex h-[80vh] bg-white rounded-2xl shadow-lg overflow-hidden flex-col md:flex-row">
            {/* Sidebar Chat List (left) */}
            <aside
                className={`md:w-85 min-w-65 max-w-90 border-r border-[#EDF1F5] flex flex-col bg-white z-20 md:static fixed top-0 left-0 h-full md:h-auto transition-transform duration-200 ${showList ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
            >
                <div className="flex items-center gap-8 px-6 pt-6 pb-2">
                    <button className="text-[17px] font-semibold text-[#002E62] border-b-2 border-[#002E62] pb-2">
                        Messages
                    </button>
                    <button className="text-[17px] font-semibold text-[#98A2B3] pb-2">Announcements</button>
                </div>
                <div className="px-6 pt-2 pb-3">
                    <h3 className="text-[17px] font-semibold text-[#002E62] mb-2">Chat</h3>
                    <div className="flex items-center gap-2">
                        <Input
                            placeholder="Search"
                            className="py-2! text-[15px]!"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            title="Filter"
                            className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E0DEF7] bg-white text-[#64748B]"
                        >
                            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                                <path
                                    d="M3.75 4.5A2.25 2.25 0 016 2.25h6A2.25 2.25 0 0114.25 4.5v9A2.25 2.25 0 0112 15.75H6A2.25 2.25 0 013.75 13.5v-9z"
                                    stroke="#64748B"
                                    strokeWidth="1.5"
                                />
                                <path d="M6 7.5h6M6 10.5h3" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto px-2 pb-4">
                    {filteredChats.map((chat) => (
                        <MessageCard
                            key={chat.id}
                            name={chat.user.name}
                            subtitle={chat.user.subtitle}
                            lastMessage={chat.lastMessage}
                            time={chat.time}
                            unreadCount={chat.unreadCount}
                            avatar={chat.user.avatar}
                            online={chat.user.online}
                            selected={chat.id === activeChatId}
                            onClick={() => {
                                setActiveChatId(chat.id);
                                setShowList(false);
                            }}
                        />
                    ))}
                </div>
            </aside>
            {/* Chat Box (right) */}
            <section className="flex-1 flex flex-col bg-[#FAFAFA] relative min-w-0">
                {/* Mobile: show chat list toggle */}
                <div className="md:hidden flex items-center gap-2 px-4 py-2 border-b border-[#EDF1F5] bg-white">
                    <button
                        title="Open chat list"
                        onClick={() => setShowList(true)}
                        className="h-9 w-9 flex items-center justify-center rounded-lg border border-[#E0DEF7] bg-white text-[#64748B]"
                    >
                        <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                            <path
                                d="M4 6h12M4 10h12M4 14h12"
                                stroke="#64748B"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                    <span className="font-semibold text-[#0A2D50] text-[16px]">Chat</span>
                </div>
                {/* Chat header */}
                <div className="hidden md:flex items-center gap-4 px-8 py-6 border-b border-[#EDF1F5]">
                    {(() => {
                        const chat = chats.find((c) => c.id === activeChatId);
                        if (!chat) return null;
                        return (
                            <>
                                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-[#0A2D50] overflow-hidden">
                                    {chat.user.avatar ? (
                                        <img
                                            src={chat.user.avatar}
                                            alt="avatar"
                                            className="h-full w-full object-cover rounded-full"
                                        />
                                    ) : (
                                        chat.user.name.charAt(0)
                                    )}
                                </div>
                                <div>
                                    <div className="font-semibold text-[#0A2D50] text-[16px]">
                                        {chat.user.name}{' '}
                                        {chat.user.subtitle && (
                                            <span className="text-xs text-[#64748B] font-medium">
                                                {chat.user.subtitle}
                                            </span>
                                        )}
                                    </div>
                                    {/* Optionally add group/role info here */}
                                </div>
                            </>
                        );
                    })()}
                </div>
                {/* Chat messages */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 flex flex-col gap-4 chat-bg">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[90%] md:max-w-[60%] rounded-2xl px-5 py-3 text-[15px] ${msg.fromMe ? 'ml-auto bg-[#E6F0FA] text-[#002E62]' : 'bg-white text-[#475467]'}`}
                            title="Add"
                        >
                            {msg.text}
                            <div className="text-xs text-[#98A2B3] mt-2 text-right">{msg.time}</div>
                        </div>
                    ))}
                </div>
                {/* Message input - new design */}
                <form
                    className="flex flex-col gap-0 px-0 md:px-0 pt-0 pb-0 border-t border-[#EDF1F5] bg-white"
                    onSubmit={handleSend}
                    style={{ boxShadow: '0px -1px 0px #EDF1F5' }}
                >
                    <textarea
                        className="w-full resize-none border-none outline-none bg-transparent px-4 md:px-8 pt-4 text-[15px] text-[#101828] placeholder-[#98A2B3] min-h-12 max-h-30 focus:ring-0"
                        placeholder="Write a message ..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={2}
                    />
                    <div className="flex items-center justify-between px-4 md:px-8 py-3 bg-white border-t border-[#F2F4F7]">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                title="Add"
                                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7]"
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect
                                        x="3"
                                        y="3"
                                        width="14"
                                        height="14"
                                        rx="3"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M10 7v6M7 10h6" stroke="#98A2B3" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </button>
                            <button
                                type="button"
                                title="Video"
                                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7]"
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect
                                        x="3"
                                        y="5"
                                        width="10"
                                        height="10"
                                        rx="2"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M13 8l4-2v8l-4-2"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                title="Mic"
                                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7]"
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect x="7" y="4" width="6" height="10" rx="3" stroke="#98A2B3" strokeWidth="1.5" />
                                    <path
                                        d="M10 16v2M7 18h6"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <button
                                type="button"
                                title="Document"
                                className="h-9 w-9 flex items-center justify-center rounded-lg hover:bg-[#F2F4F7]"
                            >
                                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                    <rect
                                        x="5"
                                        y="3"
                                        width="10"
                                        height="14"
                                        rx="2"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                    />
                                    <path
                                        d="M8 7h4M8 10h4M8 13h2"
                                        stroke="#98A2B3"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                        </div>
                        <button
                            type="submit"
                            aria-label="Send"
                            className="h-10 px-6 rounded-lg bg-[#002E62] text-white font-semibold flex items-center gap-2 hover:bg-[#002E62]/90 transition-colors"
                        >
                            Send
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                                <path
                                    d="M3.75 10h8.75m0 0l-3.5-3.5m3.5 3.5l-3.5 3.5"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Chat;
