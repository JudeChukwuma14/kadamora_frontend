import { lazy } from 'react';
import type { ComponentType, LazyExoticComponent } from 'react';

// Enhanced lazy loading with better error handling and preloading
export function lazyWithPreload<T extends ComponentType<any>>(
    importFunc: () => Promise<{ default: T }>,
): LazyExoticComponent<T> & { preload: () => Promise<{ default: T }> } {
    const LazyComponent = lazy(importFunc);

    // Add preload method
    (LazyComponent as any).preload = importFunc;

    return LazyComponent as LazyExoticComponent<T> & { preload: () => Promise<{ default: T }> };
}

// Error Boundary for lazy loaded components
import { Component } from 'react';
import type { ReactNode, ErrorInfo } from 'react';

interface LazyErrorBoundaryState {
    hasError: boolean;
    error?: Error;
}

interface LazyErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

export class LazyErrorBoundary extends Component<LazyErrorBoundaryProps, LazyErrorBoundaryState> {
    constructor(props: LazyErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): LazyErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Lazy loading error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                this.props.fallback || (
                    <div className="flex items-center justify-center min-h-[400px] p-8">
                        <div className="text-center space-y-4">
                            <div className="text-6xl">⚠️</div>
                            <h2 className="text-xl font-semibold text-gray-800">Something went wrong</h2>
                            <p className="text-gray-600 max-w-md">
                                We encountered an error loading this page. Please refresh and try again.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                            >
                                Reload Page
                            </button>
                        </div>
                    </div>
                )
            );
        }

        return this.props.children;
    }
}

// Enhanced Page Loader with skeleton
export function EnhancedPageLoader() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Skeleton */}
            <div className="h-20 bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="hidden md:flex space-x-8">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                        ))}
                    </div>
                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>

            {/* Content Skeleton */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Title */}
                    <div className="w-64 h-8 bg-gray-200 rounded animate-pulse"></div>

                    {/* Content blocks */}
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                            <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Loading indicator */}
            <div className="fixed bottom-8 right-8 bg-white rounded-full p-4 shadow-lg">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        </div>
    );
}
