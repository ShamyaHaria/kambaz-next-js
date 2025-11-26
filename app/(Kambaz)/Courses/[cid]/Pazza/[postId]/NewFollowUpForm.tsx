'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFollowUp } from '../pazzaSlice';
import { pazzaAPI } from '../client';

interface NewFollowUpFormProps {
    postId: string;
    onSuccess: () => void;
}

export default function NewFollowUpForm({ postId, onSuccess }: NewFollowUpFormProps) {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [isAnswer, setIsAnswer] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Content is required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await pazzaAPI.createFollowUp(postId, {
                content: content.trim(),
                isAnswer,
            });

            dispatch(addFollowUp({ postId, followup: response.data }));
            setContent('');
            setIsAnswer(false);
            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create followup');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6 border border-gray-300 rounded-lg p-4 bg-gray-50">
            {error && (
                <div className="mb-3 p-2 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                    {error}
                </div>
            )}

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Compose a new followup discussion..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
                required
            />

            <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm">
                    <input
                        type="checkbox"
                        checked={isAnswer}
                        onChange={(e) => setIsAnswer(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Mark as answer</span>
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Posting...' : 'Post Followup'}
                </button>
            </div>
        </form>
    );
}