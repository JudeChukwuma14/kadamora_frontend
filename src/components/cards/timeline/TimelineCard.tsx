import React, { useState } from 'react';
import CommentCard from './CommentCard';
import ImageViewer from './ImageViewer';
import PostBody from './PostBody';
import Modal from './Modal';

interface TimelinePost {
    id: number;
    user: {
        name: string;
        avatar: string;
        role: string;
    };
    content: string;
    timestamp: string;
    likes: number;
    comments: {
        id: number;
        user: {
            name: string;
            avatar: string;
        };
        date: string;
        content: string;
        likes: number;
        replies: number;
        showLike: boolean;
        showHeart: boolean;
    }[];
    shares: number;
    image?: string;
    images?: string[];
    type: string;
}

interface TimelineCardProps {
    post: TimelinePost;
    onClose?: () => void;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ post, onClose }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);
    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [isModalClosing, setIsModalClosing] = useState(false);
    const [showImageViewer, setShowImageViewer] = useState(false);
    const [isImageViewerClosing, setIsImageViewerClosing] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const menuRef = React.useRef<HTMLDivElement>(null);

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(liked ? likeCount - 1 : likeCount + 1);
    };

    const handleCloseModal = () => {
        setIsModalClosing(true);
        setTimeout(() => {
            setShowModal(false);
            setIsModalClosing(false);
        }, 200); // Match the animation duration
    };

    const handleCloseImageViewer = () => {
        setIsImageViewerClosing(true);
        setTimeout(() => {
            setShowImageViewer(false);
            setIsImageViewerClosing(false);
        }, 200);
    };

    const handleImageClick = (imageIndex: number) => {
        setCurrentImageIndex(imageIndex);
        setShowImageViewer(true);
    };

    const handleNextImage = () => {
        const allImages = post.images || (post.image ? [post.image] : []);
        if (currentImageIndex < allImages.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
        }
    };

    const handlePreviousImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    const handleTimelineClick = (e: React.MouseEvent) => {
        // Don't open modal if clicking on interactive elements
        const target = e.target as HTMLElement;
        if (
            target.tagName === 'BUTTON' ||
            target.tagName === 'A' ||
            target.closest('button') ||
            target.closest('a') ||
            target.closest('[role="button"]')
        ) {
            return;
        }
        setShowModal(true);
    };

    // Format date as '16 June, 2025'
    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });
    };

    React.useEffect(() => {
        if (!showMenu) return;
        function handleClick(e: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [showMenu]);

    const handleMenuClick = (action: string) => {
        setShowMenu(false);
        if (action === 'Report') {
            alert('Reported!');
        } else if (action === 'Block') {
            alert('Blocked!');
        }
    };

    // Comment interaction handlers
    const handleCommentMenuClick = (commentId: number, action: string) => {
        console.log(`Comment ${commentId} action: ${action}`);
        // Handle comment menu actions here
    };

    const handleCommentLike = (commentId: number) => {
        console.log(`Liked comment ${commentId}`);
        // Handle comment like here
    };

    const handleCommentReply = (commentId: number) => {
        console.log(`Reply to comment ${commentId}`);
        // Handle comment reply here
    };

    // Sample comments to display in the modal as per design
    const comments = post.comments || [];

    return (
        <div
            className={`bg-white rounded-2xl mb-8 overflow-hidden shadow-border cursor-pointer ${
                !showModal ? 'hover:shadow-lg hover:bg-gray-50' : ''
            }`}
            onClick={handleTimelineClick}
        >
            {/* Header */}
            <div className="flex items-center px-6 pt-6 pb-2">
                <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-3">
                    <img
                        src={post.user.avatar}
                        alt={post.user.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                                'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSI+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNDEyIDNTMTQuMjEgNiAxNiA4VDEyIDEyWk0xMiAxNEMxNi40MiAxNCAyMCAxNi41OCAyMCAyMVYyMkg0VjIxQzQgMTYuNTggNy41OCAxNCAxMiAxNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-base text-gray-800 truncate">{post.user.name}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{formatDate(post.timestamp)}</div>
                </div>
                <div className="flex items-center space-x-2" ref={menuRef}>
                    <div className="relative">
                        <button
                            title="More options"
                            className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                            onClick={() => setShowMenu((v) => !v)}
                        >
                            <svg
                                width="20"
                                height="20"
                                fill="none"
                                stroke="currentColor"
                                className="text-gray-400"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="5" cy="12" r="2" />
                                <circle cx="12" cy="12" r="2" />
                                <circle cx="19" cy="12" r="2" />
                            </svg>
                        </button>
                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMenuClick('Report')}
                                >
                                    Report
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => handleMenuClick('Block')}
                                >
                                    Block
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        title="Close"
                        className="w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                        onClick={onClose}
                    >
                        <svg
                            width="20"
                            height="20"
                            fill="none"
                            stroke="currentColor"
                            className="text-gray-400"
                            viewBox="0 0 24 24"
                        >
                            <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2" strokeLinecap="round" />
                            <line x1="6" y1="18" x2="18" y2="6" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Reused post body */}
            <PostBody
                post={post}
                liked={liked}
                likeCount={likeCount}
                onLike={handleLike}
                onOpenModal={() => setShowModal(true)}
                onImageClick={handleImageClick}
                paddingX
            />

            {/* Modal for post details and comments */}
            <Modal isOpen={showModal} isClosing={isModalClosing} title={post.user.name} onClose={handleCloseModal}>
                <div className="p-8">
                    {/* Post Header (avatar, name, date) */}
                    <div className="flex items-center mb-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-3">
                            <img
                                src={post.user.avatar}
                                alt={post.user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSI+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNDEyIDNTMTQuMjEgNiAxNiA4VDEyIDEyWk0xMiAxNEMxNi40MiAxNCAyMCAxNi41OCAyMCAyMVYyMkg0VjIxQzQgMTYuNTggNy41OCAxNCAxMiAxNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                                }}
                            />
                        </div>
                        <div>
                            <div className="font-semibold text-base text-gray-800">{post.user.name}</div>
                            <div className="text-xs text-gray-500">{formatDate(post.timestamp)}</div>
                        </div>
                    </div>

                    {/* Reuse the existing post body inside modal (non-clickable stats, no extra x-padding) */}
                    <PostBody
                        post={post}
                        liked={liked}
                        likeCount={likeCount}
                        onLike={handleLike}
                        onImageClick={handleImageClick}
                        paddingX={false}
                    />

                    {/* Recent Comments */}
                    <div className="mt-6">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Comment</h3>
                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <CommentCard
                                    key={comment.id}
                                    comment={comment}
                                    onMenuClick={handleCommentMenuClick}
                                    onLike={handleCommentLike}
                                    onReply={handleCommentReply}
                                    formatDate={formatDate}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comment composer */}
                <div className="mt-4 sticky bottom-0 bg-white p-4 border-t border-gray-200">
                    <div className="flex gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                            <img
                                src={post.user.avatar}
                                alt={post.user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src =
                                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSI+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNDEyIDNTMTQuMjEgNiAxNiA4VDEyIDEyWk0xMiAxNEMxNi40MiAxNCAyMCAxNi41OCAyMCAyMVYyMkg0VjIxQzQgMTYuNTggNy41OCAxNCAxMiAxNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                                }}
                            />
                        </div>
                        <div className="flex-1 bg-gray-50 rounded-2xl p-4 border border-[#E4E4E7]">
                            <textarea
                                placeholder="Comment here ..."
                                rows={2}
                                className="w-full bg-transparent placeholder:text-gray-400 outline-none resize-none text-base"
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'auto';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />

                            <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center gap-4">
                                    <button
                                        title="Add"
                                        aria-label="Add attachment"
                                        className="p-2 hover:text-gray-600 transition-colors bg-[#F4F4F4] "
                                    >
                                        <img src="assets/icons/plus.png" alt="Add" width="20" height="20" className="" />
                                    </button>
                                    <button
                                        title="Emoji"
                                        aria-label="Insert emoji"
                                        className="p-1 hover:text-gray-600 transition-colors"
                                    >
                                        <img src="assets/icons/emoji.png" alt="Emoji" width="20" height="20" className="" />
                                    </button>
                                    <button
                                        title="Mention"
                                        aria-label="Mention someone"
                                        className="p-1 hover:text-gray-600 transition-colors"
                                    >
                                        <img
                                            src="assets/icons/mention.png"
                                            alt="Mention"
                                            width="20"
                                            height="20"
                                            className=""
                                        />
                                    </button>
                                    <button
                                        title="Video"
                                        aria-label="Add video"
                                        className="p-1 hover:text-gray-600 transition-colors"
                                    >
                                        <img src="assets/icons/video.png" alt="Video" width="20" height="20" className="" />
                                    </button>
                                    <button
                                        title="Voice"
                                        aria-label="Add voice message"
                                        className="p-1 hover:text-gray-600 transition-colors"
                                    >
                                        <img
                                            src="assets/icons/microphone.png"
                                            alt="Microphone"
                                            width="20"
                                            height="20"
                                            className=""
                                        />
                                    </button>
                                    <button
                                        title="Document"
                                        aria-label="Add document"
                                        className="p-1 hover:text-gray-600 transition-colors"
                                    >
                                        <img
                                            src="assets/icons/document.png"
                                            alt="Document"
                                            width="20"
                                            height="20"
                                            className=""
                                        />
                                    </button>
                                </div>
                                <button
                                    className="h-10 px-6 bg-[#43CC88] rounded-full flex items-center gap-2 text-white hover:bg-green-600 transition-colors font-medium"
                                    title="Send comment"
                                    aria-label="Send comment"
                                >
                                    <span>Send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

            {/* Image Viewer */}
            {showImageViewer && (
                <ImageViewer
                    isOpen={showImageViewer}
                    isClosing={isImageViewerClosing}
                    images={post.images || (post.image ? [post.image] : [])}
                    currentIndex={currentImageIndex}
                    onClose={handleCloseImageViewer}
                    onNext={handleNextImage}
                    onPrevious={handlePreviousImage}
                />
            )}
        </div>
    );
};

export default TimelineCard;
