import TimelineCard from '@components/cards/timeline/TimelineCard';
import LandingPageContainer from '@components/container/LandingPage/LandingPageContainer';
import { fakeDb } from '@components/fakeDB/fakeDb';
import { TimelineSEO } from '@components/SEO/SEO';
import React, { useState } from 'react';

const Timeline: React.FC = () => {
    const [posts, setPosts] = useState(fakeDb.timelinePosts);
    const filterType: string = 'all';
    const searchTerm: string = '';

    const handleClose = (id: number) => {
        setPosts((prev) => prev.filter((post) => post.id !== id));
    };

    const filteredPosts = posts.filter((post) => {
        const matchesFilter = filterType === 'all' || post.type === filterType;
        const matchesSearch =
            searchTerm === '' ||
            post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.user.role.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesFilter && matchesSearch;
    });

    return (
        <>
            <TimelineSEO />
            <LandingPageContainer>
                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Timeline 2-column Layout */}
                        <div className="flex flex-col md:flex-row gap-6 py-8">
                            {/* Left: Posts */}
                            <div className="w-full md:max-w-2xl">
                                {/* Posts */}
                                {filteredPosts.length > 0 ? (
                                    filteredPosts.map((post:any) => (
                                        <TimelineCard key={post.id} post={post} onClose={() => handleClose(post.id)} />
                                    ))
                                ) : (
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <svg
                                                className="w-16 h-16 mx-auto"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                                    </div>
                                )}

                                {/* Load More Button */}
                                {filteredPosts.length > 0 && (
                                    <div className="text-center mt-8">
                                        <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                            Load More Posts
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Right: Empty Card/Box */}
                            <div className="hidden md:block w-full max-w-xs">
                                {/* <div className="bg-white rounded-2xl border border-gray-200 shadow-sm min-h-[250px] h-full"></div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </LandingPageContainer>
        </>
    );
};

export default Timeline;
