import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Small delay to ensure page content is rendered
        const scrollTimeout = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        }, 0);

        return () => clearTimeout(scrollTimeout);
    }, [pathname]);

    return null;
}

// Alternative instant scroll (without smooth behavior)
export function ScrollToTopInstant() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

// Enhanced scroll to top with options
interface ScrollToTopEnhancedProps {
    smooth?: boolean;
    delay?: number;
}

export function ScrollToTopEnhanced({ smooth = true, delay = 0 }: ScrollToTopEnhancedProps) {
    const { pathname } = useLocation();

    useEffect(() => {
        const scrollTimeout = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: smooth ? 'smooth' : 'auto',
            });
        }, delay);

        return () => clearTimeout(scrollTimeout);
    }, [pathname, smooth, delay]);

    return null;
}
