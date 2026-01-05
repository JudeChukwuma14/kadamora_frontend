import { useMemo, useState } from 'react';
import { mockProperties } from '../Home/fakedb';
import { Link } from 'react-router';

import Select from '@components/forms/Select';
import Input from '@components/forms/Input';
import PropertyCard from '@components/cards/property/PropertyCard';
import ProductCard from '@components/cards/product/ProductCard';

import {
    useGetAgentPropertyListingsQuery,
    type AgentPropertyListing,
} from '@store/api/propertyListings.api';

interface MockListing {
    id: number;
    title: string;
    price: number;
    image: string;
    description: string;
    tags: string[];
    category: string;
    condition: string;
    type: string;
    available: boolean;
}

const DESCRIPTIONS = [
    'Felis sed amet eget aliquam cursus placerat. Risus morbi erat sed curabitur euismod a odio magna condimentum.',
    'Mauris luctus dictum sapien, quis iaculis mauris interdum vitae. Donec efficitur tellus eu odio congue rhoncus.',
    'Etiam sit amet nunc nec ex sollicitudin viverra. Integer pretium arcu quis lorem congue condimentum.',
];

const INITIAL_LISTINGS: MockListing[] = mockProperties.slice(0, 9).map((property, index) => ({
    id: property.id,
    title: property.title,
    price: property.price,
    image: property.img,
    description: DESCRIPTIONS[index % DESCRIPTIONS.length],
    tags: property.tags,
    category: property.category,
    condition: property.condition,
    type: property.type,
    available: true,
}));

const normalize = (value?: string | null) => value?.trim().toLowerCase() ?? '';

export default function MyListing() {
    const [mockListings, setMockListings] = useState<MockListing[]>(INITIAL_LISTINGS);
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    /* ========================
       Fetch Agent Listings
    ======================== */

    const {
        data,
        isLoading,
        isError,
    } = useGetAgentPropertyListingsQuery();

    const agentListings: AgentPropertyListing[] = data?.data ?? [];
    const hasAgentListings = agentListings.length > 0;

    /* ========================
       Category & Type Options
    ======================== */

    const categories = useMemo(() => {
        if (hasAgentListings) {
            return [
                'all',
                ...Array.from(
                    new Set(agentListings.map((l) => l.propertyCategory).filter(Boolean)),
                ),
            ];
        }
        return ['all', ...new Set(mockListings.map((l) => l.category))];
    }, [agentListings, mockListings, hasAgentListings]);
    console.log(categories)

    const types = useMemo(() => {
        if (hasAgentListings) {
            return [
                'all',
                ...Array.from(
                    new Set(agentListings.map((l) => l.propertyType).filter(Boolean)),
                ),
            ];
        }
        return ['all', ...new Set(mockListings.map((l) => l.type))];
    }, [agentListings, mockListings, hasAgentListings]);

    /* ========================
       Filtering Logic
    ======================== */

    const filteredAgentListings = useMemo(() => {
        if (!hasAgentListings) return [];

        const search = normalize(searchTerm);

        return agentListings.filter((listing) => {
            const matchesCategory =
                categoryFilter === 'all' || listing.propertyCategory === categoryFilter;

            const matchesType =
                typeFilter === 'all' || listing.propertyType === typeFilter;

            const matchesSearch =
                !search ||
                [
                    listing.title,
                    listing.location,
                    listing.propertyCategory,
                    listing.propertyType,
                    listing.propertySubType,
                ].some((field) => normalize(field).includes(search)) ||
                listing.amenities?.some((tag) => normalize(tag).includes(search));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [agentListings, categoryFilter, typeFilter, searchTerm, hasAgentListings]);

    const filteredMockListings = useMemo(() => {
        if (hasAgentListings) return [];

        const search = normalize(searchTerm);

        return mockListings.filter((listing) => {
            const matchesCategory =
                categoryFilter === 'all' || listing.category === categoryFilter;

            const matchesType =
                typeFilter === 'all' || listing.type === typeFilter;

            const matchesSearch =
                !search ||
                normalize(listing.title).includes(search) ||
                normalize(listing.category).includes(search) ||
                listing.tags.some((tag) => normalize(tag).includes(search));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [mockListings, categoryFilter, typeFilter, searchTerm, hasAgentListings]);

    /* ========================
       Availability Toggles
    ======================== */

    const toggleMockAvailability = (id: number) => {
        setMockListings((prev) =>
            prev.map((l) =>
                l.id === id ? { ...l, available: !l.available } : l,
            ),
        );
    };

    /* ========================
       UI States
    ======================== */

    if (isLoading) {
        return <p className="py-20 text-center">Loading listings...</p>;
    }

    if (isError) {
        return (
            <p className="py-20 text-center text-red-600">
                Failed to load listings
            </p>
        );
    }

    const noResults = hasAgentListings
        ? filteredAgentListings.length === 0
        : filteredMockListings.length === 0;

    /* ========================
       Render
    ======================== */

    return (
        <div className="pb-10">
            <header className="mb-10 flex flex-col gap-6">
                <div>
                    <h1 className="text-[25px] font-semibold text-[#002E62]">
                        My Listing
                    </h1>
                    <nav className="text-[13px] flex items-center gap-1">
                        <Link to="/dashboard/home" className="hover:underline">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <span className="text-primary">My Listing</span>
                    </nav>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                    <Select
                        value={categoryFilter}
                        onChange={setCategoryFilter}
                        // options={categories.map((c) => ({
                        //     label: c === 'all' ? 'Category (All)' : formatOptionLabel(c),
                        //     value: c,
                        // }))}
                    />

                    <Select
                        value={typeFilter}
                        onChange={setTypeFilter}
                        options={types.map((t) => ({
                            label: t === 'all' ? 'Type (All)' : formatOptionLabel(t),
                            value: t,
                        }))}
                    />

                    <Input
                        type="search"
                        placeholder="Search listings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            {noResults ? (
                <div className="rounded-xl border border-dashed p-16 text-center text-gray-500">
                    No listings match your filters.
                </div>
            ) : (
                <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                    {hasAgentListings
                        ? filteredAgentListings.map((listing) => (
                              <PropertyCard
                                  key={listing.id}
                                  property={listing}
                                  showAvailabilityToggle
                              />
                          ))
                        : filteredMockListings.map((listing) => (
                              <ProductCard
                                  key={listing.id}
                                  property={{
                                      id: listing.id,
                                      name: listing.title,
                                      price: formatCurrency(listing.price),
                                      description: listing.description,
                                      category: listing.category,
                                      image: listing.image,
                                      subCategory: listing.category,
                                  }}
                                  available={listing.available}
                                  showAvailabilityToggle
                                  onToggleAvailability={() =>
                                      toggleMockAvailability(listing.id)
                                  }
                              />
                          ))}
                </div>
            )}
        </div>
    );
}

function formatCurrency(value: number): string {
    return `₦ ${value.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
}

function formatOptionLabel(value: string): string {
    return value
        .replace(/_/g, ' ')
        .replace(/\b\w/g, (l) => l.toUpperCase());
}