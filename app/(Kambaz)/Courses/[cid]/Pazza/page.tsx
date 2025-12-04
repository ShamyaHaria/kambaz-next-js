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

export default function PazzaPage() {
    const params = useParams();
    const courseId = params.cid as string;
    const dispatch = useDispatch();

    const { posts, stats, selectedTags, currentPost, loading } = useSelector((state: any) => state.pazzaReducer);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);
    const [showSetup, setShowSetup] = useState(false);

    useEffect(() => {
        fetchPosts();
        fetchStats();
    }, [courseId, selectedTags, showPinnedOnly]);

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
            dispatch(setPosts([])); // Set empty array on error
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
            // Increment view count
            await pazzaAPI.incrementView(post._id);
            dispatch(setCurrentPost(post));
        } catch (error) {
            console.error('Error selecting post:', error);
            dispatch(setCurrentPost(post)); // Still show the post even if view increment fails
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
                activePage="Q&A"
            />

            <div className="max-w-full px-6 py-6">
                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem', maxWidth: '100%' }}>
                    {/* Left Column - Posts List */}
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

                    {/* Right Column - Class at a Glance OR Post Detail */}
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