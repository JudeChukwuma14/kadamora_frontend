import React, { useState } from 'react';

const notificationSettings = [
    {
        title: 'Rent Collection Setting',
        icon: (
            <span className="inline-flex h-8 w-8 rounded-full bg-[#E6F9F0] items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="3" width="14" height="14" rx="3" fill="#16C784" />
                    <path d="M7 10h6M10 7v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </span>
        ),
        items: [
            {
                label: 'Auto Payment Reminder',
                description:
                    'Enable this option to automatically send scheduled payment reminders to tenants in advance of their rent due date. This feature helps ensure that tenants receive clear and timely notifications, giving them enough time to prepare and make their payments.',
            },
        ],
    },
    {
        title: 'Email Notification',
        icon: (
            <span className="inline-flex h-8 w-8 rounded-full bg-[#E6F1FB] items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="5" width="14" height="10" rx="2" fill="#0A66B2" />
                    <path d="M3 5l7 5 7-5" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </span>
        ),
        items: [
            {
                label: 'New Maintenance Requests',
                description:
                    'Turn on this setting to receive real-time notifications whenever tenants submit new maintenance requests. This ensures you’re immediately informed of any reported issues.',
            },
            {
                label: 'Payment Notifications',
                description:
                    'Enable this setting to receive real-time notifications for all types of payments made by tenants, including rent, utilities, fees, or other charges.',
            },
            {
                label: 'Rent Expiry Alerts',
                description:
                    'Enable this option to receive instant notifications whenever a rent payment is made by a tenant. This allows you to stay updated on payment activity in real time, track incoming payments with ease, and maintain accurate financial records for each property.',
            },
            {
                label: 'Inspection Reminders',
                description:
                    'Enable this option to receive timely reminders for upcoming scheduled property inspections, ensuring that you are prepared in advance and can coordinate with tenants or maintenance staff as needed for smooth and efficient inspection processes.',
            },
        ],
    },
    {
        title: 'SMS Notification',
        icon: (
            <span className="inline-flex h-8 w-8 rounded-full bg-[#E6F6FB] items-center justify-center">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <rect x="3" y="3" width="14" height="14" rx="3" fill="#0AB6D7" />
                    <path d="M7 10h6M10 7v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            </span>
        ),
        items: [
            {
                label: 'Emergency Maintenance',
                description:
                    'Enable this option to receive SMS alerts for urgent issues. Nibh odio egestas tortor lorem laoreet eu volutpat. Adipiscing odio erat ac ridiculus imperdiet.',
            },
        ],
    },
];

const bankAccount = {
    bankName: 'Wema Bank',
    accountNumber: '0151198210',
    accountName: 'Hilltop Property',
};

