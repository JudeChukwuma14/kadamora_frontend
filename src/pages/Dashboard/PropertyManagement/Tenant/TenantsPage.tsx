import React, { useState, useRef, useEffect } from 'react';
import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import DeleteConfirmationModal from '@components/cards/card/DeleteConfirmationModal';
import CardMenuItem from '@components/cards/card/CardMenuItem';
import Table, { type TableHeader } from '@components/ui/Table/Table';

const mockTenants = [
    {
        sn: '01',
        name: 'David Johnson',
        email: 'davidjohnson@gmail.com',
        phone: '07034576533',
        property: 'Hilltop Estate',
        unit: 'Diamond A',
        status: 'Paid',
    },
    {
        sn: '02',
        name: 'Ayobami Oluvaseun',
        email: 'davidjohnson@gmail.com',
        phone: '07034576533',
        property: 'Hilltop Estate',
        unit: 'Diamond B',
        status: 'Due',
    },
    {
        sn: '03',
        name: 'Kelvin ThankGod',
        email: 'kelvinthangod@gmail.com',
        phone: '07034576533',
        property: 'Hilltop Estate',
        unit: 'Diamond C',
        status: 'Paid',
    },
    {
        sn: '04',
        name: 'Phillip Abel',
        email: 'phillipabel@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold A',
        status: 'Due',
    },
    {
        sn: '05',
        name: 'Michael Chamberlain',
        email: 'michaelchamberlain@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold D',
        status: 'Paid',
    },
    {
        sn: '06',
        name: 'Phillip Abel',
        email: 'phillipabel@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold A',
        status: 'Due',
    },
    {
        sn: '07',
        name: 'Michael Chamberlain',
        email: 'michaelchamberlain@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold D',
        status: 'Paid',
    },
    {
        sn: '08',
        name: 'Phillip Abel',
        email: 'phillipabel@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold A',
        status: 'Paid',
    },
    {
        sn: '09',
        name: 'Michael Chamberlain',
        email: 'michaelchamberlain@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold D',
        status: 'Paid',
    },
    {
        sn: '10',
        name: 'Phillip Abel',
        email: 'phillipabel@gmail.com',
        phone: '07034576533',
        property: 'Dominion Estate',
        unit: 'Gold A',
        status: 'Paid',
    },
];

