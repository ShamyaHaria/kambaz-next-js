'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, incrementViews } from '../pazzaSlice';
import PostDetailHeader from './PostDetailHeader';
import PostContent from './PostContent';
import FollowUpsList from './FollowUpsList';
import NewFollowUpForm from './NewFollowUpForm';

// Mock post data
const mockPost = {
    _id: '1',
    courseId: 'CS5010',
    title: 'Survey - Code Smells Dataset Feedback',
    content: 'Hello Everyone,\n\nAs part of our ongoing effort to improve the course materials, we\'re collecting feedback on the code smells dataset you used this semester. We\'d like to understand how you engaged with the dataset and whether it helped you learn to identify and remove code smells.\n\nPlease take a few minutes to complete this survey. Your feedback is valuable and will help us improve the dataset for future students.\n\nThank you!',
    author: {
        _id: 'instructor1',
        name: 'Joydeep Mitra',
        role: 'instructor' as const,
    },
    tags: ['hw5'],
    isPinned: true,
    isInstructor: true,
    views: 281,
    likes: 5,
    bookmarked: false,
    starred: false,
    followups: [
        {
            _id: 'f1',
            postId: '1',
            content: 'Thanks for putting this survey together! I found the dataset really helpful for understanding real-world code smells.',
            author: {
                _id: 'student1',
                name: 'John Doe',
                role: 'student' as const,
            },
            isAnswer: false,
            likes: 3,
            createdAt: '2025-11-18T10:00:00Z',
        },
        {
            _id: 'f2',
            postId: '1',
            content: 'I agree! The examples were very practical and helped me identify similar issues in my own code.',
            author: {
                _id: 'student2',
                name: 'Jane Smith',
                role: 'student' as const,
            },
            isAnswer: false,
            likes: 2,
            createdAt: '2025-11-18T11:30:00Z',
        },
    ],
    createdAt: '2025-11-17T10:00:00Z',
    updatedAt: '2025-11-17T10:00:00Z',
};

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const postId = params.postId as string;
    const courseId = params.cid as string;

    const currentPost = useSelector((state: any) => state.pazzaReducer.currentPost);
    const [showFollowUpForm, setShowFollowUpForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use mock data for now
        dispatch(setCurrentPost(mockPost));
        dispatch(incrementViews(postId));
        setLoading(false);

        // Uncomment when backend is ready:
        // fetchPost();
    }, [postId, dispatch]);

    // const fetchPost = async () => {
    //   try {
    //     const response = await pazzaAPI.getPost(postId);
    //     dispatch(setCurrentPost(response.data));
    //     dispatch(incrementViews(postId));
    //   } catch (error) {
    //     console.error('Error fetching post:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const handleBack = () => {
        router.push(`/Courses/${courseId}/Pazza`);
    };

    if (loading || !currentPost) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-gray-500">Loading post...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <PostDetailHeader
                post={currentPost}
                onBack={handleBack}
            />

            <div className="max-w-5xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow">
                    <PostContent post={currentPost} />

                    <div className="border-t border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">
                                {currentPost.followups.length} Followup Discussion{currentPost.followups.length !== 1 ? 's' : ''}
                            </h3>
                            <button
                                onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                {showFollowUpForm ? 'Cancel' : 'Add Followup'}
                            </button>
                        </div>

                        {showFollowUpForm && (
                            <NewFollowUpForm
                                postId={postId}
                                onSuccess={() => {
                                    setShowFollowUpForm(false);
                                }}
                            />
                        )}

                        <FollowUpsList followups={currentPost.followups} postId={postId} />
                    </div>
                </div>
            </div>
        </div>
    );
}