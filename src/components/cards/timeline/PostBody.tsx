import React from 'react';

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

interface PostBodyProps {
    post: TimelinePost;
    liked: boolean;
    likeCount: number;
    onLike: () => void;
    onOpenModal?: () => void; // if provided, engagement stats becomes clickable
    onImageClick?: (imageIndex: number) => void; // if provided, images become clickable
    paddingX?: boolean; // add horizontal padding when rendered in the main card
}

// Reusable body of the post used both in the card and inside the modal
const PostBody: React.FC<PostBodyProps> = ({
    post,
    liked,
    likeCount,
    onLike,
    onOpenModal,
    onImageClick,
    paddingX = true,
}) => {
    const px = paddingX ? 'px-6' : '';

    return (
        <>
            {/* Content */}
            <div className={`${px} pt-2 pb-4 text-[#6E6D6D] text-base leading-relaxed font-normal`}>{post.content}</div>

            {/* Image(s) */}
            {post.images && post.images.length > 0 ? (
                <div className="w-full mb-4">
                    {post.images.length === 1 ? (
                        <img
                            src={post.images[0]}
                            alt="Post content"
                            className={`w-full max-h-[400px] object-cover object-center ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                            onClick={() => onImageClick?.(0)}
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                            }}
                        />
                    ) : post.images.length === 2 ? (
                        <div className="grid grid-cols-2 gap-1">
                            {post.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Post content ${index + 1}`}
                                    className={`w-full h-[300px] object-cover object-center ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                                    onClick={() => onImageClick?.(index)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            ))}
                        </div>
                    ) : post.images.length === 3 ? (
                        <div className="grid grid-cols-2 gap-1 h-[500px]">
                            <img
                                src={post.images[0]}
                                alt="Post content 1"
                                className={`w-full h-full object-cover object-center ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                                onClick={() => onImageClick?.(0)}
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <div className="grid grid-rows-2 gap-1">
                                {post.images.slice(1, 3).map((img, index) => (
                                    <img
                                        key={index + 1}
                                        src={img}
                                        alt={`Post content ${index + 2}`}
                                        className={`w-full h-[250px] object-cover object-center ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                                        onClick={() => onImageClick?.(index + 1)}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-1 h-[400px]">
                            {post.images.slice(0, 3).map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Post content ${index + 1}`}
                                    className={`w-full h-full object-cover object-center ${index === 0 ? 'row-span-2' : ''} ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                                    onClick={() => onImageClick?.(index)}
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.style.display = 'none';
                                    }}
                                />
                            ))}
                            {post.images.length > 4 && (
                                <div
                                    className={`relative ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                                    onClick={() => onImageClick?.(3)}
                                >
                                    <img
                                        src={post.images[3]}
                                        alt="Post content 4"
                                        className="w-full h-full object-cover object-center"
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                        <span className="text-white text-xl font-semibold">
                                            +{post.images.length - 4}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ) : post.image ? (
                <div className="w-full mb-4">
                    <img
                        src={post.image}
                        alt="Post content"
                        className={`w-full max-h-[300px] object-cover object-center ${onImageClick ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                        onClick={() => onImageClick?.(0)}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                        }}
                    />
                </div>
            ) : null}

            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                {/* Engagement Stats */}
                <div
                    className={`${px} md:flex-1 mb-[10px] md:mb-0 ${onOpenModal ? 'cursor-pointer' : ''}`}
                    onClick={onOpenModal}
                >
                    <div className="flex items-center justify-start space-x-1 text-sm text-gray-500">
                        <div className="flex items-center -space-x-1 mr-2">
                            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </div>
                            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                                </svg>
                            </div>
                        </div>
                        <span className="">{likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}k` : likeCount}</span>
                        <span>+</span>
                        <span className="">
                            {post.comments.length >= 1000
                                ? `${(post.comments.length / 1000).toFixed(1)}k`
                                : post.comments.length}
                        </span>
                        <span>Comments</span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className={`${px} pb-3 md:py-3 md:flex-1 md:pl-6`}>
                    <div className="flex items-center justify-between w-full space-x-2">
                        <button
                            onClick={onLike}
                            className={`flex items-center justify-center flex-1 py-2 px-4 rounded-full text-sm transition-all duration-200 ${
                                liked ? 'text-blue-600 bg-blue-50 hover:bg-blue-100' : 'bg-[#e6f1fe]'
                            }`}
                        >
                            <svg
                                className="w-5 h-5 mr-2"
                                fill={liked ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                                />
                            </svg>
                            Like
                        </button>

                        <button className="flex items-center justify-center flex-1 py-2 px-4 rounded-full text-sm bg-[#e6f1fe]  transition-all duration-200">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            Comment
                        </button>

                        <button className="flex items-center justify-center flex-1 py-2 px-4 rounded-full text-sm bg-[#e6f1fe] transition-all duration-200">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                />
                            </svg>
                            Repost
                        </button>

                        <button className="flex items-center justify-center flex-1 py-2 px-4 rounded-full text-sm bg-[#e6f1fe] transition-all duration-200">
                            <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                />
                            </svg>
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostBody;
