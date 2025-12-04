'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setStats, setSelectedTags, setCurrentPost, setLoading } from './pazzaSlice';
import { pazzaAPI } from './client';
import PazzaHeader from './PazzaHeader';
import ClassAtGlance from './ClassAtGlance';
import PostsList from './PostsList';
import NewPostModal from './NewPostModal';
import PostDetailView from './PostDetailView';
import PiazzaSetupView from './PiazzaSetupView';
import ResourcesView from './ResourcesView';

export default function PazzaPage() {
    const params = useParams();
    const courseId = params.cid as string;
    const dispatch = useDispatch();

    const { posts, stats, selectedTags, currentPost, loading } = useSelector((state: any) => state.pazzaReducer);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const [activePage, setActivePage] = useState<'Q&A' | 'Resources' | 'Statistics'>('Q&A');

    useEffect(() => {
        if (activePage === 'Q&A') {
            fetchPosts();
            fetchStats();
        }
    }, [courseId, selectedTags, showPinnedOnly, activePage]);

    const fetchPosts = async () => {
        try {
            dispatch(setLoading(true));
            const filters: any = {};
            if (selectedTags.length > 0) filters.tags = selectedTags.join(',');
            if (showPinnedOnly) filters.pinned = true;

            const response = await pazzaAPI.getPosts(courseId, filters);
            dispatch(setPosts(response.data));
        } catch (error) {
            console.error('Error fetching posts:', error);
            dispatch(setPosts([]));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const fetchStats = async () => {
        try {
            const response = await pazzaAPI.getCourseStats(courseId);
            dispatch(setStats(response.data));
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleTagSelect = (tag: string) => {
        if (selectedTags.includes(tag)) {
            dispatch(setSelectedTags(selectedTags.filter((t: string) => t !== tag)));
        } else {
            dispatch(setSelectedTags([...selectedTags, tag]));
        }
    };

    const handlePostSelect = async (post: any) => {
        try {
            await pazzaAPI.incrementView(post._id);
            dispatch(setCurrentPost(post));
        } catch (error) {
            console.error('Error selecting post:', error);
            dispatch(setCurrentPost(post));
        }
    };

    const handleNewPostSuccess = () => {
        setShowNewPostModal(false);
        fetchPosts();
        fetchStats();
    };

    const filteredPosts = posts.filter((post: any) => {
        if (selectedTags.length > 0) {
            return post.tags.some((tag: string) => selectedTags.includes(tag));
        }
        return true;
    });

    // If showing setup view
    if (showSetup) {
        return (
            <div className="min-h-screen bg-gray-50">
                <PiazzaSetupView courseId={courseId} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PazzaHeader
                courseId={courseId}
                onNewPost={() => setShowNewPostModal(true)}
                onShowSetup={() => setShowSetup(true)}
                onLogout={() => setShowSetup(true)}
                activePage={activePage}
                onPageChange={setActivePage}
            />

            {/* Q&A View */}
            {activePage === 'Q&A' && (
                <div className="max-w-full px-6 py-6">
                    <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem', maxWidth: '100%' }}>
                        <div className="bg-white rounded-lg shadow-md border border-gray-200">
                            <PostsList
                                posts={filteredPosts}
                                loading={loading}
                                showPinnedOnly={showPinnedOnly}
                                onTogglePinned={() => setShowPinnedOnly(!showPinnedOnly)}
                                selectedTags={selectedTags}
                                onTagSelect={handleTagSelect}
                                onPostSelect={handlePostSelect}
                                selectedPostId={currentPost?._id}
                            />
                        </div>

                        <div>
                            {currentPost ? (
                                <PostDetailView
                                    post={currentPost}
                                    onClose={() => dispatch(setCurrentPost(null))}
                                    onUpdate={fetchPosts}
                                />
                            ) : (
                                <ClassAtGlance stats={stats} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Resources View */}
            {activePage === 'Resources' && (
                <ResourcesView courseId={courseId} />
            )}

            {/* Statistics View - Placeholder */}
            {activePage === 'Statistics' && (
                <div className="max-w-full px-6 py-6">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">Statistics page coming soon...</p>
                    </div>
                </div>
            )}

            {showNewPostModal && (
                <NewPostModal
                    courseId={courseId}
                    onClose={() => setShowNewPostModal(false)}
                    onSuccess={handleNewPostSuccess}
                />
            )}
        </div>
    );
}