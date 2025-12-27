import { useEffect, useMemo, useState } from 'react';

import { mockProperties } from '../Home/fakedb';
import { Link } from 'react-router';
import { getAgentPropertyListings, type AgentPropertyListing } from '@store/api/propertyListings';
import ProductCard from '@components/cards/product/ProductCard';
import PropertyCard from '@components/cards/property/PropertyCard';
import Input from '@components/forms/Input';
import Select from '@components/forms/Select';

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
    const [agentListings, setAgentListings] = useState<AgentPropertyListing[]>([]);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        let ignore = false;

        (async () => {
            try {
                const response = await getAgentPropertyListings();
                if (!ignore) {
                    console.log('Agent property listings response:', response);
                    const data = response.response?.data;
                    if (Array.isArray(data)) {
                        setAgentListings(data);
                    }
                }
            } catch (error) {
                if (!ignore) {
                    console.error('Failed to fetch agent listings', error);
                }
            }
        })();

        return () => {
            ignore = true;
        };
    }, []);

    const categories = useMemo(() => {
        if (agentListings.length > 0) {
            const categorySet = new Set<string>();
            agentListings.forEach((listing) => {
                if (listing.propertyCategory) {
                    categorySet.add(listing.propertyCategory);
                }
            });
            return ['all', ...Array.from(categorySet)];
        }

        return ['all', ...new Set(mockListings.map((item) => item.category))];
    }, [agentListings, mockListings]);

    const types = useMemo(() => {
        if (agentListings.length > 0) {
            const typeSet = new Set<string>();
            agentListings.forEach((listing) => {
                if (listing.propertyType) {
                    typeSet.add(listing.propertyType);
                }
            });
            return ['all', ...Array.from(typeSet)];
        }

        return ['all', ...new Set(mockListings.map((item) => item.type))];
    }, [agentListings, mockListings]);

    const filteredAgentListings = useMemo(() => {
        if (agentListings.length === 0) {
            return [];
        }

        const search = normalize(searchTerm);
        return agentListings.filter((listing) => {
            const categoryValue = listing.propertyCategory ?? '';
            const typeValue = listing.propertyType ?? '';
            const matchesCategory = categoryFilter === 'all' || categoryFilter === categoryValue;
            const matchesType = typeFilter === 'all' || typeFilter === typeValue;
            const matchesSearch =
                !search ||
                [
                    listing.title,
                    listing.location,
                    listing.propertyCategory,
                    listing.categoryType,
                    listing.propertySubType,
                ].some((field) => normalize(field).includes(search)) ||
                (Array.isArray(listing.amenities) && listing.amenities.some((tag:any) => normalize(tag).includes(search)));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [agentListings, categoryFilter, typeFilter, searchTerm]);

    const filteredMockListings = useMemo(() => {
        if (agentListings.length > 0) {
            return [];
        }

        const search = normalize(searchTerm);
        return mockListings.filter((listing) => {
            const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
            const matchesType = typeFilter === 'all' || listing.type === typeFilter;
            const matchesSearch =
                !search ||
                normalize(listing.title).includes(search) ||
                normalize(listing.category).includes(search) ||
                listing.tags.some((tag) => normalize(tag).includes(search));

            return matchesCategory && matchesType && matchesSearch;
        });
    }, [agentListings, mockListings, categoryFilter, typeFilter, searchTerm]);

    const toggleMockAvailability = (id: number) => {
        setMockListings((prev) =>
            prev.map((listing) => (listing.id === id ? { ...listing, available: !listing.available } : listing)),
        );
    };

    const toggleAgentAvailability = (id: string) => {
        setAgentListings((prev) =>
            prev.map((listing) =>
                listing.id === id
                    ? {
                          ...listing,
                          isAvailable: !(listing.isAvailable ?? true),
                      }
                    : listing,
            ),
        );
    };

    const hasAgentListings = agentListings.length > 0;
    const noResults = hasAgentListings ? filteredAgentListings.length === 0 : filteredMockListings.length === 0;

    return (
        <div className="pb-10">
            <header className="mb-10 flex flex-col gap-6">
                <div className="mb-1 mt-4">
                    <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">My Listing</h1>
                    <nav className="mb-2 text-[13px] flex items-center gap-1">
                        <Link to="/dashboard/home" className="hover:underline">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <span className="text-primary">My Listing</span>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-[25px] font-semibold leading-snug w-full md:w-auto mb-4 md:mb-0">
                        All Listing
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,180px)_minmax(0,180px)_minmax(0,1fr)] w-full md:w-auto">
                        <Select
                            containerClassName="relative"
                            placeholder="Category (All)"
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            options={categories.map((category) => ({
                                label: category === 'all' ? 'Category (All)' : formatOptionLabel(category),
                                value: category,
                            }))}
                            className="rounded-full border-[#D8E3F2] bg-white px-5 py-3 text-[13px] font-medium text-[#0F172A] shadow-sm"
                        />

                        <Select
                            containerClassName="relative"
                            placeholder="Type (All)"
                            value={typeFilter}
                            onChange={setTypeFilter}
                            options={types.map((type) => ({
                                label: type === 'all' ? 'Type (All)' : formatOptionLabel(type),
                                value: type,
                            }))}
                            className="rounded-full border-[#D8E3F2] bg-white px-5 py-3 text-[13px] font-medium text-[#0F172A] shadow-sm"
                        />

                        <div className="relative">
                            <Input
                                type="search"
                                value={searchTerm}
                                onChange={(event) => setSearchTerm(event.target.value)}
                                placeholder="Search listings..."
                                aria-label="Search listings"
                                className="rounded-full border-[#D8E3F2] bg-white pl-12 pr-4 text-[13px] font-medium text-[#0F172A] shadow-sm placeholder:text-[#94A3B8]"
                            />
                            <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                                <svg
                                    width="18"
                                    height="18"
                                    viewBox="0 0 18 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M7.875 14.25C11.0115 14.25 13.625 11.6365 13.625 8.5C13.625 5.36351 11.0115 2.75 7.875 2.75C4.73851 2.75 2.125 5.36351 2.125 8.5C2.125 11.6365 4.73851 14.25 7.875 14.25Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12.25 12.75L15.5 16"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <section>
                {noResults ? (
                    <div className="rounded-3xl border border-dashed border-[#C5D4E3] bg-white/70 py-20 text-center text-[#64748B]">
                        No listings match your filters yet. Try adjusting the filters or create a new listing.
                    </div>
                ) : (
                    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                        {hasAgentListings
                            ? filteredAgentListings.map((listing) => (
                                  <PropertyCard
                                      key={listing.id}
                                      property={listing}
                                      showAvailabilityToggle
                                      onToggleAvailability={() => toggleAgentAvailability(listing.id)}
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
                                          category: listing.tags[0] ?? listing.type,
                                          subCategory: listing.tags[1] ?? listing.category,
                                          image: listing.image,
                                      }}
                                      showAvailabilityToggle
                                      available={listing.available}
                                      availabilityLabel={
                                          listing.available ? 'Visible to clients' : 'Hidden from clients'
                                      }
                                      onToggleAvailability={() => toggleMockAvailability(listing.id)}
                                  />
                              ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function formatCurrency(value: number | string): string {
    const numericValue = typeof value === 'string' ? Number(value) : value;
    if (Number.isNaN(numericValue)) {
        return '₦ 0.00';
    }

    return `₦ ${numericValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function formatOptionLabel(value: string): string {
    return value
        .split('_')
        .join(' ')
        .split(' ')
        .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
        .join(' ')
        .trim();
}
