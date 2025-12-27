import {  useState } from 'react';
import ServiceCard from './ServiceCard';

import { services } from './service';


export default function Dashboard() {
    const [searchQuery] = useState('');
    const [showWelcome, setShowWelcome] = useState(true);
    // const { account } = useAuth();

    // const displayName = useMemo(() => {
    //     if (!account) return '';
    //     const fullName = `${account.firstName ?? ''} ${account.lastName ?? ''}`.trim();
    //     return fullName || '';
    // }, [account]);

    // Basic client-side filter (optional enhancement)
    const filtered = services.filter(
        (s: any) =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="mt-3">
            {showWelcome && (
                <section className="relative flex md:justify-between flex-col md:flex-row mb-10 overflow-hidden ">
                    <div className="max-w-3xl pr-16">
                        <h1 className="mb-4 flex items-center text-2xl md:text-[30px] font-bold tracking-tight text-[#091E42]">
                            Hi, User <span className="ml-2 text-2xl">👋</span>
                        </h1>
                        <p className="text-sm leading-relaxed text-[#505F79] font-medium">
                            Welcome aboard! We're thrilled to have you here. Our all-in-one real estate management
                            system is built to simplify your workflow — from property listings and tenant communication
                            to maintenance tracking and financial reporting.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowWelcome(false)}
                        className="w-20.75 mt-3 flex items-center text-[#41A36E] text-[15px] font-semibold"
                    >
                        Okay, Got It
                    </button>
                </section>
            )}
            <section aria-label="Service categories">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((item: any) => (
                        <ServiceCard key={item.id} item={item} />
                    ))}
                    {filtered.length === 0 && (
                        <div className="col-span-full rounded-xl border border-dashed border-[#D0D5DD] p-12 text-center text-sm text-[#667085]">
                            No matches for “{searchQuery}”. Try a different keyword.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
