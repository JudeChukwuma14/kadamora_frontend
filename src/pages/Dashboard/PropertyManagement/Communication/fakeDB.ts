// Fake DB for chat functionality
export interface ChatUser {
    id: string;
    name: string;
    avatar?: string;
    subtitle?: string;
    online?: boolean;
}

export interface ChatMessage {
    id: string;
    chatId: string;
    fromMe: boolean;
    text: string;
    time: string;
}

export interface ChatSummary {
    id: string;
    user: ChatUser;
    lastMessage: string;
    time: string;
    unreadCount: number;
    selected?: boolean;
}

// Users
export const users: ChatUser[] = [
    { id: '1', name: 'FlatA Members', subtitle: '', online: false },
    { id: '2', name: 'JordanSky', subtitle: '(Estate Manager)', avatar: '/avatars/jordan.png', online: true },
    { id: '3', name: 'LucasPine', avatar: '/avatars/lucas.png', online: false },
    { id: '4', name: 'EthanWave', avatar: '/avatars/ethan.png', online: false },
    { id: '5', name: 'Terrace C Members', subtitle: '', online: false },
    { id: '6', name: 'OliviaSun', avatar: '/avatars/olivia.png', online: false },
];

// Chat summaries
export const chatSummaries: ChatSummary[] = [
    {
        id: '1',
        user: users[0],
        lastMessage: '@emily.ridge: Hello Everyone',
        time: '10 m ago',
        unreadCount: 2,
    },
    {
        id: '2',
        user: users[1],
        lastMessage: 'Hello',
        time: '12 m ago',
        unreadCount: 0,
        selected: true,
    },
    {
        id: '3',
        user: users[2],
        lastMessage: 'Thanks',
        time: '18 Aug, 2025',
        unreadCount: 0,
    },
    {
        id: '4',
        user: users[3],
        lastMessage: 'I will get back to you',
        time: '18 July, 2025',
        unreadCount: 0,
    },
    {
        id: '5',
        user: users[4],
        lastMessage: 'sophie.tide:Alright',
        time: '13 Aug, 2025',
        unreadCount: 0,
    },
    {
        id: '6',
        user: users[5],
        lastMessage: 'Hello',
        time: '18 July, 2025',
        unreadCount: 0,
    },
];

// Messages per chat
export const chatMessages: Record<string, ChatMessage[]> = {
    '2': [
        {
            id: 'm1',
            chatId: '2',
            fromMe: false,
            text: 'Lorem ipsum dolor sit amet consectetur. Dignissim nibh tellus egestas a. Leo id sit mattis eu egestas nullam.',
            time: '13:00',
        },
        {
            id: 'm2',
            chatId: '2',
            fromMe: false,
            text: 'Lorem ipsum dolor sit amet consectetur. Ante gravida cursus convallis turpis nibh at tincidunt tortor. Varius lacus sit pellentesque gravida libero at eleifend. Diam molestie a eu malesuada laoreet lectus.',
            time: '13:00',
        },
        {
            id: 'm3',
            chatId: '2',
            fromMe: true,
            text: 'Lorem ipsum dolor sit amet consectetur. Donec risus eu bibendum cras quis amet consectetur',
            time: '13:02',
        },
    ],
    // Add more chatId: messages[] as needed
};

export function getChats() {
    return chatSummaries;
}

export function getMessages(chatId: string) {
    return chatMessages[chatId] || [];
}

export function sendMessage(chatId: string, text: string) {
    const msg: ChatMessage = {
        id: 'm' + Math.random().toString(36).slice(2),
        chatId,
        fromMe: true,
        text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    if (!chatMessages[chatId]) chatMessages[chatId] = [];
    chatMessages[chatId].push(msg);
    // Update last message in summary
    const chat = chatSummaries.find((c) => c.id === chatId);
    if (chat) {
        chat.lastMessage = text;
        chat.time = msg.time;
        chat.unreadCount = 0;
    }
    return msg;
}
