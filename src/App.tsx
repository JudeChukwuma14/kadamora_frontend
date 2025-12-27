import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';
import Routes from './routes';
import ScrollToTop from '@components/ScrollToTop';
import './index.css';
import Preloader from '@components/Preloader/Preloader';
import { useGetAccountQuery } from '@store/api/auth.api';
import { useAppSelector } from '@store/hooks';

export default function App() {
    const [isAppLoading, setIsAppLoading] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    /**
     * Fetch account ONLY if user is authenticated
     * This keeps the session alive after refresh
     */
    useGetAccountQuery(undefined, {
        skip: !isAuthenticated,
    });

    /**
     * Handle first app load + preloader
     */
    useEffect(() => {
        const hasLoaded = sessionStorage.getItem('app-loaded');

        if (hasLoaded) {
            setIsFirstLoad(false);
            setIsAppLoading(false);
        } else {
            sessionStorage.setItem('app-loaded', 'true');
        }
    }, []);

    const handleLoadingComplete = () => {
        setIsAppLoading(false);
    };

    /**
     * Show preloader ONLY on first visit
     */
    if (isAppLoading && isFirstLoad) {
        return (
            <Preloader
                onLoadingComplete={handleLoadingComplete}
                minLoadingTime={1500}
            />
        );
    }

    return (
        <HelmetProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Routes />
            </BrowserRouter>
        </HelmetProvider>
    );
}
