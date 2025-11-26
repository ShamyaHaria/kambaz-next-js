'use client';

import { ThumbsUp, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pazzaAPI } from '../client';
import { useState } from 'react';

interface FollowUp {
    _id: string;
    postId: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    isAnswer: boolean;
    likes: number;
    createdAt: string;
}

interface FollowUpsListProps {
    followups: FollowUp[];
    postId: string;
}

export default function FollowUpsList({ followups, postId }: FollowUpsListProps) {
    const [likedFollowups, setLikedFollowups] = useState<Set<string>>(new Set());

    const handleLikeFollowup = async (followupId: string) => {
        try {
            await pazzaAPI.likeFollowUp(postId, followupId);
            setLikedFollowups(prev => {
                const newSet = new Set(prev);
                if (newSet.has(followupId)) {
                    newSet.delete(followupId);
                } else {
                    newSet.add(followupId);
                }
                return newSet;
            });
        } catch (error) {
            console.error('Error liking followup:', error);
        }
    };

    const getTimeAgo = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return date;
        }
    };

    const getRoleBadge = (role: string) => {
        const badges = {
            instructor: 'bg-yellow-100 text-yellow-800',
            ta: 'bg-purple-100 text-purple-800',
            student: 'bg-gray-100 text-gray-800',
        };
        return badges[role as keyof typeof badges] || badges.student;
    };

    if (followups.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No followup discussions yet. Be the first to add one!
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {followups.map((followup) => (
                <div
                    key={followup._id}
                    className={`border rounded-lg p-4 ${followup.isAnswer ? 'border-green-300 bg-green-50' : 'border-gray-200'
                        }`}
                >
                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                {followup.author.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <span className="font-medium text-sm">{followup.author.name}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded ${getRoleBadge(followup.author.role)}`}>
                                        {followup.author.role}
                                    </span>
                                    {followup.isAnswer && (
                                        <span className="flex items-center space-x-1 text-xs text-green-700">
                                            <CheckCircle size={14} />
                                            <span>Answer</span>
                                        </span>
                                    )}
                                </div>
                                <div className="text-xs text-gray-500">
                                    {getTimeAgo(followup.createdAt)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-3">
                        <p className="text-sm whitespace-pre-wrap text-gray-800">{followup.content}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                        <button
                            onClick={() => handleLikeFollowup(followup._id)}
                            className={`flex items-center space-x-1 px-2 py-1 rounded text-xs transition ${likedFollowups.has(followup._id)
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            <ThumbsUp size={14} />
                            <span>{followup.likes + (likedFollowups.has(followup._id) ? 1 : 0)}</span>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}