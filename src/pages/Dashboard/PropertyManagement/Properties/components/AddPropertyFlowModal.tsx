import Input from '@components/forms/Input';
import RadioGroup from '@components/forms/RadioGroup';
import Select from '@components/forms/Select';
import StepsSidebar from '@pages/Dashboard/PropertyListing/Home/components/ListPropertyFlow/components/StepsSidebar';
import CloseButton from '@pages/Dashboard/PropertyListing/Home/components/OnboardingAgent/components/CloseButton';
import React, { useState, useCallback, useEffect } from 'react';



interface StepDef {
    id: string;
    title: string;
    description?: string;
}

const steps: StepDef[] = [
    {
        id: 'property_details',
        title: 'Property Details',
        description: 'Lorem ipsum dolor sit amet consectetur. Vulputate nec dictum quam congue massa.',
    },
    {
        id: 'invite_user',
        title: 'Invite User',
        description:
            'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.',
    },
    {
        id: 'account_details',
        title: 'Property Account Details',
        description:
            'Lorem ipsum dolor sit amet consectetur. Tellus nunc odio enim ut sit rutrum morbi. Bibendum sed dictum egestas purus a porta sit.',
    },
];

const AddPropertyFlowModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleClose = useCallback(() => {
        onClose();
        setTimeout(() => setCurrentIdx(0), 250);
    }, [onClose]);

    useEffect(() => {
        if (!open) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const handler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') handleClose();
        };
        window.addEventListener('keydown', handler);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', handler);
        };
    }, [open, handleClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4">
            <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
            <div className="relative w-full max-w-225 min-h-[30vh] rounded-xl bg-white shadow-xl overflow-hidden animate-[fadeIn_.25s_ease] flex flex-col max-h-[90vh] md:max-h-none">
                <div className="w-full md:w-225 max-w-[96vw] rounded-xl overflow-hidden flex bg-white shadow-[0_4px_32px_-4px_rgba(15,23,42,0.12)] md:flex-row flex-col md:h-150">
                    <div className="hidden md:block w-[35%]">
                        <StepsSidebar steps={steps} currentIdx={currentIdx} listingType="Management" />
                    </div>
                    <div className="flex-1 flex flex-col md:max-h-none max-h-[80vh]">
                        <div className="h-17.5 md:flex hidden items-center justify-between pl-10 pr-6 border-b border-[#EDF1F5] bg-white/70 backdrop-blur-sm">
                            <h3 className="text-[20px] font-semibold text-[#001731]">{steps[currentIdx].title}</h3>
                            <CloseButton onClick={handleClose} />
                        </div>
                        <div className="md:hidden w-full px-6 pt-6 pb-2 flex items-center justify-between">
                            <h2 className="text-[22px] font-bold leading-tight text-[#0F172A]">
                                <span className="text-[#16A34A]">{steps[currentIdx].title}</span>
                            </h2>
                            <CloseButton onClick={handleClose} />
                        </div>
                        <div className="flex-1 overflow-y-auto md:px-10 px-6 md:pt-10 pt-2 md:pb-8 pb-2">
                            {currentIdx === 0 && <PropertyDetailsStep />}
                            {currentIdx === 1 && <InviteUserStep />}
                            {currentIdx === 2 && <AccountDetailsStep />}
                        </div>
                        <div className="border-t border-[#E2E8F0] bg-white px-6 py-4">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentIdx((idx) => Math.max(idx - 1, 0))}
                                        disabled={currentIdx === 0}
                                        className={`px-6 py-3 rounded-lg border text-[14px] font-semibold transition-colors focus:ring-2 focus:ring-[#002E62]/70 focus:border-transparent outline-none ${currentIdx === 0 ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed' : 'bg-white text-[#002E62] border-[#E0DEF7] hover:bg-[#F7F7FD] focus:bg-[#F7F7FD]'}`}
                                    >
                                        Previous
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentIdx((idx) => Math.min(idx + 1, steps.length - 1))}
                                        className="px-6 py-3 rounded-lg bg-[#002E62] text-white text-[14px] font-semibold transition-colors hover:bg-[#002E62]/90 focus:ring-2 focus:ring-[#002E62]/70 focus:ring-offset-2 outline-none"
                                    >
                                        {currentIdx === steps.length - 1 ? 'Submit' : 'Save & Continue'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Step 1: Property Details
const PropertyDetailsStep: React.FC = () => {
    const [role, setRole] = useState<'owner' | 'estate_manager'>('owner');
    const [category, setCategory] = useState('');
    return (
        <form className="space-y-6">
            <RadioGroup
                title="Tell us your role in this property?"
                name="role"
                value={role}
                onChange={setRole}
                options={[
                    { label: 'Owner', value: 'owner' },
                    { label: 'Estate Manager', value: 'estate_manager' },
                ]}
                className="mb-2"
            />
            <Input title="Property Name" placeholder="Hilltop Estate" name="propertyName" required />
            <Select
                title="Category Name"
                placeholder="Select a category name"
                options={[
                    { label: 'Apartment', value: 'apartment' },
                    { label: 'Duplex', value: 'duplex' },
                    { label: 'Bungalow', value: 'bungalow' },
                    { label: 'Terrace', value: 'terrace' },
                ]}
                value={category}
                onChange={setCategory}
                name="category"
                required
            />
            <Input title="Address" placeholder="12, Amino Kano Crescent, Wuse 2, Abuja" name="address" required />
        </form>
    );
};

// Step 2: Invite User
const InviteUserStep: React.FC = () => (
    <form className="space-y-6">
        <div className="bg-[#F6FAFF] border border-[#B6E0FE] rounded-lg p-4 mb-4">
            <span className="block text-[#0F62FE] font-semibold mb-1">Note:</span>
            <span className="text-sm text-[#64748B]">
                The tenant you added will receive a welcome email with a temporary password to log in.
            </span>
        </div>
        <Input
            title="Estate Manager Email"
            type="email"
            placeholder="Enter estate manager email"
            name="estateManagerEmail"
            required
        />
    </form>
);

// Step 3: Account Details
const AccountDetailsStep: React.FC = () => (
    <form className="space-y-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input title="Bank Name" placeholder="Enter bank name" name="bankName" required />
        <Input title="Account Name" placeholder="Enter account name" name="accountName" required />
        <div className="md:col-span-2">
            <Input title="Account Number" placeholder="Enter account number" name="accountNumber" required />
        </div>
    </form>
);

export default AddPropertyFlowModal;