const SettingsPage: React.FC = () => {
    const [toggles, setToggles] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (label: string) => {
        setToggles((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    return (
        <div className="min-h-screen pb-10 bg-[#F8FCFA]">
            <div className="max-w-300 mx-auto pt-8">
                <div className="flex flex-wrap gap-6 mt-6">
                    <div className="flex-1 min-w-87.5 flex flex-col gap-6">
                        {notificationSettings.map((section) =>
                            section.title === 'Rent Collection Setting' ? (
                                <div key={section.title} className="rounded-2xl border border-[#D6E6F2] bg-white p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="inline-flex h-9 w-9 rounded-full bg-[#E6F9F0] items-center justify-center">
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="12" fill="#E6F9F0" />
                                                <path
                                                    d="M8 12V9.5A2.5 2.5 0 0110.5 7h3A2.5 2.5 0 0116 9.5V12"
                                                    stroke="#16C784"
                                                    strokeWidth="1.5"
                                                />
                                                <rect
                                                    x="8"
                                                    y="12"
                                                    width="8"
                                                    height="5"
                                                    rx="1.5"
                                                    stroke="#16C784"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                        </span>
                                        <span className="font-semibold text-[#002E62] text-[22px]">
                                            Rent Collection Setting
                                        </span>
                                    </div>
                                    <div className="space-y-7">
                                        {section.items.map((item) => (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-bold text-[#002E62] text-[20px]">
                                                        {item.label}
                                                    </div>
                                                    <button
                                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${toggles[item.label] ? 'bg-[#0A66B2]' : 'bg-[#E4E7EC]'}`}
                                                        onClick={() => handleToggle(item.label)}
                                                        aria-pressed={toggles[item.label]}
                                                        aria-label={`Toggle ${item.label}`}
                                                    >
                                                        <span
                                                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${toggles[item.label] ? 'translate-x-5' : ''}`}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="text-[16px] text-[#475467] max-w-3xl mb-2">
                                                    {item.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : section.title === 'Email Notification' ? (
                                <div key={section.title} className="rounded-2xl border border-[#D6E6F2] bg-white p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="inline-flex h-9 w-9 rounded-full bg-[#E6F9F0] items-center justify-center">
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="12" fill="#E6F9F0" />
                                                <path
                                                    d="M7 10V8.5C7 7.12 8.12 6 9.5 6h5C15.88 6 17 7.12 17 8.5V10"
                                                    stroke="#16C784"
                                                    strokeWidth="1.5"
                                                />
                                                <rect
                                                    x="7"
                                                    y="10"
                                                    width="10"
                                                    height="6"
                                                    rx="1.5"
                                                    stroke="#16C784"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M9.5 13h5"
                                                    stroke="#16C784"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="font-semibold text-[#002E62] text-[22px]">
                                            Email Notification
                                        </span>
                                    </div>
                                    <div className="space-y-7">
                                        {section.items.map((item, idx) => (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-bold text-[#002E62] text-[20px]">
                                                        {item.label}
                                                    </div>
                                                    <button
                                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${toggles[item.label] ? 'bg-[#0A66B2]' : 'bg-[#E4E7EC]'}`}
                                                        onClick={() => handleToggle(item.label)}
                                                        aria-pressed={toggles[item.label]}
                                                        aria-label={`Toggle ${item.label}`}
                                                    >
                                                        <span
                                                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${toggles[item.label] ? 'translate-x-5' : ''}`}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="text-[16px] text-[#475467] max-w-3xl mb-2">
                                                    {item.description}
                                                </div>
                                                {idx !== section.items.length - 1 && (
                                                    <hr className="border-[#E4E7EC] my-5" />
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : section.title === 'SMS Notification' ? (
                                <div key={section.title} className="rounded-2xl border border-[#D6E6F2] bg-white p-8">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="inline-flex h-9 w-9 rounded-full bg-[#E6F9F0] items-center justify-center">
                                            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                <circle cx="12" cy="12" r="12" fill="#E6F9F0" />
                                                <rect
                                                    x="7"
                                                    y="10"
                                                    width="10"
                                                    height="6"
                                                    rx="1.5"
                                                    stroke="#0AB6D7"
                                                    strokeWidth="1.5"
                                                />
                                                <path
                                                    d="M9.5 13h5"
                                                    stroke="#0AB6D7"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="font-semibold text-[#002E62] text-[22px]">
                                            SMS Notification
                                        </span>
                                    </div>
                                    <div className="space-y-7">
                                        {section.items.map((item) => (
                                            <div key={item.label}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-bold text-[#002E62] text-[20px]">
                                                        {item.label}
                                                    </div>
                                                    <button
                                                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${toggles[item.label] ? 'bg-[#0A66B2]' : 'bg-[#E4E7EC]'}`}
                                                        onClick={() => handleToggle(item.label)}
                                                        aria-pressed={toggles[item.label]}
                                                        aria-label={`Toggle ${item.label}`}
                                                    >
                                                        <span
                                                            className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${toggles[item.label] ? 'translate-x-5' : ''}`}
                                                        />
                                                    </button>
                                                </div>
                                                <div className="text-[16px] text-[#475467] max-w-3xl mb-2">
                                                    {item.description}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div key={section.title} className="rounded-xl border border-[#E8F4F8] bg-white p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        {section.icon}
                                        <span className="font-semibold text-[#0A66B2] text-[16px]">
                                            {section.title}
                                        </span>
                                    </div>
                                    {section.items.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between py-3 border-b border-[#F1F4F7] last:border-b-0"
                                        >
                                            <div>
                                                <div className="font-medium text-[#002E62] text-[15px]">
                                                    {item.label}
                                                </div>
                                                <div className="text-[13px] text-[#475467] max-w-xl mt-1">
                                                    {item.description}
                                                </div>
                                            </div>
                                            <button
                                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${toggles[item.label] ? 'bg-[#0A66B2]' : 'bg-[#E4E7EC]'}`}
                                                onClick={() => handleToggle(item.label)}
                                                aria-pressed={toggles[item.label]}
                                                aria-label={`Toggle ${item.label}`}
                                            >
                                                <span
                                                    className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${toggles[item.label] ? 'translate-x-5' : ''}`}
                                                />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ),
                        )}
                    </div>
                    <div className="w-full md:w-105 min-w-[320px]">
                        <div className="rounded-2xl border border-[#D6E6F2] bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 rounded-full bg-[#E6F9F0] items-center justify-center">
                                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="12" fill="#E6F9F0" />
                                            <path
                                                d="M7 10V8.5C7 7.12 8.12 6 9.5 6h5C15.88 6 17 7.12 17 8.5V10"
                                                stroke="#16C784"
                                                strokeWidth="1.5"
                                            />
                                            <rect
                                                x="7"
                                                y="10"
                                                width="10"
                                                height="6"
                                                rx="1.5"
                                                stroke="#16C784"
                                                strokeWidth="1.5"
                                            />
                                            <path
                                                d="M9.5 13h5"
                                                stroke="#16C784"
                                                strokeWidth="1.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </span>
                                    <span className="font-semibold text-[#002E62] text-[20px]">Bank Account</span>
                                </div>
                                <button className="px-4 py-2 rounded-md border border-[#002E62] bg-white text-[#002E62] font-medium hover:bg-[#F4F8FF] transition-colors text-[15px] shadow-sm">
                                    Update Bank Details
                                </button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="font-semibold text-[#002E62] text-[16px] mb-1">Bank Name</div>
                                    <div className="text-[#475467] text-[15px]">{bankAccount.bankName}</div>
                                </div>
                                <hr className="border-[#E4E7EC]" />
                                <div>
                                    <div className="font-semibold text-[#002E62] text-[16px] mb-1">Account Number</div>
                                    <div className="text-[#475467] text-[15px]">{bankAccount.accountNumber}</div>
                                </div>
                                <hr className="border-[#E4E7EC]" />
                                <div>
                                    <div className="font-semibold text-[#002E62] text-[16px] mb-1">Account Name</div>
                                    <div className="text-[#475467] text-[15px]">{bankAccount.accountName}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
