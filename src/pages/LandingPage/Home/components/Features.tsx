export default function Features() {
    return (
        <section className="py-16 bg-[#f7f8fa]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <img
                            src="/assets/african_lady.png"
                            alt="Platform Features"
                            className="w-full max-w-112.5 h-auto md:w-112.5 md:h-125 mx-auto"
                            style={{ height: 'auto', maxWidth: '100%' }}
                        />
                    </div>
                    <div className="flex justify-end">
                        <div className="max-w-125">
                            <h2 className="mb-6 text-3xl md:text-[50px] font-bold text-secondary md:leading-16.25">
                                One Platform, Every Property, Project, and Possibility.
                            </h2>
                            <p className="text-gray-600 mb-8">
                                Our platform brings together residents, facility managers, real estate agents,
                                construction experts, logistics providers, hospitality leaders, and more to streamline
                                operations, drive growth, and deliver exceptional experiences.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
