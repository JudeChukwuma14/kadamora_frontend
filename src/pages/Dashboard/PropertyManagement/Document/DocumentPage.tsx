import React, { useState, useRef, useEffect } from 'react';
import CardMenuItem from '../../../../components/cards/card/CardMenuItem';
import DeleteConfirmationModal from '../../../../components/cards/card/DeleteConfirmationModal';

import StatusTag from './StatusTag';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';
import Table, { type TableHeader } from '@components/ui/Table/Table';

const mockDocuments = [
    {
        sn: '01',
        name: 'Lease Agreement - John Smith',
        category: 'Legal',
        related: 'John Smith - Unit A12 - Sunset Gardens',
        date: '6th Aug,2025',
        status: 'Active',
    },
    {
        sn: '02',
        name: 'Property Insurance Certificate',
        category: 'Property',
        related: 'Sunset Gardens',
        date: '4th Aug,2025',
        status: 'Expired',
    },
    {
        sn: '03',
        name: 'Inspection Report - Unit B5',
        category: 'Maintenance',
        related: 'Sarah Johnson - Unit B5 - Sunset Gardens',
        date: '16th July,2025',
        status: 'Active',
    },
    {
        sn: '04',
        name: 'ID Copy - Mike Wilson',
        category: 'Personal',
        related: 'Mike Wilson - Unit C3 - Hilltop Estate',
        date: '6th July,2025',
        status: 'Pending',
    },
    {
        sn: '05',
        name: 'Building Permit - Renovation',
        category: 'Legal',
        related: 'Metro Business Center',
        date: '2nd July,2025',
        status: 'Approved',
    },
    {
        sn: '06',
        name: 'Rent Receipt - December 2023',
        category: 'Financial',
        related: 'Emma Davis - Unit A8 - Dominion Estate',
        date: '16th June,2025',
        status: 'Issued',
    },
];

