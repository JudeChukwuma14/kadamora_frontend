import { fakeDb } from "@components/fakeDB/fakeDb";


export default function Stats() {
    return (
        <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                    {fakeDb.stats.map((stat: any, index: number) => (
                        <div
                            key={stat.id}
                            className={`flex items-center justify-center md:justify-start ${
                                index < fakeDb.stats.length - 1 ? 'md:border-r md:border-gray-300 md:pr-8' : ''
                            }`}
                        >
                            <div className="w-20 h-20 flex items-center justify-center mr-4">
                                <img src={stat.icon} alt={stat.label} className="w-16 h-16" />
                            </div>
                            <div className="flex-1 flex flex-col items-center">
                                <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
                                <div className="font-semibold text-sm">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
