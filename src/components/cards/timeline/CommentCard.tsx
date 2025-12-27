import React from 'react';

interface Comment {
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
}

interface CommentCardProps {
    comment: Comment;
    onMenuClick?: (commentId: number, action: string) => void;
    onLike?: (commentId: number) => void;
    onReply?: (commentId: number) => void;
    formatDate: (timestamp: string) => string;
}

const CommentCard: React.FC<CommentCardProps> = ({ comment, onMenuClick, onLike, onReply, formatDate }) => {
    return (
        <div className="flex gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <img
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                            'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHlsZT0icG9zaXRpb246IGFic29sdXRlOyB0b3A6IDUwJTsgbGVmdDogNTAlOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSI+CjxwYXRoIGQ9Ik0xMiAxMkM5Ljc5IDEyIDggMTAuMjEgOCA4UzkuNzkgNDEyIDNTMTQuMjEgNiAxNiA4VDEyIDEyWk0xMiAxNEMxNi40MiAxNCAyMCAxNi41OCAyMCAyMVYyMkg0VjIxQzQgMTYuNTggNy41OCAxNCAxMiAxNFoiIGZpbGw9IiM5Q0E0QUYiLz4KPC9zdmc+Cjwvc3ZnPgo=';
                    }}
                />
            </div>
            <div className="flex-1">
                <div className="flex items-start">
                    <div>
                        <div className="font-semibold text-base text-secondary">{comment.user.name}</div>
                        <div className="text-xs">{formatDate(comment.date)}</div>
                    </div>
                    <button
                        title="Comment options"
                        aria-label="Comment options"
                        className="ml-auto w-8 h-8 flex items-center justify-center border border-[#D4D4D8] rounded-full hover:bg-gray-100 transition-colors"
                        onClick={() => onMenuClick?.(comment.id, 'menu')}
                    >
                        <svg
                            width="18"
                            height="18"
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
                </div>

                <div className="mt-3 text-[#6E6D6D] text-base leading-relaxed">{comment.content}</div>

                <div className="mt-3 flex items-center justify-between text-sm">
                    {/* Engagement Stats - Same format as post card */}
                    <div className="flex items-center justify-start space-x-1 text-sm text-gray-500">
                        <div className="flex items-center -space-x-1 mr-2">
                            {comment.showLike && (
                                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                    </svg>
                                </div>
                            )}
                            {comment.showHeart && (
                                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <span className="">
                            {comment.likes >= 1000 ? `${(comment.likes / 1000).toFixed(1)}k` : comment.likes}
                        </span>
                        <span>+</span>
                        <span className="">
                            {comment.replies >= 1000 ? `${(comment.replies / 1000).toFixed(1)}k` : comment.replies}
                        </span>
                        <span>Replies</span>
                    </div>

                    <div className="flex items-center text-gray-600">
                        <button className="hover:text-gray-800" onClick={() => onLike?.(comment.id)}>
                            Like
                        </button>
                        <span className="mx-3 inline-block h-4 w-px bg-gray-300" />
                        <button className="hover:text-gray-800" onClick={() => onReply?.(comment.id)}>
                            Reply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;
