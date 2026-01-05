import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoEye } from 'react-icons/io5';
import { IoIosEyeOff } from 'react-icons/io';
import { useLoginMutation, type LoginPayload } from '@store/api/auth.api';
import { LoginSEO } from '@components/SEO/SEO';
import { useAppDispatch } from '@store/hooks';
import { setCredentials } from '@store/slices/auth.slice';
import Input from '@components/forms/Input';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch()
    const redirectTo = (location.state as { from?: string } | null)?.from || '/dashboard';
    const [triggerLogin] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload: LoginPayload = {
            email: String(formData.get('email') ?? '')
                .trim()
                .toLowerCase(),
            password: String(formData.get('password') ?? ''),
        };

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const response = await triggerLogin(payload).unwrap();
            const data = response.data;

            if (data.user?.isVerified === false) {
                setErrorMessage('Your email is not verified. Please verify your email before logging in.');
                setIsSubmitting(false);
                return;
            }

            if (!data?.accessToken || !data?.refreshToken) {
                setErrorMessage('Login response is missing credentials. Please try again.');
                return;
            }
            dispatch(
                setCredentials({
                    user: data.user,
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken,
                }),
            );
            navigate(redirectTo, { replace: true });
        } catch (err: any) {
          const message =
            err?.data?.message ||
            err?.error ||
            'Unable to log you in with those details. Please try again.';

        setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <LoginSEO />
            <div className="w-full max-w-md">
                <h1 className="text-[30px] sm:text-3xl lg:text-[50px] font-semibold text-secondary">Welcome back !</h1>
                <p className="text-gray-600 mt-2">
                    Sign in to Kadamora by entering your details below or continue with Google.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    {errorMessage ? (
                        <div
                            role="alert"
                            className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600"
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

                    <div className="relative">
                        <Input
                            id="password"
                            name="password"
                            title="Password"
                            placeholder="Enter your password"
                            type={showPassword ? 'text' : 'password'}
                            required
                            autoComplete="current-password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((s) => !s)}
                            className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-gray-500 hover:text-gray-700"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                            {/* Simple eye glyph to avoid external asset dependency */}
                            <span className="text-lg" aria-hidden>
                                {showPassword ? <IoIosEyeOff /> : <IoEye />}
                            </span>
                        </button>
                    </div>

                    <div className="flex justify-end">
                        <a href="/auth/forgot-password" className="text-green-700 hover:underline">
                            Forget Password ?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-secondary text-white py-3 rounded-lg hover:opacity-95 transition-all font-medium flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed ${
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
                            'Login'
                        )}
                    </button>

                    {/* OR Divider */}
                    <div className="relative py-3 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#E4E4E7]" />
                        </div>
                        <div className="relative inline-block bg-white px-3 font-bold-">OR</div>
                    </div>

                    <button
                        type="button"
                        className="w-full  bg-[#CCE3FD] py-3 rounded-lg flex items-center justify-center gap-3"
                        title="Sign in with Google"
                    >
                        <img src="/assets/icons/google.png" alt="Google icon" className="h-5 w-5" />
                        <span className="font-medium">Sign in with Google</span>
                    </button>

                    <p className="text-center text-gray-600">
                        Don’t have an Account, Sign up{' '}
                        <a href="/auth/signup" className="text-green-700 hover:underline">
                            here
                        </a>
                    </p>
                </form>
            </div>
        </>
    );
}
