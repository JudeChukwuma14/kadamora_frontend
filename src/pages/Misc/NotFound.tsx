import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useAppSelector } from '@store/hooks';

export default function NotFound() {
    const navigate = useNavigate();
    const location = useLocation();
    const account = useAppSelector((s) => s.auth.user);

    const homePath = useMemo(() => {
        if (account || location.pathname.startsWith('/dashboard')) {
            return '/dashboard/home';
        }
        return '/';
    }, [account, location.pathname]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-[#F7FBFF] via-white to-[#F8FBFF] px-6 text-center">
            <div className="max-w-xl">
                <span className="inline-flex items-center justify-center rounded-full bg-[#E6F9F0] px-4 py-2 text-[13px] font-semibold text-[#0A7D47] mb-6">
                    404 • Page Not Found
                </span>
                <h1 className="text-[40px] md:text-[56px] font-bold text-[#0A2D50] leading-tight mb-4">
                    Lost in the property jungle?
                </h1>
                <p className="text-[16px] md:text-[18px] text-[#5A6473] leading-relaxed mb-8">
                    The page you are looking for either moved or never existed. Let&apos;s get you back to a safe place
                    so you can continue exploring Kadamora.
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center justify-center rounded-full border border-[#CCE3FD] bg-white px-6 py-3 text-[14px] font-semibold text-[#0A2D50] shadow-sm transition hover:border-[#94C5FF]"
                    >
                        Go Back
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(homePath)}
                        className="inline-flex items-center justify-center rounded-full bg-[#002A54] px-6 py-3 text-[14px] font-semibold text-white shadow hover:bg-[#013463] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#013463]/50"
                    >
                        Take Me Home
                    </button>
                </div>
            </div>
            <img
                src="/assets/illustrations/not-found.svg"
                alt="Explorer searching for properties"
                className="mt-12 max-w-120 w-full"
                onError={(event) => {
                    const target = event.currentTarget as HTMLImageElement;
                    target.style.display = 'none';
                }}
            />
        </div>
    );
}