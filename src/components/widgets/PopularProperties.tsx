import ProductCard from "../cards/product/ProductCard";
import { fakeDb } from "../fakeDB/fakeDb";


export default function PopularProperties({ title = 'Popular homes in Ikeja' }) {
    // Get first 4 listings for the widget
    const popularHomes = fakeDb.listings.slice(0, 5);

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header with navigation arrows */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
                    <div className="flex items-center space-x-2">
                        <button
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Previous properties"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <button
                            className="w-10 h-10 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                            aria-label="Next properties"
                        >
                            <svg
                                className="w-5 h-5 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Property cards horizontal scroll */}
                <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide">
                    {popularHomes.map((property: any) => (
                        <div key={property.id} className="shrink-0 w-80">
                            <ProductCard property={property} landingPage />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
