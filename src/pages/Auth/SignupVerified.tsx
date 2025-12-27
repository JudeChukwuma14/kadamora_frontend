import { useLocation, useNavigate } from 'react-router';

export default function SignupVerified() {
    const navigate = useNavigate();
    const location = useLocation();
    const { message, redirectTo } = (location.state as { message?: string; redirectTo?: string } | null) ?? {};
    const target = redirectTo && redirectTo.startsWith('/') ? redirectTo : '/dashboard';

    return (
        <div className="w-full h-full max-w-md pt-[20%]">
            <img src="/assets/icons/verified.png" alt="Verified" className="h-14 w-14" />
            <h1 className="mt-4 text-3xl sm:text-4xl font-semibold text-secondary">Account Verify Successfully</h1>
            <p className="text-gray-600 mt-2">
                {message ?? 'Your email has been verified. Your account is now active and ready to use.'}
            </p>
            <button
                onClick={() => navigate(target, { replace: true })}
                className="mt-6 px-6 py-3 rounded-lg bg-secondary text-white hover:opacity-95"
            >
                Proceed to Dashboard
            </button>
        </div>
    );
}
