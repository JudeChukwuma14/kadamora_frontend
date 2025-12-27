import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import React, { useState } from 'react';



interface AddTenantModalProps {
    open: boolean;
    onClose: () => void;
}

const typeOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Co-tenant', value: 'co-tenant' },
    { label: 'Guarantor', value: 'guarantor' },
];

const AddTenantModal: React.FC<AddTenantModalProps> = ({ open, onClose }) => {
    const [type, setType] = useState('');
    const [rentDueDate, setRentDueDate] = useState('');

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 animate-[fadeIn_.25s_ease] relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-full border border-[#E2E8F0] text-[#64748B] hover:bg-[#F1F5F9] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#94A3B8]"
                    aria-label="Close"
                >
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
                <h2 className="text-lg font-semibold mb-6">Invite Tenant</h2>
                <div className="bg-[#F6FAFF] border border-[#B6E0FE] rounded-lg p-4 mb-6">
                    <span className="block text-[#0F62FE] font-semibold mb-1">Note:</span>
                    <span className="text-sm text-[#64748B]">
                        The tenant you added will receive a welcome email with a temporary password to log in.
                    </span>
                </div>
                <form className="space-y-4">
                    <Input
                        title="Tenant Email"
                        name="tenantEmail"
                        placeholder="Enter tenant email"
                        type="email"
                        required
                    />
                    <Input title="Unit" name="unit" placeholder="Enter unit" required />
                    <div className="flex gap-4">
                        <Input
                            title="Rent Price"
                            name="rentPrice"
                            placeholder="Enter amount"
                            type="number"
                            required
                            className="flex-1"
                        />
                        <Input
                            title="Rent Due Date"
                            name="rentDueDate"
                            placeholder="Select Date"
                            type="date"
                            required
                            className="flex-1"
                            value={rentDueDate}
                            onChange={(e) => setRentDueDate(e.target.value)}
                        />
                    </div>
                    <Select
                        title="Type"
                        name="type"
                        placeholder="Select type"
                        options={typeOptions}
                        value={type}
                        onChange={setType}
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full py-3 rounded-lg bg-[#002E62] text-white font-semibold text-[15px] hover:bg-[#002E62]/90 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTenantModal;
