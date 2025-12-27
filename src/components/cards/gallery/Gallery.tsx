import { fakeDb } from '@components/fakeDB/fakeDb';
import { useState, useRef, useEffect } from 'react';
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md';

export default function Gallery() {
    // Use the unified media array directly from fakeDb
    const media = fakeDb.propertyMedia?.find((m) => m.listingId === 1);
    const galleryMedia = media?.media || [];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [direction, setDirection] = useState<'left' | 'right'>('right');
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const thumbsContainerRef = useRef<HTMLDivElement | null>(null);
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const currentMedia = galleryMedia[currentIndex];

    // Scroll thumbnail into view when currentIndex changes
    useEffect(() => {
        if (thumbRefs.current[currentIndex]) {
            thumbRefs.current[currentIndex]?.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [currentIndex]);

    if (!currentMedia) return null;

    // Animation classes for main media
    const mainAnim = animating
        ? direction === 'right'
            ? 'animate-fade-slide-in-right'
            : 'animate-fade-slide-in-left'
        : '';

    return (
        <div className="lg:sticky lg:top-24 lg:self-start bg-white p-4 rounded-lg shadow-border">
            {/* Main Media */}
            <div className={`relative mb-4 flex items-center justify-center`}>
                {/* Main media with animation */}
                <div className={`w-full h-[240px] md:h-90 ${mainAnim} transition-all duration-500`}>
                    {currentMedia.mediaType === 'video' && !showVideo ? (
                        <div className="relative w-full h-full">
                            <img
                                src={currentMedia.thumbnail}
                                alt={currentMedia.title || 'Video thumbnail'}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button
                                    onClick={() => setShowVideo(true)}
                                    className="bg-white/80 rounded-full p-4 hover:bg-white shadow"
                                    aria-label="Play property video"
                                    title="Play video"
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="20" cy="20" r="20" fill="#17C964" />
                                        <path d="M16 13L28 20L16 27V13Z" fill="white" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ) : currentMedia.mediaType === 'video' && showVideo ? (
                        <video
                            key={currentMedia.id}
                            controls
                            autoPlay
                            poster={currentMedia.thumbnail}
                            onEnded={() => setShowVideo(false)}
                            className="w-full h-full object-cover rounded-lg"
                        >
                            <source src={currentMedia.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : currentMedia.mediaType === 'image' ? (
                        <img
                            src={currentMedia.url}
                            alt="Property main view"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : null}
                </div>

                {/* Navigation arrows for all media */}
                {galleryMedia.length > 1 && (
                    <>
                        <button
                            onClick={() => {
                                if (animating) return;
                                setDirection('left');
                                setAnimating(true);
                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                timeoutRef.current = setTimeout(() => setAnimating(false), 500);
                                const prev = currentIndex === 0 ? galleryMedia.length - 1 : currentIndex - 1;
                                setCurrentIndex(prev);
                                setShowVideo(false);
                            }}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-transform duration-200 active:scale-90"
                            aria-label="Previous media"
                            title="Previous media"
                        >
                            <MdArrowBackIosNew className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={() => {
                                if (animating) return;
                                setDirection('right');
                                setAnimating(true);
                                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                                timeoutRef.current = setTimeout(() => setAnimating(false), 500);
                                const next = currentIndex === galleryMedia.length - 1 ? 0 : currentIndex + 1;
                                setCurrentIndex(next);
                                setShowVideo(false);
                            }}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-90 transition-transform duration-200 active:scale-90"
                            aria-label="Next media"
                            title="Next media"
                        >
                            <MdArrowForwardIos className="w-6 h-6 text-gray-700" />
                        </button>
                    </>
                )}

                {/* Close video */}
                {currentMedia.mediaType === 'video' && showVideo && (
                    <button
                        onClick={() => setShowVideo(false)}
                        className="absolute top-3 right-3 bg-white/90 rounded-full px-2 py-1 text-sm hover:bg-white"
                        aria-label="Close video"
                        title="Close video"
                    >
                        ✕
                    </button>
                )}
            </div>
            {/* Thumbnails (all media) - horizontal scrollable row */}
            <div ref={thumbsContainerRef} className="flex gap-2 overflow-x-auto pb-2 pt-2 h-[115px]">
                {galleryMedia.map((m, idx) => (
                    <button
                        key={m.id}
                        ref={(el) => {
                            thumbRefs.current[idx] = el;
                        }}
                        onClick={() => {
                            if (animating || idx === currentIndex) return;
                            setDirection(idx > currentIndex ? 'right' : 'left');
                            setAnimating(true);
                            if (timeoutRef.current) clearTimeout(timeoutRef.current);
                            timeoutRef.current = setTimeout(() => setAnimating(false), 500);
                            setCurrentIndex(idx);
                            setShowVideo(false);
                        }}
                        className={`cursor-pointer relative flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden group transition-all duration-300 ${idx === currentIndex ? 'ring-2 ring-primary scale-105 opacity-100 z-10' : 'opacity-70 hover:opacity-100'}`}
                        aria-label={m.mediaType === 'video' ? `Play ${m.title || 'video'}` : `View image`}
                        title={m.mediaType === 'video' ? m.title || 'Video' : 'Image'}
                        style={{ zIndex: idx === currentIndex ? 2 : 1 }}
                    >
                        <img
                            src={m.thumbnail}
                            alt={m.mediaType === 'video' ? m.title || 'Video' : 'Image'}
                            className="w-full h-full object-cover transition-transform duration-300"
                        />
                        {/* Show play overlay on video thumbnails only if not currently playing that video */}
                        {m.mediaType === 'video' && !(currentMedia.id === m.id && showVideo) && (
                            <span className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-white/80 rounded-full p-2 group-hover:bg-white">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle cx="10" cy="10" r="10" fill="#17C964" />
                                        <path d="M7.5 5.5L15 10L7.5 14.5V5.5Z" fill="white" />
                                    </svg>
                                </span>
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}
