'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts, setStats, setSelectedTags, setCurrentPost } from './pazzaSlice';
import PazzaHeader from './PazzaHeader';
import ClassAtGlance from './ClassAtGlance';
import PostsList from './PostsList';
import NewPostModal from './NewPostModal';
import PostDetailView from './PostDetailView';
import PiazzaSetupView from './PiazzaSetupView';

// Mock data for testing
const mockStats = {
    totalPosts: 800,
    totalContributions: 2463,
    studentsEnrolled: 373,
    unreadPosts: 145,
    unansweredQuestions: 22,
    unansweredFollowups: 200,
    instructorResponses: 670,
    studentResponses: 93,
};

const mockPosts = [
    {
        _id: '1',
        courseId: 'CS5010',
        title: 'Survey - Code Smells Dataset Feedback',
        content: 'Hello Everyone, As part of our ongoing effort to improve the course materials, we\'re collecting feedback on the code smells dataset you used this semester. We\'d like to understand how you engaged with the dataset and whether it helped you learn to identify and remove code smells.',
        author: {
            _id: 'instructor1',
            name: 'Joydeep Mitra',
            role: 'instructor' as const,
        },
        tags: ['hw5'],
        isPinned: true,
        isInstructor: true,
        views: 281,
        likes: 0,
        bookmarked: false,
        starred: false,
        followups: [],
        createdAt: '2025-11-17T10:00:00Z',
        updatedAt: '2025-11-17T10:00:00Z',
    },
    {
        _id: '2',
        courseId: 'CS5010',
        title: 'Self Review Clarification',
        content: 'Hello All, Please note the following in the self review for hw5: If you cannot tag the md file, simply mark the interf',
        author: {
            _id: 'instructor1',
            name: 'Joydeep Mitra',
            role: 'instructor' as const,
        },
        tags: ['hw5'],
        isPinned: true,
        isInstructor: true,
        views: 156,
        likes: 5,
        bookmarked: false,
        starred: false,
        followups: [
            {
                _id: 'f1',
                postId: '2',
                content: 'Thanks for the clarification!',
                author: {
                    _id: 'student1',
                    name: 'John Doe',
                    role: 'student' as const,
                },
                isAnswer: false,
                likes: 2,
                createdAt: '2025-11-17T11:00:00Z',
            }
        ],
        createdAt: '2025-11-14T09:00:00Z',
        updatedAt: '2025-11-14T09:00:00Z',
    },
    {
        _id: '3',
        courseId: 'CS5010',
        title: 'Code walk 3 signup',
        content: 'Code walk assignments.xlsx Please sign up for a slot for code walk 3! Note: there was considerable chaos for code walk',
        author: {
            _id: 'instructor1',
            name: 'Joydeep Mitra',
            role: 'instructor' as const,
        },
        tags: ['code_walks'],
        isPinned: true,
        isInstructor: true,
        views: 198,
        likes: 3,
        bookmarked: false,
        starred: false,
        followups: [
            {
                _id: 'f2',
                postId: '3',
                content: 'I signed up for slot 3',
                author: {
                    _id: 'student2',
                    name: 'Jane Smith',
                    role: 'student' as const,
                },
                isAnswer: false,
                likes: 0,
                createdAt: '2025-11-12T14:00:00Z',
            },
            {
                _id: 'f3',
                postId: '3',
                content: 'All slots are now full',
                author: {
                    _id: 'instructor1',
                    name: 'Joydeep Mitra',
                    role: 'instructor' as const,
                },
                isAnswer: true,
                likes: 8,
                createdAt: '2025-11-12T16:00:00Z',
            }
        ],
        createdAt: '2025-11-12T08:00:00Z',
        updatedAt: '2025-11-12T16:00:00Z',
    },
    {
        _id: '4',
        courseId: 'CS5010',
        title: 'The Tests for A4',
        content: 'Class, here are the input files with expected output that we used to test your program in Assignment 4. Before submittin',
        author: {
            _id: 'instructor1',
            name: 'Joydeep Mitra',
            role: 'instructor' as const,
        },
        tags: ['hw4'],
        isPinned: true,
        isInstructor: true,
        views: 245,
        likes: 12,
        bookmarked: false,
        starred: false,
        followups: [],
        createdAt: '2025-11-11T10:00:00Z',
        updatedAt: '2025-11-11T10:00:00Z',
    },
    {
        _id: '5',
        courseId: 'CS5010',
        title: 'Question about assignment 4 deadline',
        content: 'Hi, I was wondering if we could get an extension on assignment 4? I\'m having trouble with one of the edge cases.',
        author: {
            _id: 'student3',
            name: 'Mike Johnson',
            role: 'student' as const,
        },
        tags: ['hw4', 'logistics'],
        isPinned: false,
        isInstructor: false,
        views: 89,
        likes: 3,
        bookmarked: false,
        starred: false,
        followups: [
            {
                _id: 'f4',
                postId: '5',
                content: 'The deadline is firm, but office hours are available to help with edge cases.',
                author: {
                    _id: 'ta1',
                    name: 'Sarah Williams',
                    role: 'ta' as const,
                },
                isAnswer: true,
                likes: 5,
                createdAt: '2025-11-10T15:00:00Z',
            }
        ],
        createdAt: '2025-11-10T14:00:00Z',
        updatedAt: '2025-11-10T15:00:00Z',
    },
];

export default function PazzaPage() {
    const params = useParams();
    const courseId = params.cid as string;
    const dispatch = useDispatch();

    const { posts, stats, selectedTags, currentPost } = useSelector((state: any) => state.pazzaReducer);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [showPinnedOnly, setShowPinnedOnly] = useState(false);
    const [showSetup, setShowSetup] = useState(false);

    useEffect(() => {
        // Load mock data
        dispatch(setPosts(mockPosts));
        dispatch(setStats(mockStats));
    }, [courseId, dispatch]);

    const handleTagSelect = (tag: string) => {
        if (selectedTags.includes(tag)) {
            dispatch(setSelectedTags(selectedTags.filter((t: string) => t !== tag)));
        } else {
            dispatch(setSelectedTags([...selectedTags, tag]));
        }
    };

    const handlePostSelect = (post: any) => {
        dispatch(setCurrentPost(post));
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
            />

            <div className="max-w-full px-6 py-6">
                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '1.5rem', maxWidth: '100%' }}>
                    {/* Left Column - Posts List */}
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        <PostsList
                            posts={filteredPosts}
                            loading={false}
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
                    onSuccess={() => setShowNewPostModal(false)}
                />
            )}
        </div>
    );
}