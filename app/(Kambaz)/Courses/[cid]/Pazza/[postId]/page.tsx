'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPost, incrementViews } from '../pazzaSlice';
import { pazzaAPI } from '../client';
import PostDetailHeader from './PostDetailHeader';
import PostContent from './PostContent';
import FollowUpsList from './FollowUpsList';
import NewFollowUpForm from './NewFollowUpForm';

export default function PostDetailPage() {
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();

    const postId = params.postId as string;
    const courseId = params.cid as string;

    const { currentPost, loading } = useSelector((state: any) => state.pazzaReducer);
    const [showFollowUpForm, setShowFollowUpForm] = useState(false);

    useEffect(() => {
        fetchPost();
    }, [postId]);

    const fetchPost = async () => {
        try {
            const response = await pazzaAPI.getPost(postId);
            dispatch(setCurrentPost(response.data));
            dispatch(incrementViews(postId));
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };

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
                                {currentPost.followups.length} Followup Discussions
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
                                    fetchPost();
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