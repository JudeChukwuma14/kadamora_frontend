import React from 'react';
import ReactDOM from 'react-dom';

interface ImageViewerProps {
    isOpen: boolean;
    isClosing: boolean;
    images: string[];
    currentIndex: number;
    onClose: () => void;
    onPrevious: () => void;
    onNext: () => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
    isOpen,
    isClosing,
    images,
    currentIndex,
    onClose,
    onPrevious,
    onNext,
}) => {
    if (!isOpen || !images.length) return null;

    const currentImage = images[currentIndex];
    const hasMultipleImages = images.length > 1;

    // Use portal to render outside the normal DOM hierarchy
    return ReactDOM.createPortal(
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/90 transition-opacity duration-200 ${isClosing ? 'animate-fade-out' : 'animate-fade-in'}`}
            onClick={onClose}
        >
            <div className="relative flex items-center justify-center">
                {/* Close button */}
                <button
                    className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                    onClick={onClose}
                    title="Close image viewer"
                    aria-label="Close image viewer"
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                        <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Previous button */}
                {hasMultipleImages && currentIndex > 0 && (
                    <button
                        className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onPrevious();
                        }}
                        title="Previous image"
                        aria-label="Previous image"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Next button */}
                {hasMultipleImages && currentIndex < images.length - 1 && (
                    <button
                        className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            onNext();
                        }}
                        title="Next image"
                        aria-label="Next image"
                    >
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Image */}
                <img
                    src={currentImage}
                    alt={`Image ${currentIndex + 1}`}
                    className={`w-auto h-[400px] md:h-[600px] max-w-[95vw] object-contain transition-all duration-300 ${isClosing ? 'animate-scale-out' : 'animate-scale-in'}`}
                    onClick={(e) => e.stopPropagation()}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                    }}
                />

                {/* Image counter */}
                {hasMultipleImages && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>
        </div>,
        document.body,
    );
};

export default ImageViewer;
