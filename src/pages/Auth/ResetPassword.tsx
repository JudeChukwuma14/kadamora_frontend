import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { isAxiosError } from 'axios';
import { useResetPasswordMutation } from '@store/api/auth.api';

export default function ResetPassword() {
    const navigate = useNavigate();
    const { code } = useParams<{ code: string }>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [triggerResetPassword] = useResetPasswordMutation();

    const isCodeMissing = useMemo(() => !code || code.trim().length === 0, [code]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isSubmitting) return;

        const form = e.currentTarget;
        const formData = new FormData(form);
        const password = String(formData.get('password') ?? '');
        const confirm = String(formData.get('confirm') ?? '');

        if (!password || !confirm) {
            setErrorMessage('Password and confirmation are required.');
            return;
        }

        if (password.length < 8) {
            setErrorMessage('Password must be at least 8 characters long.');
            return;
        }

        if (password !== confirm) {
            setErrorMessage('Passwords do not match.');
            return;
        }

        if (isCodeMissing) {
            setErrorMessage('This reset link is invalid or has expired. Please request a new one.');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await triggerResetPassword({ newPassword: password, resetToken: code as string }).unwrap();
            setSuccessMessage(response.message || 'Password reset successful. You can now sign in.');
            form.reset();
            setTimeout(() => navigate('/auth/login'), 2000);
        } catch (err) {
            if (isAxiosError(err)) {
                const apiMessage = (err.response?.data as { message?: string })?.message;
                setErrorMessage(apiMessage || 'Unable to reset password. Please try again.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (isCodeMissing) {
            setErrorMessage('This reset link is invalid or has expired. Please request a new one.');
        }
    }, [isCodeMissing]);

    return (
        <div className="w-full max-w-md">
            <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Reset Password</h1>
            <p className="text-gray-600 mt-2">
                Lorem ipsum dolor sit amet consectetur. Diam platea consequat libero mattis rhoncus interdum neque.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {errorMessage ? (
                    <div
                        className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                        role="alert"
                    >
                        {errorMessage}
                    </div>
                ) : null}
                {successMessage ? (
                    <div
                        className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-600"
                        role="status"
                    >
                        {successMessage}
                    </div>
                ) : null}
                {/* Password */}
                <div>
                    <label htmlFor="password" className="block mb-1 text-secondary font-medium">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 pr-10 border border-[#BEBEBE] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors bg-gray-50 placeholder-[#52525B] text-sm"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                            title={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label htmlFor="confirm" className="block mb-1 text-secondary font-medium">
                        Confirm Password
                    </label>
                    <div className="relative">
                        <input
                            id="confirm"
                            name="confirm"
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Enter password"
                            className="w-full px-4 py-3 pr-10 border border-[#BEBEBE] rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors bg-gray-50 placeholder-[#52525B] text-sm"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((s) => !s)}
                            className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showConfirm ? 'Hide password' : 'Show password'}
                            title={showConfirm ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showConfirm ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-secondary text-white py-3 rounded-lg hover:opacity-95 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={isSubmitting || isCodeMissing}
                    aria-busy={isSubmitting}
                >
                    {isSubmitting ? 'Saving...' : 'Save'}
                </button>
            </form>
        </div>
    );
}