const DocumentPage: React.FC = () => {
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [search, setSearch] = useState('');

    const [documents, setDocuments] = useState(mockDocuments);
    const [openMenuFor, setOpenMenuFor] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);

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
        setDocuments((prev) => prev.filter((d) => d.sn !== deleteCandidate));
        setShowDeleteConfirm(false);
        setDeleteCandidate(null);
    };
    const filteredDocuments = documents.filter((d) => {
        const matchCategory = category ? d.category === category : true;
        const matchStatus = status ? d.status === status : true;
        const matchSearch = search
            ? d.name.toLowerCase().includes(search.toLowerCase()) ||
              d.related.toLowerCase().includes(search.toLowerCase())
            : true;
        return matchCategory && matchStatus && matchSearch;
    });

    return (
        <div className="pb-10">
            <div className="mb-6 mt-4 max-w-300 mx-auto">
                <div className="mt-8 rounded-xl border border-[#E8F4F8] bg-white p-6">
                    <div className="flex flex-col gap-3 mb-6 sm:flex-row sm:items-center">
                        <Select
                            title="Category"
                            options={[
                                { label: 'All Categories', value: '' },
                                ...Array.from(new Set(documents.map((d) => d.category))).map((c) => ({
                                    label: c,
                                    value: c,
                                })),
                            ]}
                            value={category}
                            onChange={setCategory}
                            containerClassName="min-w-[160px]"
                        />

                        <Select
                            title="Status"
                            options={[
                                { label: 'All Status', value: '' },
                                ...Array.from(new Set(documents.map((d) => d.status))).map((s) => ({
                                    label: s,
                                    value: s,
                                })),
                            ]}
                            value={status}
                            onChange={setStatus}
                            containerClassName="min-w-[140px]"
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
                                className="pl-12 pr-4 py-2 text-[14px]"
                                containerClassName="w-full"
                                placeholder="Search ..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                    <Table
                        className="text-[16px]"
                        responsive="stack"
                        renderCard={(d: any) => (
                            <div className="grid grid-cols-2 gap-3 items-start">
                                <div className="col-span-2 flex items-center gap-3">
                                    <span className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                                        <img
                                            src="/assets/icons/file-text.svg"
                                            alt="Document icon"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    <div className="flex-1">
                                        <div className="font-semibold text-[#0A2D50] text-[15px]">{d.name}</div>
                                        <div className="text-[13px] text-[#64748B]">{d.related}</div>
                                    </div>
                                </div>

                                <div className="text-[13px] text-[#374151]">
                                    <div className="font-medium text-sm">Category</div>
                                    <div className="text-[#475467]">{d.category}</div>
                                </div>
                                <div className="text-[13px] text-[#374151]">
                                    <div className="font-medium text-sm">Uploaded</div>
                                    <div className="text-[#475467]">{d.date}</div>
                                </div>

                                <div className="col-span-1 text-[13px] text-[#374151]">
                                    <div className="font-medium text-sm">Status</div>
                                    <div className="mt-1 inline-block">
                                        <StatusTag status={d.status as any} />
                                    </div>
                                </div>
                                <div className="col-span-1 text-right">
                                    <div className="inline-block">
                                        <div
                                            className="relative inline-block"
                                            ref={openMenuFor === d.sn ? menuRef : null}
                                        >
                                            <button
                                                aria-haspopup="menu"
                                                aria-expanded={openMenuFor === d.sn}
                                                aria-controls={`doc-menu-${d.sn}`}
                                                onClick={() => setOpenMenuFor((s) => (s === d.sn ? null : d.sn))}
                                                className="inline-flex items-center justify-center rounded-full text-[#98A2B3] p-2"
                                                title="More actions"
                                                aria-label="More actions"
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
                                            {openMenuFor === d.sn && (
                                                <div
                                                    id={`doc-menu-${d.sn}`}
                                                    role="menu"
                                                    aria-orientation="vertical"
                                                    className="absolute right-0 mt-2 w-55 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-50 overflow-hidden"
                                                >
                                                    <CardMenuItem
                                                        label="Edit Document"
                                                        iconSrc="/assets/icons/pen-line.svg"
                                                        iconAlt="Edit Document"
                                                        onActivate={() => {
                                                            setOpenMenuFor(null);
                                                            console.log('Edit document', d.sn);
                                                        }}
                                                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                    />

                                                    <CardMenuItem
                                                        label="Upload New"
                                                        iconSrc="/assets/icons/plus.svg"
                                                        iconAlt="Upload"
                                                        onActivate={() => {
                                                            setOpenMenuFor(null);
                                                            console.log('Upload new for', d.sn);
                                                        }}
                                                        className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                    />

                                                    <div className="h-px bg-[#EEF4FB] my-1" />

                                                    <CardMenuItem
                                                        label="Delete Document"
                                                        iconSrc="/assets/icons/trash-2.svg"
                                                        iconAlt="Delete"
                                                        onActivate={() => {
                                                            setOpenMenuFor(null);
                                                            setDeleteCandidate(d.sn);
                                                            setShowDeleteConfirm(true);
                                                        }}
                                                        className="text-[#D02929] hover:bg-[#FFF5F5]"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        headers={
                            [
                                { key: 'sn', label: 'S/N' },
                                { key: 'document', label: 'DOCUMENT' },
                                { key: 'category', label: 'CATEGORY' },
                                { key: 'related', label: 'RELATED TO' },
                                { key: 'date', label: 'UPLOAD DATE' },
                                { key: 'status', label: 'STATUS' },
                                { key: 'action', label: 'ACTION' },
                            ] as TableHeader[]
                        }
                        items={filteredDocuments}
                        renderRow={(d: any, idx: number) => (
                            <tr
                                key={d.sn}
                                className={idx % 2 === 0 ? 'bg-white text-[#3F3F46]' : 'bg-[#F3F5F5] text-[#3F3F46]'}
                            >
                                <td className="px-3 py-2">{d.sn}</td>
                                <td className="px-3 py-2 flex items-center gap-2">
                                    <span className="h-7 w-7 rounded bg-gray-100 flex items-center justify-center">
                                        <img
                                            src="/assets/icons/file-text.svg"
                                            alt="Document icon"
                                            className="h-5 w-5"
                                        />
                                    </span>
                                    {d.name}
                                </td>
                                <td className="px-3 py-2">{d.category}</td>
                                <td className="px-3 py-2">{d.related}</td>
                                <td className="px-3 py-2">{d.date}</td>
                                <td className="px-3 py-2">
                                    <StatusTag status={d.status as any} />
                                </td>
                                <td className="px-3 py-2 text-center">
                                    <div className="relative inline-block" ref={openMenuFor === d.sn ? menuRef : null}>
                                        <button
                                            aria-haspopup="menu"
                                            aria-expanded={openMenuFor === d.sn}
                                            aria-controls={`doc-menu-${d.sn}`}
                                            onClick={() => setOpenMenuFor((s) => (s === d.sn ? null : d.sn))}
                                            className="inline-flex items-center justify-center rounded-full text-[#98A2B3]"
                                            title="More actions"
                                            aria-label="More actions"
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

                                        {openMenuFor === d.sn && (
                                            <div
                                                id={`doc-menu-${d.sn}`}
                                                role="menu"
                                                aria-orientation="vertical"
                                                className="absolute right-0 mt-2 w-55 bg-white border border-[#E6EEF7] rounded-xl shadow-lg ring-1 ring-black/5 py-2 z-50 overflow-hidden"
                                            >
                                                <CardMenuItem
                                                    label="Edit Document"
                                                    iconSrc="/assets/icons/pen-line.svg"
                                                    iconAlt="Edit Document"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Edit document', d.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <CardMenuItem
                                                    label="Upload New"
                                                    iconSrc="/assets/icons/plus.svg"
                                                    iconAlt="Upload"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        console.log('Upload new for', d.sn);
                                                    }}
                                                    className="text-[#0A2D50] hover:bg-[#F1F9FF]"
                                                />

                                                <div className="h-px bg-[#EEF4FB] my-1" />

                                                <CardMenuItem
                                                    label="Delete Document"
                                                    iconSrc="/assets/icons/trash-2.svg"
                                                    iconAlt="Delete"
                                                    onActivate={() => {
                                                        setOpenMenuFor(null);
                                                        setDeleteCandidate(d.sn);
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
                        start={filteredDocuments.length ? 1 : 0}
                        end={filteredDocuments.length}
                        total={documents.length}
                    />
                    {/* pagination + summary handled by Table component */}
                    <DeleteConfirmationModal
                        isOpen={showDeleteConfirm}
                        title="Delete Document"
                        message="Are you sure you want to delete this document? This action cannot be undone."
                        onConfirm={handleConfirmDelete}
                        onClose={() => setShowDeleteConfirm(false)}
                    />
                </div>
            </div>
        </div>
    );
};

export default DocumentPage;
