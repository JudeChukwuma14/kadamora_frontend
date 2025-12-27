interface GuardLoaderProps {
    message?: string;
}

export default function GuardLoader({ message = 'Checking session...' }: GuardLoaderProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/85 backdrop-blur-sm">
            <div className="flex items-center space-x-3 rounded-lg bg-white px-5 py-3 shadow-lg ring-1 ring-black/5">
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"></span>
                <span className="text-sm font-medium text-[#091E42]">{message}</span>
            </div>
        </div>
    );
}
