import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import { useVerifyAccountMutation } from '@store/api/auth.api';
import { saveTokens } from '@utils/authStorage';

export default function SignupVerify() {
    const navigate = useNavigate();
    const location = useLocation();
    const [code, setCode] = useState<string[]>(['', '', '', '']);
    const [seconds, setSeconds] = useState(60);
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    const [triggerVerifyAccount] = useVerifyAccountMutation();

    const email = useMemo(() => {
        const stateEmail = (location.state as { email?: string } | null)?.email;
        if (stateEmail) return stateEmail;
        const params = new URLSearchParams(location.search);
        return params.get('email') ?? '';
    }, [location.state, location.search]);

    const redirectTo = useMemo(() => {
        const stateFrom = (location.state as { from?: string } | null)?.from;
        if (stateFrom) return stateFrom;
        const params = new URLSearchParams(location.search);
        return params.get('redirect') ?? '/dashboard';
    }, [location.state, location.search]);

    useEffect(() => {
        if (seconds <= 0) return;
        const t = setInterval(() => setSeconds((s) => s - 1), 1000);
        return () => clearInterval(t);
    }, [seconds]);

    const onChange = (idx: number, value: string) => {
        const char = value
            .replace(/[^a-zA-Z0-9]/g, '')
            .slice(0, 1)
            .toUpperCase();
        const next = [...code];
        next[idx] = char;
        setCode(next);
        if (char && idx < inputs.current.length - 1) {
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
        setErrorMessage(null);
        inputs.current[0]?.focus();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            setErrorMessage('Verification link is missing an email. Please reopen the verification link.');
            return;
        }

        const token = code.join('');
        setIsVerifying(true);
        setErrorMessage(null);

        try {
            const result = await triggerVerifyAccount({ token, email }).unwrap();
            const data = result?.data;

            if (!data?.accessToken || !data?.refreshToken) {
                setErrorMessage('Verification response is missing credentials. Please try again.');
                return;
            }

            saveTokens({ accessToken: data.accessToken, refreshToken: data.refreshToken });

            navigate('/auth/signup/verified', {
                state: {
                    message: data?.message,
                    redirectTo,
                },
                replace: true,
            });
        } catch (err) {
            if (isAxiosError(err)) {
                const apiMessage = (err.response?.data as { message?: string })?.message;
                setErrorMessage(apiMessage || 'We could not verify your account. Please check the code and try again.');
            } else {
                setErrorMessage('Something went wrong while verifying. Please try again later.');
            }
        } finally {
            setIsVerifying(false);
        }
    };

    const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
    const ss = String(seconds % 60).padStart(2, '0');

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Just One More Step</h1>
            <p className="text-gray-600 mt-2">
                We’ve sent a 4-digit code to your email. Enter it below to verify your account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {email ? null : (
                    <div className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
                        We could not detect your email address. Please return to signup and try again.
                    </div>
                )}

                {errorMessage ? (
                    <div
                        role="alert"
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                    >
                        {errorMessage}
                    </div>
                ) : null}

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
                            inputMode="text"
                            pattern="[A-Za-z0-9]*"
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
                    className={`w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        canContinue && email
                            ? 'bg-secondary text-white hover:opacity-95'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                    } ${isVerifying ? 'scale-[0.99] animate-pulse' : ''}`}
                    disabled={!canContinue || !email || isVerifying}
                    aria-busy={isVerifying ? 'true' : 'false'}
                >
                    {isVerifying ? (
                        <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                            <span>Verifying…</span>
                        </>
                    ) : (
                        'Verify Now'
                    )}
                </button>
            </form>
        </div>
    );
}
