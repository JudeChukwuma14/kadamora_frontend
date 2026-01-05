// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router';
// import { useGetAccountQuery } from '@store/api/auth.api';
// import { useAppDispatch, useAppSelector } from '@store/hooks';
// import { logout } from '@store/slices/auth.slice';
// import GuardLoader from './GuardLoader';

// interface RedirectIfAuthenticatedProps {
//     children: React.ReactElement;
// }

// type RedirectState = 'idle' | 'checking' | 'redirect';

// export default function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
//     const token = useAppSelector((s) => s.auth.accessToken);
//     const dispatch = useAppDispatch();
//     const [state, setState] = useState<RedirectState>(() => (token ? 'checking' : 'idle'));
//     const { data, isFetching, isLoading, isError, error } = useGetAccountQuery(undefined, { skip: !token });

//     useEffect(() => {
//         if (!token) {
//             setState('idle');
//             return;
//         }
//         if (isLoading || isFetching) {
//             setState('checking');
//             return;
//         }
//         if (data?.data) {
//             setState('redirect');
//             return;
//         }
//         if (isError) {
//             const status = (error as any)?.status;
//             if (status === 401) {
//                 dispatch(logout());
//             }
//             setState('idle');
//             return;
//         }
//         setState('idle');
//     }, [token, isLoading, isFetching, isError, data, error, dispatch]);

//     if (state === 'checking') {
//         return <GuardLoader message="Checking your account..." />;
//     }

//     if (state === 'redirect') {
//         return <Navigate to="/dashboard" replace />;
//     }

//     return children;
// }

import { Navigate } from 'react-router-dom';
import { useGetAccountQuery } from '@store/api/auth.api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '@store/slices/auth.slice';
import GuardLoader from './GuardLoader';

interface RedirectIfAuthenticatedProps {
    children: React.ReactElement;
}

export default function RedirectIfAuthenticated({ children }: RedirectIfAuthenticatedProps) {
    const token = useAppSelector((s) => s.auth.accessToken);
    const dispatch = useAppDispatch();

    const {
        data,
        isLoading,
        isFetching,
        isError,
        error,
    } = useGetAccountQuery(undefined, {
        skip: !token,
    });

    // 🔄 No token → allow page (login/register)
    if (!token) {
        return children;
    }

    // ⏳ Still checking account
    if (isLoading || isFetching) {
        return <GuardLoader message="Checking your account..." />;
    }

    // ❌ Token invalid
    if (isError) {
        if ((error as any)?.status === 401) {
            dispatch(logout());
        }
        return children;
    }

    // ✅ Logged in → redirect
    if (data?.data) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
