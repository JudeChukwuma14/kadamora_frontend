import React, { useCallback, useState } from 'react';

interface SuccessPromptProps {
    done: () => void;
}

const SuccessPrompt: React.FC<SuccessPromptProps> = ({ done }) => {
    const [mounted, setMounted] = useState(false);
    React.useEffect(() => {
        const t = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(t);
    }, []);

    const handleDone = useCallback(() => {
        done();
        window.location.reload();
    }, [done]);

    return (
        <div className="w-full sm:w-130 max-w-[100vw] bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-16 py-12 text-center flex flex-col items-center justify-center">
                <div
                    className={`mx-auto mb-8 h-24 w-24 relative flex items-center justify-center rounded-full bg-[#E6F9F0] transition-all duration-500 ease-out ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                >
                    {/* Ripple / pulse layers */}
                    <span className="absolute inset-0 rounded-full bg-[#16A34A]/20 animate-ping" />
                    <span className="absolute inset-0 rounded-full bg-[#16A34A]/10 animate-ping delay-200" />
                    <img
                        src="/assets/icons/success.svg"
                        alt="Success icon"
                        className={`h-24 w-24 relative z-10 drop-shadow-sm transition-transform duration-700 ease-out ${mounted ? 'scale-100' : 'scale-50'}`}
                    />
                </div>
                <h3 className="text-[18px] font-semibold text-[#001731] mb-3">Submitted Successfully!</h3>
                <p className="leading-relaxed text-[#595959] max-w-105 mx-auto mb-8">
                    Your submission was successful and is under review. Verification usually takes less than 24 hours.
                    You'll be notified once your account is approved.
                </p>
                <button
                    onClick={handleDone}
                    className="bg-[#002A54] hover:bg-[#013463] text-white w-37.5 text-[13px] font-semibold rounded-md px-8 py-3 inline-flex"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default SuccessPrompt;
