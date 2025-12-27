import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { isAxiosError } from 'axios';
import { SignupSEO } from '@components/SEO/SEO';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useSignupMutation, type SignupPayload } from '@store/api/auth.api';

import PhoneNumberInput from '@components/forms/PhoneNumberInput';
import Checkbox from '@components/forms/Checkbox';
import Input from '@components/forms/Input';

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const [triggerSignup] = useSignupMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload: SignupPayload = {
            email: String(formData.get('email') ?? '')
                .trim()
                .toLowerCase(),
            firstName: String(formData.get('firstName') ?? '').trim(),
            lastName: String(formData.get('lastName') ?? '').trim(),
            password: String(formData.get('password') ?? ''),
            isTermsAccepted: Boolean(formData.get('terms')),
            phoneNumber: phone.trim(),
        };

        if (!payload.phoneNumber) {
            setErrorMessage('Phone number is required.');
            return;
        }

        setErrorMessage(null);
        setIsSubmitting(true);

        try {
            await triggerSignup(payload).unwrap();
            navigate('/auth/signup/verify', { state: { email: payload.email } });
        } catch (err) {
            if (isAxiosError(err)) {
                const apiMessage = (err.response?.data as { message?: string })?.message;
                setErrorMessage(apiMessage || 'Unable to create your account. Please try again.');
            } else {
                setErrorMessage('Something went wrong. Please try again later.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <SignupSEO />
            <div className="w-full max-w-md mx-auto px-4 sm:px-0">
                <div className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary leading-tight">
                    Get Started with <span className="text-green-500">Kadamora</span>
                </div>
                <p className="text-gray-600 mt-3 text-sm sm:text-base">
                    Unlock a seamless experience designed around your needs.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">
                    {errorMessage ? (
                        <div
                            role="alert"
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
                        >
                            {errorMessage}
                        </div>
                    ) : null}

                    {/* Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <Input
                            id="firstName"
                            name="firstName"
                            title="First name"
                            placeholder="Enter your first name"
                            required
                            autoComplete="given-name"
                        />
                        <Input
                            id="lastName"
                            name="lastName"
                            title="Last name"
                            placeholder="Enter your last name"
                            required
                            autoComplete="family-name"
                        />
                    </div>

                    {/* Email */}
                    <Input
                        id="email"
                        name="email"
                        title="Email"
                        type="email"
                        placeholder="Enter your email"
                        required
                        autoComplete="email"
                    />

                    {/* Phone number */}
                    <PhoneNumberInput title="Phone Number" value={phone} onChange={setPhone} required />

                    {/* Password */}
                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            title="Password"
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-gray-500 hover:text-gray-700 touch-manipulation"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            <span className="text-lg" aria-hidden>
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>

                    {/* Terms and Register - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 sm:gap-2">
                        {/* Terms */}
                        <Checkbox
                            id="terms"
                            name="terms"
                            value="true"
                            required
                            containerClassName="touch-manipulation"
                            label={
                                <>
                                    I agree to the{' '}
                                    <a href="#" className="text-green-600 hover:underline touch-manipulation">
                                        Terms and conditions
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="text-green-600 hover:underline touch-manipulation">
                                        Privacy policy
                                    </a>{' '}
                                    of Kadamora
                                </>
                            }
                        />

                        {/* Register Button */}
                        <div className="w-full sm:w-auto">
                            <button
                                type="submit"
                                className={`w-full sm:w-auto px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-95 transition-all touch-manipulation min-h-12 disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2 ${isSubmitting ? 'scale-[0.99] animate-pulse cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="h-4 w-4 rounded-full border-2 border-white/70 border-t-white animate-spin" />
                                    </>
                                ) : (
                                    'Register'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* OR Divider */}
                    <div className="relative py-4 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative inline-block bg-white px-4 text-gray-500 text-sm">OR</div>
                    </div>

                    {/* Google Sign Up */}
                    <button
                        type="button"
                        className="w-full bg-[#EAF2FD] text-[#3F3F46] py-3 rounded-lg flex items-center justify-center gap-3 hover:bg-[#E0E9F7] transition-colors touch-manipulation min-h-12"
                    >
                        <img src="/assets/icons/google.png" alt="Google icon" className="h-5 w-5" />
                        <span className="text-sm sm:text-base">Sign up with Google</span>
                    </button>

                    {/* Login Link */}
                    <p className="text-center text-gray-600 text-sm sm:text-base pt-2">
                        Already have an Account, Sign in{' '}
                        <a href="/auth/login" className="text-green-700 hover:underline touch-manipulation">
                            here
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
}
