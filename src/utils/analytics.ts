// Google Analytics Configuration
// Replace 'GA_MEASUREMENT_ID' with your actual Google Analytics Measurement ID

export const GA_MEASUREMENT_ID = 'GA_MEASUREMENT_ID'; // Replace with your GA4 Measurement ID

// Google Analytics gtag configuration
export const initGA = () => {
    if (typeof window !== 'undefined' && GA_MEASUREMENT_ID !== 'GA_MEASUREMENT_ID') {
        // Load Google Analytics script
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }
        gtag('js', new Date());
        gtag('config', GA_MEASUREMENT_ID, {
            page_title: document.title,
            page_location: window.location.href,
        });

        // Make gtag available globally
        (window as any).gtag = gtag;
    }
};

// Track page views
export const trackPageView = (url: string, title?: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
            page_title: title || document.title,
        });
    }
};

// Track events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Track custom events
export const trackCustomEvent = (eventName: string, parameters: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', eventName, parameters);
    }
};

// Declare global types
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}
