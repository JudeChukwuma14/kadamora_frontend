import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';

export default function ForgotPasswordVerify() {
    const navigate = useNavigate();
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [seconds, setSeconds] = useState(60);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [seconds]);

    const onChange = (idx: number, value: string) => {
        const digit = value.replace(/\D/g, '').slice(0, 1);
        const next = [...code];
        next[idx] = digit;
        setCode(next);
        if (digit && idx < inputs.current.length - 1) {
            inputs.current[idx + 1]?.focus();
        }
    };

    const onKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !code[idx] && idx > 0) {
            inputs.current[idx - 1]?.focus();
        }
    };

    const canContinue = code.every((c) => c.length === 1);

    const handleResend = () => {
        setCode(['', '', '', '']);
        setSeconds(60);
        inputs.current[0]?.focus();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: verify and navigate to reset page
        navigate('/auth/forgot-password/reset');
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Forget Password</h1>
            <p className="text-gray-600 mt-2">
                Enter the four digit pin we sent to your email to proceed with setting a new password.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="flex gap-3">
                    {code.map((c, idx) => (
                        <input
                            key={idx}
                            ref={(el) => {
                                inputs.current[idx] = el;
                            }}
                            value={c}
                            onChange={(e) => onChange(idx, e.target.value)}
                            onKeyDown={(e) => onKeyDown(idx, e)}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={1}
                            aria-label={`OTP digit ${idx + 1}`}
                            className="w-12 h-12 text-center rounded-lg bg-[#F5F7FB] border border-[#E6EAF2] focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-base"
                        />
                    ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>
                        Your verification code expires in:{' '}
                        <span className="text-green-600 font-medium">
                            {mm}:{ss}
                        </span>
                    </span>
                    <button type="button" onClick={handleResend} className="text-gray-600 hover:underline">
                        Resend Code
                    </button>
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 rounded-lg transition-colors ${
                        canContinue
                            ? 'bg-secondary text-white hover:opacity-95'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                    }`}
                    disabled={!canContinue}
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
