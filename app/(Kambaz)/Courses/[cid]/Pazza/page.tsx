'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { setPosts, setStats, setSelectedTags, setCurrentPost, setLoading } from './pazzaSlice';
import { pazzaAPI } from './client';
import PazzaHeader from './PazzaHeader';
import ClassAtGlance from './ClassAtGlance';
import PostsList from './PostsList';
import NewPostModal from './NewPostModal';
import PostDetailView from './PostDetailView';
import PiazzaSetupView from './PiazzaSetupView';
import ResourcesView from './ResourcesView';
import StatisticsView from './StatisticsView';
import ManageFolders from './ManageFolders';

export default function PazzaPage() {
    const params = useParams();
    const courseId = params.cid as string;
    const dispatch = useDispatch();
    const { posts, stats, selectedTags, currentPost, loading } = useSelector((state: any) => state.pazzaReducer);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);
    const [showSetup, setShowSetup] = useState(false);
    const [activePage, setActivePage] = useState<'Q&A' | 'Resources' | 'Statistics' | 'ManageClass'>('Q&A');
    const [showSidebar, setShowSidebar] = useState(true);

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

    const handleTagClick = (tag: string) => {
        setActivePage('Q&A');
        if (selectedTags.includes(tag)) {
            dispatch(setSelectedTags(selectedTags.filter((t: string) => t !== tag)));
        } else {
            dispatch(setSelectedTags([tag]));
        }
    };

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
                onTagClick={handleTagClick}
            />

            { }
            {activePage === 'Q&A' && (
                <div className="max-w-full px-6 py-6">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: showSidebar ? '350px 1fr' : '1fr',
                        gap: '1.5rem',
                        maxWidth: '100%',
                        transition: 'grid-template-columns 0.3s ease'
                    }}>
                        { }
                        {showSidebar && (
                            <div className="bg-white rounded-lg shadow-md border border-gray-200" style={{ position: 'relative' }}>
                                { }
                                <button
                                    onClick={() => setShowSidebar(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '-12px',
                                        zIndex: 10,
                                        background: 'white',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '50%',
                                        width: '28px',
                                        height: '28px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    title="Hide sidebar"
                                >
                                    <ChevronLeft size={18} color="#374151" />
                                </button>

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
                        )}

                        { }
                        <div style={{ position: 'relative' }}>
                            { }
                            {!showSidebar && (
                                <button
                                    onClick={() => setShowSidebar(true)}
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        left: '-12px',
                                        zIndex: 10,
                                        background: 'white',
                                        border: '1px solid #d1d5db',
                                        borderRadius: '50%',
                                        width: '32px',
                                        height: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'all 0.2s'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f3f4f6';
                                        e.currentTarget.style.transform = 'scale(1.1)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'white';
                                        e.currentTarget.style.transform = 'scale(1)';
                                    }}
                                    title="Show sidebar"
                                >
                                    <ChevronRight size={20} color="#374151" />
                                </button>
                            )}

                            {currentPost ? (
                                <PostDetailView
                                    post={currentPost}
                                    onClose={() => dispatch(setCurrentPost(null))}
                                    onUpdate={async () => {
                                        await fetchPosts();
                                        try {
                                            const response = await pazzaAPI.getPost(currentPost._id);
                                            dispatch(setCurrentPost(response.data));
                                        } catch (error) {
                                            console.error('Error refreshing post:', error);
                                        }
                                    }}
                                />
                            ) : (
                                <ClassAtGlance stats={stats} />
                            )}
                        </div>
                    </div>
                </div>
            )}

            { }
            {activePage === 'Resources' && (
                <ResourcesView courseId={courseId} />
            )}

            { }
            {activePage === 'Statistics' && (
                <StatisticsView courseId={courseId} />
            )}

            {/* Manage Class View - ONLY FOR INSTRUCTORS */}
            {activePage === 'ManageClass' && (
                <ManageFolders courseId={courseId} />
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