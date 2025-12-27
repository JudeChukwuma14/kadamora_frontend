import { useEffect, useState } from 'react';
import './preloader.css';

interface PreloaderProps {
    onLoadingComplete?: () => void;
    minLoadingTime?: number;
}

export default function Preloader({ onLoadingComplete, minLoadingTime = 2000 }: PreloaderProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        // Minimum loading time
        const loadingTimer = setTimeout(() => {
            setProgress(100);
            setTimeout(() => {
                setIsLoading(false);
                onLoadingComplete?.();
            }, 500);
        }, minLoadingTime);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(loadingTimer);
        };
    }, [minLoadingTime, onLoadingComplete]);

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-gray-50 to-white">
            {/* Main Container */}
            <div className="flex flex-col items-center space-y-8">
                {/* Logo Animation Container */}
                <div className="relative">
                    {/* Spinning Ring */}
                    <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-primary border-r-primary rounded-full animate-spin"></div>

                    {/* Pulsing Ring */}
                    <div className="absolute inset-2 w-20 h-20 border-2 border-primary/30 rounded-full animate-pulse"></div>

                    {/* Logo */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <img
                            src="/assets/logo/logo-small.png"
                            alt="Kadamora"
                            className="w-12 h-12 object-contain animate-pulse"
                        />
                    </div>

                    {/* Floating Dots */}
                    <div className="absolute -top-2 -right-2 w-2 h-2 bg-primary rounded-full bounce-delay-0"></div>
                    <div className="absolute -top-2 -left-2 w-2 h-2 bg-primary rounded-full bounce-delay-1"></div>
                    <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-primary rounded-full bounce-delay-2"></div>
                    <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-primary rounded-full bounce-delay-3"></div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-3">
                    <h2 className="text-2xl font-bold text-gray-800 animate-fade-in">Kadamora</h2>
                    <p className="text-gray-600 animate-fade-in-delay">Loading your experience...</p>
                </div>

                {/* Progress Bar */}
                <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-primary to-green-500 rounded-full progress-bar-transition"
                        data-progress={Math.min(progress, 100)}
                        ref={(el) => {
                            if (el) {
                                el.style.width = `${Math.min(progress, 100)}%`;
                            }
                        }}
                    ></div>
                </div>

                {/* Progress Text */}
                <p className="text-sm text-gray-500 font-medium">{Math.round(Math.min(progress, 100))}%</p>
            </div>

            {/* Background Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full animate-float"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full animate-float-delayed"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
}
