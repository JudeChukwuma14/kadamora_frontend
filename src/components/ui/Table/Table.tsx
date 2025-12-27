import React from 'react';

export type TableHeader = { key: string; label: React.ReactNode; className?: string };

interface TableProps<T> {
    headers: TableHeader[];
    items: T[];
    renderRow: (item: T, idx: number) => React.ReactNode;
    /**
     * When 'stack' is used the component will render a stacked card view for small screens
     * (mobile) using renderCard, and a table for sm+ screens.
     * Default = 'scroll' (table only, horizontally scrollable)
     */
    responsive?: 'scroll' | 'stack';
    /**
     * Optional renderer used when responsive='stack' to render per-item card for small screens.
     */
    renderCard?: (item: T, idx: number) => React.ReactNode;
    className?: string;
    containerClassName?: string;
    // pagination / summary
    start?: number;
    end?: number;
    total?: number;
}

export default function Table<T>({
    headers,
    items,
    renderRow,
    className = '',
    containerClassName = '',
    start,
    end,
    total,
    responsive = 'scroll',
    renderCard,
}: TableProps<T>) {
    const startVal = start ?? (items.length > 0 ? 1 : 0);
    const endVal = end ?? items.length;
    const totalVal = total ?? items.length;

    return (
        <div className={`${containerClassName}`}>
            {/* Desktop / wide screens - table */}
            <div className={responsive === 'stack' ? 'hidden sm:block overflow-x-auto' : 'overflow-x-auto'}>
                <table className={`min-w-full text-left ${className}`}>
                    <thead>
                        <tr className="bg-[#F9FBFC] text-[#3F3F46]">
                            {headers.map((h) => (
                                <th key={h.key} className={`${h.className ?? 'px-4 py-3 font-semibold'}`}>
                                    {h.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>{items.map((item, idx) => renderRow(item, idx))}</tbody>
                </table>
            </div>

            {/* Mobile stacked cards when responsive='stack' */}
            {responsive === 'stack' && renderCard ? (
                <div className="block sm:hidden space-y-3">
                    {items.map((item, idx) => (
                        <div
                            key={(item as any).sn ?? idx}
                            className="rounded-xl border border-[#E8F4F8] bg-white p-4 shadow-sm"
                        >
                            {renderCard(item, idx)}
                        </div>
                    ))}
                </div>
            ) : null}
            <div className="flex items-center justify-between mt-6 text-[15px] text-[#3F3F46]">
                <span>
                    Showing {startVal} to {endVal} of {totalVal} entries
                </span>
                <div className="flex items-center gap-2">
                    <button
                        className="h-9 w-9 rounded bg-[#F1F4F7] text-[#3F3F46] flex items-center justify-center"
                        disabled
                        title="Previous page"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        className="h-9 w-9 rounded bg-[#0A2D50] text-white flex items-center justify-center"
                        title="Next page"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}