import ProductCard from '@components/cards/product/ProductCard';
import { fakeDb } from '@components/fakeDB/fakeDb';
import Input from '@components/forms/Input';

import Select from '@components/forms/Select';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

export default function Listings() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => {
        const unique = new Set(fakeDb.listings.map((item) => item.category));
        return ['All', ...unique];
    }, []);

    const categoryOptions = useMemo(
        () =>
            categories.map((category) => ({
                label: category === 'All' ? 'All Categories' : category,
                value: category,
            })),
        [categories],
    );

    const filteredListings = useMemo(() => {
        const query = searchTerm.trim().toLowerCase();
        return fakeDb.listings.filter((property) => {
            const matchesCategory = selectedCategory === 'All' || property.category === selectedCategory;
            if (!query) {
                return matchesCategory;
            }
            const haystack = `${property.name} ${property.location} ${property.description}`.toLowerCase();
            return matchesCategory && haystack.includes(query);
        });
    }, [searchTerm, selectedCategory]);

    const visibleListings = filteredListings.slice(0, 8);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value } = e.target;
        setSearchTerm(value);
    };

    return (
        <section className="py-16 bg-[#f7f8fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-7.5">
                    <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between mb-3.75">
                        <div className="max-w-2xl">
                            <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-4">Recent Listing</h2>
                            <p className="mt-3 text-sm text-[#6F7787] md:text-base">
                                Browse the newest properties from trusted partners. Find the place that fits your goals
                                and reach out in just a few clicks.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="relative w-full md:max-w-sm md:mr-4">
                            <svg
                                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#98A2B3]"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2" />
                                <circle cx="11" cy="11" r="7" />
                            </svg>
                            <Input
                                value={searchTerm}
                                onChange={handleInputChange}
                                placeholder="Search ..."
                                className="w-full pl-10"
                                aria-label="Search listings"
                            />
                        </div>

                        <div className="flex-1 flex w-full items-center justify-between gap-3 md:w-auto">
                            <div className="w-37.5">
                                <Select
                                    containerClassName="flex-1"
                                    className="rounded-xl border border-[#E4E7EC] bg-white text-[#1F2937]"
                                    placeholder="Category"
                                    options={categoryOptions}
                                    value={selectedCategory}
                                    onChange={(value) => setSelectedCategory(value || 'All')}
                                />
                            </div>
                            <Link
                                to="/property-listing"
                                className="inline-flex flex-1 min-w-32.5 items-center justify-center rounded-xl border border-[#66AAF9] bg-[#E6F1FE] px-6 py-3.5 text-sm font-semibold text-secondary transition-colors hover:bg-[#D9E9FF] md:flex-none"
                            >
                                View All
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {visibleListings.map((property) => (
                        <ProductCard key={property.id} property={property} landingPage />
                    ))}
                </div>

                {visibleListings.length === 0 && (
                    <div className="mt-12 rounded-2xl border border-dashed border-[#CBD5E1] bg-white/80 p-10 text-center text-sm text-[#64748B]">
                        No listings match your search. Try adjusting your keywords or filters.
                    </div>
                )}
            </div>
        </section>
    );
}
