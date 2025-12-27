export default function Service({
    service,
}: {
    service: { id: number; title: string; description: string; image: string };
}) {
    return (
        <div
            tabIndex={0}
            className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden w-80 flex-shrink-0 shadow-sm transition-all duration-300 ease-out outline-none hover:-translate-y-1 hover:border-[#43CC88]/40 focus-visible:ring-2 focus-visible:ring-primary/50"
        >
            <div className="h-64 relative overflow-hidden">
                <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-3 transition-transform duration-300 group-hover:-translate-y-0.5">
                    {service.title}
                </h3>
                <p className="text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-700">
                    {service.description}
                </p>
            </div>
        </div>
    );
}
