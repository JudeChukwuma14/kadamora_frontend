import { useMemo, useState } from 'react';
import { mockProperties } from '../Home/fakedb';
import { Link } from 'react-router';
import Select from '@components/forms/Select';
import ProductCard from '@components/cards/product/ProductCard';
import Input from '@components/forms/Input';


interface ListingItem {
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

const INITIAL_LISTINGS: ListingItem[] = mockProperties.slice(0, 9).map((property, index) => ({
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

const normalize = (value: string) => value.trim().toLowerCase();

export default function MyListing() {
    const [listings, setListings] = useState<ListingItem[]>(INITIAL_LISTINGS);
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const categories = useMemo(() => ['all', ...new Set(listings.map((item) => item.category))], [listings]);
    const types = useMemo(() => ['all', ...new Set(listings.map((item) => item.type))], [listings]);

    const filteredListings = useMemo(() => {
        const search = normalize(searchTerm);
        return listings.filter((listing) => {
            const matchesCategory = categoryFilter === 'all' || listing.category === categoryFilter;
            const matchesType = typeFilter === 'all' || listing.type === typeFilter;
            const matchesSearch =
                !search ||
                normalize(listing.title).includes(search) ||
                normalize(listing.category).includes(search) ||
                listing.tags.some((tag) => normalize(tag).includes(search));
            return matchesCategory && matchesType && matchesSearch;
        });
    }, [listings, categoryFilter, typeFilter, searchTerm]);

    const toggleAvailability = (id: number) => {
        setListings((prev) =>
            prev.map((listing) => (listing.id === id ? { ...listing, available: !listing.available } : listing)),
        );
    };

    return (
        <div className="pb-10">
            <header className="mb-10 flex flex-col gap-6">
                <div className="mb-1 mt-4">
                    <h1 className="text-[25px] font-semibold text-[#002E62] leading-snug">My Saved</h1>
                    <nav className="mb-2 text-[13px] flex items-center gap-1">
                        <Link to="/dashboard/home" className="hover:underline">
                            Home
                        </Link>
                        <span>{'>'}</span>
                        <span className="text-primary">My Saved</span>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-[25px] font-semibold leading-snug w-full md:w-auto mb-4 md:mb-0">
                        All Saved
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[minmax(0,180px)_minmax(0,180px)_minmax(0,1fr)] w-full md:w-auto">
                        <Select
                            containerClassName="relative"
                            placeholder="Category (All)"
                            value={categoryFilter}
                            onChange={setCategoryFilter}
                            options={categories.map((category) => ({
                                label: category === 'all' ? 'Category (All)' : category,
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
                                label: type === 'all' ? 'Type (All)' : type,
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
                {filteredListings.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-[#C5D4E3] bg-white/70 py-20 text-center text-[#64748B]">
                        No listings match your filters yet. Try adjusting the filters or create a new listing.
                    </div>
                ) : (
                    <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-4">
                        {filteredListings.map((listing) => (
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
                                availabilityLabel={listing.available ? 'Visible to clients' : 'Hidden from clients'}
                                onToggleAvailability={() => toggleAvailability(listing.id)}
                            />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function formatCurrency(value: number): string {
    return `₦ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