const TenantsPage: React.FC = () => {
    // State for filters
    const [property, setProperty] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    // tenants + per-row menu state
    const [tenants, setTenants] = useState(mockTenants);
    const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    // delete modal state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);

    // close menu on outside click / Escape
    useEffect(() => {
        if (!openMenuFor) return;

        const handleOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuFor(null);
            }
        };

        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpenMenuFor(null);
        };

        window.addEventListener('mousedown', handleOutside);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('mousedown', handleOutside);
            window.removeEventListener('keydown', handleKey);
        };
    }, [openMenuFor]);

    const handleConfirmDelete = () => {
        if (!deleteCandidate) return;
        setTenants((prev) => prev.filter((p) => p.sn !== deleteCandidate));
        setShowDeleteConfirm(false);
        setDeleteCandidate(null);
    };

    // Filter tenants
    const filteredTenants = tenants.filter((t) => {
        const matchesProperty = property ? t.property === property : true;
        const matchesStatus = status ? t.status === status : true;
        const matchesSearch = search
            ? t.name.toLowerCase().includes(search.toLowerCase()) ||
              t.email.toLowerCase().includes(search.toLowerCase()) ||
              t.phone.includes(search)
            : true;
        return matchesProperty && matchesStatus && matchesSearch;
    });

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-6 rounded-2xl border border-[#E8F4F8] bg-white p-8 shadow-sm">
                    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
                        <Select
                            title="Property"
                            options={[
                                { label: 'All Properties', value: '' },
                                ...Array.from(new Set(tenants.map((t) => t.property))).map((p) => ({
                                    label: p,
                                    value: p,
                                })),
                            ]}
                            value={property}
                            onChange={setProperty}
                            containerClassName="min-w-[160px]"
                        />
                        <Select
                            title="Status"
                            options={[
                                { label: 'All Status', value: '' },
                                { label: 'Paid', value: 'Paid' },
                                { label: 'Due', value: 'Due' },
                            ]}
                            value={status}
                            onChange={setStatus}
                            containerClassName="min-w-[120px]"
                        />
                        <div className="relative flex-1 max-w-xs mt-5.5">
                            <svg
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#98A2B3]"
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
                                className="pl-12 pr-4 py-2 text-[16px]"
                                containerClassName="w-full"
                                placeholder="Search ..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <DeleteConfirmationModal
                        isOpen={showDeleteConfirm}
                        title="Delete Tenant"
                        message={
                            tenants.find((x) => x.sn === deleteCandidate)
                                ? `Are you sure you want to delete ${tenants.find((x) => x.sn === deleteCandidate)?.name}? This action cannot be undone.`
                                : undefined
                        }
                        onConfirm={handleConfirmDelete}
                        onClose={() => {
                            setShowDeleteConfirm(false);
                            setDeleteCandidate(null);
                        }}
                    />
                    <Table
                        className="text-[16px]"
                        responsive="stack"
                        renderCard={(t: any) => (
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-[#F4F7FB] flex items-center justify-center text-[#0A2D50] font-semibold">
                                            {t.name
                                                .split(' ')
                                                .map((s: string) => s[0])
                                                .slice(0, 2)
                                                .join('')}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#0A2D50] text-[15px]">{t.name}</div>
                                            <div className="text-[13px] text-[#64748B]">
                                                {t.email} • {t.phone}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="relative inline-block" ref={openMenuFor === t.sn ? menuRef : null}>
                                        <button
                                            aria-haspopup="menu"
                                            aria-expanded={openMenuFor === t.sn}
                                            aria-controls={`tenant-menu-${t.sn}`}
                                            onClick={() => setOpenMenuFor((s) => (s === t.sn ? null : t.sn))}
                                            className="inline-flex items-center justify-center text-[#6B7280] p-2 rounded-full"
                                            title="Tenant actions"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                aria-hidden
                                            >
                                                <circle cx="12" cy="12" r="1.5" />
                                                <circle cx="19" cy="12" r="1.5" />
                                                <circle cx="5" cy="12" r="1.5" />
                                            </svg>
                                        </button>

                                        {openMenuFor === t.sn && (
                                            <div
                                                id={`tenant-menu-${t.sn}`}
                                                role="menu"
                                                aria-orientation="vertical"
                                                className="absolute right-0 mt-2 w-55 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-50 overflow-hidden"
                                            >
                                                <CardMenuItem
                                                    label="Edit Tenant"
                                                    iconSrc="/assets/icons/pen-line.svg"
                                                    iconAlt="Edit Tenant"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Edit tenant', t.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <CardMenuItem
                                                    label="Add Tenant"
                                                    iconSrc="/assets/icons/plus.svg"
                                                    iconAlt="Add Tenant"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Add tenant for', t.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <div className="h-px bg-[#EEF4FB] my-1" />

                                                <CardMenuItem
                                                    label="Delete Tenant"
                                                    iconSrc="/assets/icons/trash-2.svg"
                                                    iconAlt="Delete"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        setDeleteCandidate(t.sn);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    className="text-[#D02929] hover:bg-[#FFF5F5]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-3 text-[13px] text-[#374151]">
                                    <div>
                                        <div className="font-medium">Property</div>
                                        <div className="text-[#64748B]">
                                            {t.property} • {t.unit}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">Status</div>
                                        <div
                                            className={`mt-1 inline-block px-3 py-1 rounded-full text-[14px] font-semibold ${t.status === 'Paid' ? 'bg-[#E6F6F3] text-[#256D51]' : 'bg-[#FFF0F0] text-[#D02929]'}`}
                                        >
                                            {t.status}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        headers={
                            [
                                {
                                    key: 'select',
                                    label: (
                                        <>
                                            <label className="sr-only" htmlFor="tenant-select-all">
                                                Select all tenants
                                            </label>
                                            <input type="checkbox" id="tenant-select-all" title="Select all tenants" />
                                        </>
                                    ),
                                },
                                { key: 'sn', label: 'S/N' },
                                { key: 'name', label: 'FULL NAME' },
                                { key: 'email', label: 'EMAIL' },
                                { key: 'phone', label: 'PHONE NUMBER' },
                                { key: 'property', label: 'PROPERTY NAME' },
                                { key: 'unit', label: 'UNIT NAME' },
                                { key: 'status', label: 'RENT STATUS' },
                                { key: 'action', label: 'ACTION' },
                            ] as TableHeader[]
                        }
                        items={filteredTenants}
                        renderRow={(t: any, idx: number) => (
                            <tr
                                key={t.sn}
                                className={idx % 2 === 0 ? 'bg-white text-[#3F3F46]' : 'bg-[#F3F5F5] text-[#3F3F46]'}
                            >
                                <td className="px-4 py-3">
                                    <label className="sr-only" htmlFor={`tenant-row-select-${t.sn}`}>
                                        Select tenant row
                                    </label>
                                    <input type="checkbox" id={`tenant-row-select-${t.sn}`} title="Select tenant row" />
                                </td>
                                <td className="px-4 py-3">{t.sn}</td>
                                <td className="px-4 py-3">{t.name}</td>
                                <td className="px-4 py-3">{t.email}</td>
                                <td className="px-4 py-3">{t.phone}</td>
                                <td className="px-4 py-3">{t.property}</td>
                                <td className="px-4 py-3">{t.unit}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`px-4 py-1 rounded-full text-[15px] font-semibold ${t.status === 'Paid' ? 'bg-[#E6F6F3] text-[#256D51]' : 'bg-[#FFF0F0] text-[#D02929]'}`}
                                    >
                                        {t.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <div className="relative inline-block" ref={openMenuFor === t.sn ? menuRef : null}>
                                        <button
                                            aria-haspopup="menu"
                                            aria-expanded={openMenuFor === t.sn}
                                            aria-controls={`tenant-menu-${t.sn}`}
                                            onClick={() => setOpenMenuFor((s) => (s === t.sn ? null : t.sn))}
                                            className="inline-flex items-center justify-center text-[#6B7280]"
                                            title="Tenant actions"
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                aria-hidden
                                            >
                                                <circle cx="12" cy="12" r="1.5" />
                                                <circle cx="19" cy="12" r="1.5" />
                                                <circle cx="5" cy="12" r="1.5" />
                                            </svg>
                                        </button>

                                        {openMenuFor === t.sn && (
                                            <div
                                                id={`tenant-menu-${t.sn}`}
                                                role="menu"
                                                aria-orientation="vertical"
                                                className="absolute right-0 mt-2 w-55 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-50 overflow-hidden"
                                            >
                                                <CardMenuItem
                                                    label="Edit Tenant"
                                                    iconSrc="/assets/icons/pen-line.svg"
                                                    iconAlt="Edit Tenant"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Edit tenant', t.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <CardMenuItem
                                                    label="Add Tenant"
                                                    iconSrc="/assets/icons/plus.svg"
                                                    iconAlt="Add Tenant"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Add tenant for', t.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <div className="h-px bg-[#EEF4FB] my-1" />

                                                <CardMenuItem
                                                    label="Delete Tenant"
                                                    iconSrc="/assets/icons/trash-2.svg"
                                                    iconAlt="Delete"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        setDeleteCandidate(t.sn);
                                                        setShowDeleteConfirm(true);
                                                    }}
                                                    className="text-[#D02929] hover:bg-[#FFF5F5]"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                        start={filteredTenants.length ? 1 : 0}
                        end={filteredTenants.length}
                        total={tenants.length}
                    />
                    {/* pagination + summary handled by Table component */}
                </div>
            </div>
        </div>
    );
};

export default TenantsPage;
