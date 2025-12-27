import React, { useCallback, useEffect, useRef, useState } from 'react';
import { isAxiosError } from 'axios';
import { useRequestPasswordResetMutation } from '@store/api/auth.api';
import Input from '@components/forms/Input';



export default function ForgotPassword() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [toastMessage, setToastMessage] = useState<string | null>(null);
    const toastTimeoutRef = useRef<number | null>(null);
    const [triggerPasswordReset] = useRequestPasswordResetMutation();

    const hideToast = useCallback(() => {
        setToastMessage(null);
        if (toastTimeoutRef.current !== null) {
            window.clearTimeout(toastTimeoutRef.current);
            toastTimeoutRef.current = null;
        }
    }, []);

    const showToast = useCallback((message: string) => {
        setToastMessage(message);
        if (toastTimeoutRef.current !== null) {
            window.clearTimeout(toastTimeoutRef.current);
        }
        toastTimeoutRef.current = window.setTimeout(() => {
            setToastMessage(null);
            toastTimeoutRef.current = null;
        }, 6000);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = String(formData.get('email') ?? '')
            .trim()
            .toLowerCase();

        if (!email) {
            setErrorMessage('Email is required.');
            return;
        }

        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            const response = await triggerPasswordReset({ email }).unwrap();
            showToast(response.message || 'Password reset link sent. Please check your email.');
            form.reset();
        } catch (err) {
            if (isAxiosError(err)) {
                const apiMessage = (err.response?.data as { message?: string })?.message;
                setErrorMessage(apiMessage || 'Unable to send reset code. Please try again.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        return () => {
            if (toastTimeoutRef.current !== null) {
                window.clearTimeout(toastTimeoutRef.current);
            }
        };
    }, []);

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Forget Password</h1>
            <p className="text-gray-600 mt-2">Enter your email to receive password reset instructions.</p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {errorMessage ? (
                    <div
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                ) : null}

                <Input
                    id="email"
                    name="email"
                    title="Email"
                    placeholder="Enter your email"
                    type="email"
                    required
                    autoComplete="email"
                />

                <button
                    type="submit"
                    className={`w-full bg-secondary text-white py-3 rounded-lg hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
                        isSubmitting ? 'scale-[0.99] animate-pulse' : ''
                    }`}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting ? 'true' : 'false'}
                >
                    {isSubmitting ? (
                        <>
                            <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                        </>
                    ) : (
                        'Send'
                    )}
                </button>

                <p className="text-center text-gray-600">
                    Remember password ?, Sign in{' '}
                    <a href="/auth/login" className="text-green-700 hover:underline">
                        here
                    </a>
                </p>
            </form>
            {toastMessage ? (
                <div
                    className="fixed top-6 right-6 z-50 max-w-sm rounded-lg border border-[#BBF7D0] bg-[#F0FDF4] shadow-[0_10px_30px_rgba(34,197,94,0.25)] px-4 py-3 text-sm text-[#166534] animate-[toast-in_0.3s_ease-out]"
                    role="status"
                    aria-live="polite"
                >
                    <style>{`
                            @keyframes toast-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
                            @keyframes toast-out { from { opacity: 1; transform: translateY(0); } to { opacity: 0; transform: translateY(-6px); } }
                        `}</style>
                    <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#DCFCE7] text-[#166534]">
                            <svg
                                viewBox="0 0 20 20"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path d="M16.667 5 8.125 15 3.333 10" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        <div className="flex-1 leading-relaxed">{toastMessage}</div>
                        <button
                            type="button"
                            onClick={hideToast}
                            className="ml-2 text-[#15803D] hover:text-[#166534]/70"
                            aria-label="Dismiss notification"
                        >
                            <svg
                                viewBox="0 0 20 20"
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="M5 5l10 10M15 5 5 15" strokeLinecap="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}
