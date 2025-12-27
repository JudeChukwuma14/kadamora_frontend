
import CategoryCard from './components/CategoryCard';
import { MdOutlineLocationOn } from 'react-icons/md';
import { LuShieldCheck } from 'react-icons/lu';
import Gallery from '../../../../components/cards/gallery/Gallery';
import { fakeDb } from '../../../../components/fakeDB/fakeDb';
import ProductCard from '../../../../components/cards/product/ProductCard';

export default function PropertyView() {
    const amenities = [
        { name: 'Swimming Pool', icon: '/assets/icons/check2.png' },
        { name: 'Gym', icon: '/assets/icons/check2.png' },
        { name: 'Garden', icon: '/assets/icons/check2.png' },
        { name: 'Wi-Fi', icon: '/assets/icons/check2.png' },
        { name: 'Parking', icon: '/assets/icons/check2.png' },
    ];

    const facilities = [
        { count: 6, label: 'Bedroom' },
        { count: 2, label: 'Kitchen' },
        { count: 3, label: 'Toilet/Bathroom' },
        { count: 1, label: 'Store' },
        { count: 2, label: 'Living Room' },
        { count: 1, label: 'Dinning Room' },
    ];

    const categoryData = [
        { label: 'Property Category', value: 'Affordable' },
        { label: 'Property Type', value: 'Duplex' },
        { label: 'Payment Type', value: 'Annually' },
        { label: 'Other Charges', value: '₦ 234,999.00' },
        { label: 'Category Type', value: 'Residential Properties' },
        { label: 'Furnish Status', value: 'Fully furnished' },
        { label: 'Caution Fee', value: '₦ 234,999.00' },
    ];

    const safetyTips = [
        'Never send payments in advance.',
        'Carefully inspect the property or item to confirm it meets your needs.',
        'Verify all relevant documents and proceed with payment only when fully satisfied.',
    ];

    return (
        <>
            {/* Breadcrumb */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex">
                        <span>Listings</span>
                        <span className="mx-2">›</span>
                        <span className="text-primary">Hillary Court Lagos</span>
                    </nav>
                </div>
            </div>

            <section className="">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Images / Video */}
                        <Gallery />

                        {/* Right Column - Property Details */}
                        <div className="bg-white p-4 rounded-lg shadow-border">
                            <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold text-[#002E62]">Hillary Court Lagos</div>
                                <button
                                    className="p-2 rounded-full border border-gray-300 hover:bg-gray-50"
                                    aria-label="Add to favorites"
                                >
                                    <svg
                                        className="w-5 h-5 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <p className="text-[18px] mb-4">₦ 234,999.00 / year</p>

                            <p className="mb-2 leading-7.5 text-[#6E6D6D]">
                                Felis sed amet eget aliquam cursus placerat. Risus morbi arut sed cursibhur auismod a
                                odio magna condimentum. amet eget aliquam cursus placerat. Felis morbi arut sed
                                cursibhur auismod a odio magna condimentum.
                            </p>
                            {/* Location */}
                            <div className="flex items-center gap-2 text-sm text-[#0A2D50] mb-3.75">
                                <MdOutlineLocationOn className="w-5 h-5 text-[#6E6D6D]" />
                                <a className="text-[#002E62] underline-offset-2 hover:underline" href="#">
                                    Dalaba Street Aminu Kano Cresent, Wuse Zone 2 Abuja, Nigeria
                                </a>
                            </div>

                            <div className="h-px w-full bg-[#E4E4E7] mb-6" />

                            {/* Category */}
                            <div className="w-full mt-5 mb-5">
                                <CategoryCard data={categoryData} />
                            </div>

                            <div className="h-px w-full bg-[#E4E4E7] mb-6" />

                            {/* Amenities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-[#002E62]">Amenities</h3>
                                <div className="flex flex-wrap gap-3">
                                    {amenities.map((amenity, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] bg-[#F9FAFB] px-3 py-1 text-[13px] text-[#6E6D6D]"
                                        >
                                            <img src={amenity.icon} alt="" className="h-4 w-4" aria-hidden />
                                            {amenity.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Facilities */}
                            <div className="mb-6">
                                <h3 className="font-semibold mb-3 text-[#002E62]">Facilities</h3>
                                <div className="grid grid-cols-[repeat(auto-fit,minmax(138px,1fr))] gap-3">
                                    {facilities.map((facility, index) => (
                                        <div
                                            key={index}
                                            className="w-30 h-20.25 mx-auto flex flex-col items-center justify-center shadow-border rounded-lg hover:border-primary transition-colors"
                                        >
                                            <img
                                                src="/assets/icons/bed.png"
                                                alt={facility.label}
                                                className="w-6 h-6 mb-2"
                                            />
                                            <div className="text-[14px] mt-1">
                                                {facility.count} {facility.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
                        <div className="rounded-[18px] border border-[#E2E8F0] bg-white p-6">
                            <div className="mb-4 flex items-center gap-2">
                                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#CCE3FD] bg-[#EEF6FF]">
                                    <LuShieldCheck />
                                </span>
                                <h3 className="text-[18px] font-semibold text-[#002E62]">Safety tips</h3>
                            </div>
                            <ul className="space-y-2 leading-relaxed text-[#3F3F46]">
                                {safetyTips.map((tip) => (
                                    <li key={tip} className="flex items-center gap-2">
                                        <span
                                            className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#3F3F46]"
                                            aria-hidden
                                        />
                                        <span>{tip}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="rounded-[18px] border border-[#E2E8F0] bg-white flex items-center">
                            <div className="flex items-center justify-between w-full p-3.75">
                                <div>
                                    <p className="text-[15px] font-semibold text-[#002E62]">
                                        Are you interested in this Property?
                                    </p>
                                    <div className="mt-4 flex items-center gap-3">
                                        <img
                                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Abel"
                                            alt="Abel Johnson Charles"
                                            className="h-12 w-12 rounded-full border border-[#CCE3FD]"
                                        />
                                        <div>
                                            <p className="text-[14px] font-semibold text-[#002E62]">
                                                Abel Johnson Charles
                                            </p>
                                            <p className="text-[13px] text-[#52525B]">Abeljohnsoncharles@gmail.com</p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className="rounded-full bg-[#002E62] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#072968] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#04194E]/50"
                                >
                                    Message Agent
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Properties */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-8">Similar Properties</h2>

                    {/* First Row */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {fakeDb.listings.slice(0, 4).map((property) => (
                            <ProductCard key={property.id} property={property} />
                        ))}
                    </div>

                    {/* Second Row */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {fakeDb.listings.slice(4, 8).map((property) => (
                            <ProductCard key={property.id} property={property} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
