import PopularProperties from '@components/widgets/PopularProperties';
import LandingPageContainer from '@components/container/LandingPage/LandingPageContainer';
import { ListingsSEO } from '@components/SEO/SEO';
import { fakeDb } from '@components/fakeDB/fakeDb';
import ProductCard from '@components/cards/product/ProductCard';

export default function PropertyListing() {
    return (
        <>
            <ListingsSEO />
            <LandingPageContainer>
                <section className="py-16 bg-[#f7f8fa]">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h2 className="text-3xl md:text-[40px] font-bold text-secondary mb-4">
                                    Recent Listing
                                </h2>
                                <p className="text-gray-600">
                                    Lorem ipsum dolor sit amet consectetur. Rutrum risus consequat interdum tempus
                                    sapien sed amet
                                </p>
                            </div>
                        </div>

                        {/* Property Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {fakeDb.listings.slice(0, 4).map((property) => (
                                <ProductCard key={property.id} property={property} landingPage />
                            ))}
                        </div>

                        {/* Second Row */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {fakeDb.listings.slice(4, 8).map((property) => (
                                <ProductCard key={property.id} property={property} landingPage />
                            ))}
                        </div>
                    </div>
                </section>
                <PopularProperties title="Popular homes in Lagos" />
                <PopularProperties title="Popular homes in Abuja" />
            </LandingPageContainer>
        </>
    );
}
