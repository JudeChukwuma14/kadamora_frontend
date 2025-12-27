import { Link } from 'react-router';
import type { AgentPropertyListing, AgentPropertyMedia } from '@store/api/propertyListings.api';

export interface PropertyCardProps {
    property: AgentPropertyListing;
    landingPage?: boolean;
    showAvailabilityToggle?: boolean;
    availabilityLabel?: string;
    onToggleAvailability?: () => void;
}

export default function PropertyCard({
    property,
    landingPage,
    showAvailabilityToggle = false,
    availabilityLabel,
    onToggleAvailability,
}: PropertyCardProps) {
    const available = property.isAvailable ?? true;
    const availabilityText = availabilityLabel ?? (available ? 'Visible to clients' : 'Hidden from clients');
    const coverMedia = selectPrimaryMedia(property.media);
    const coverImage = coverMedia?.url ?? '';
    const priceLabel = formatCurrency(property.price);
    const typeLabel = humanize(property.propertyType ?? '');
    const categoryLabel = humanize(property.propertyCategory ?? property.categoryType ?? 'Uncategorized');
    const subCategoryLabel = humanize(property.propertySubType ?? property.categoryType ?? '');
    const description = deriveDescription(property);

    return (
        <Link
            to={landingPage ? `/property-view/${property.id}` : `/dashboard/property-view/${property.id}`}
            className="group relative bg-white rounded-xl border border-[#CCE3FD] overflow-hidden shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary/40 block"
        >
            <button
                aria-label="Add to favourites"
                onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                }}
                className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-transform duration-150 hover:scale-105 active:scale-95"
            >
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </button>

            <div className="h-48 relative overflow-hidden bg-slate-100">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={coverMedia?.altText ?? property.title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center px-4 text-center text-xs font-medium text-slate-500">
                        Media preview unavailable
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>

            <div className="p-4">
                <div className="mb-2">
                    <h3 className="font-semibold text-secondary transition-transform duration-300 group-hover:-translate-y-0.5">
                        {property.title}
                    </h3>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                        {priceLabel}
                    </span>
                </div>
                <p className="text-gray-500 text-xs mb-3 transition-colors duration-300 group-hover:text-gray-600 line-clamp-2">
                    {description}
                </p>
                <div className="flex flex-wrap gap-2 transition-transform duration-300 group-hover:-translate-y-0.5">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypePillClass()}`}>{typeLabel}</span>
                    {categoryLabel && (
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypePillClass()}`}>{categoryLabel}</span>
                    )}
                    {subCategoryLabel && subCategoryLabel !== categoryLabel && (
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypePillClass()}`}>
                            {subCategoryLabel}
                        </span>
                    )}
                </div>
                {showAvailabilityToggle && (
                    <div className="mt-5 flex items-center justify-between border-t border-[#E2E8F0] pt-4">
                        <div className="flex flex-col">
                            <span className="text-[11px] font-medium text-[#94A3B8] uppercase tracking-wide">
                                Availability
                            </span>
                            <span className="text-[12px] font-semibold text-[#0F172A]">{availabilityText}</span>
                        </div>
                        <button
                            type="button"
                            role="switch"
                            aria-checked={available}
                            aria-label={available ? 'Disable availability' : 'Enable availability'}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                onToggleAvailability?.();
                            }}
                            className={`relative inline-flex h-[20px] w-[44px] items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary ${
                                available ? 'bg-[#43CC88]' : 'bg-[#CBD5E1]'
                            }`}
                        >
                            <span
                                className={`absolute left-[2px] top-1/2 h-[16px] w-[16px] -translate-y-1/2 rounded-full bg-white shadow transition-transform duration-200 ease-out ${
                                    available ? 'translate-x-[24px]' : 'translate-x-0'
                                }`}
                            />
                        </button>
                    </div>
                )}
            </div>
        </Link>
    );
}

function selectPrimaryMedia(media?: AgentPropertyMedia[]): AgentPropertyMedia | undefined {
    if (!Array.isArray(media) || media.length === 0) {
        return undefined;
    }

    const sortedMedia = [...media].sort((a, b) => {
        const orderA = typeof a.sortOrder === 'number' ? a.sortOrder : Number.MAX_SAFE_INTEGER;
        const orderB = typeof b.sortOrder === 'number' ? b.sortOrder : Number.MAX_SAFE_INTEGER;
        return orderA - orderB;
    });

    return sortedMedia.find((item) => item.mediaType === 'image') ?? sortedMedia[0];
}

function formatCurrency(value?: string | number | null): string {
    if (value === null || value === undefined || value === '') {
        return 'Price on request';
    }

    const numericValue = typeof value === 'string' ? Number(value) : value;

    if (Number.isNaN(numericValue)) {
        return 'Price on request';
    }

    return `₦ ${numericValue.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

function humanize(value?: string | null): string {
    if (!value) {
        return '';
    }

    return value
        .split('_')
        .join(' ')
        .split(' ')
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ')
        .trim();
}

function deriveDescription(property: AgentPropertyListing): string {
    const preferredDescription = property.description?.trim();
    if (preferredDescription) {
        return preferredDescription;
    }

    if (property.location) {
        return property.location;
    }

    if (Array.isArray(property.amenities) && property.amenities.length > 0) {
        return `Amenities: ${property.amenities.slice(0, 3).map(humanize).join(', ')}`;
    }

    return 'No description provided';
}

const TYPE_PILL_CLASSES = [
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-amber-100 text-amber-600',
    'bg-purple-100 text-purple-600',
    'bg-teal-100 text-teal-600',
    'bg-indigo-100 text-indigo-600',
    'bg-slate-100 text-slate-600',
    'bg-cyan-100 text-cyan-600',
];

function getTypePillClass(): string {
    if (TYPE_PILL_CLASSES.length === 0) {
        return 'bg-gray-100 text-gray-600';
    }

    const randomIndex = Math.floor(Math.random() * TYPE_PILL_CLASSES.length);
    return TYPE_PILL_CLASSES[randomIndex];
}
