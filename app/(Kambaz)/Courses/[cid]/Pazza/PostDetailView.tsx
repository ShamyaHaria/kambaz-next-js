'use client';

import { useState } from 'react';
import { ArrowLeft, ThumbsUp, Bookmark, Star, Link2, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pazzaAPI } from './client';

interface Post {
    _id: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    tags: string[];
    views: number;
    likes: number;
    bookmarked: boolean;
    starred: boolean;
    followups: any[];
    createdAt: string;
    updatedAt: string;
}

interface PostDetailViewProps {
    post: Post;
    onClose: () => void;
    onUpdate?: () => void;
}

export default function PostDetailView({ post, onClose, onUpdate }: PostDetailViewProps) {
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(post.bookmarked);
    const [starred, setStarred] = useState(post.starred);
    const [showFollowUpForm, setShowFollowUpForm] = useState(false);
    const [followUpContent, setFollowUpContent] = useState('');
    const [followUpLoading, setFollowUpLoading] = useState(false);

    const getTimeAgo = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return date;
        }
    };

    const getRoleBadge = (role: string) => {
        const badges = {
            instructor: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
            ta: { bg: '#f3e8ff', text: '#6b21a8', border: '#e9d5ff' },
            student: { bg: '#f3f4f6', text: '#374151', border: '#d1d5db' },
        };
        return badges[role as keyof typeof badges] || badges.student;
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
    };

    const handleLike = async () => {
        try {
            await pazzaAPI.likePost(post._id);
            setLiked(!liked);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleBookmark = async () => {
        try {
            await pazzaAPI.bookmarkPost(post._id);
            setBookmarked(!bookmarked);
        } catch (error) {
            console.error('Error bookmarking post:', error);
        }
    };

    const handleStar = async () => {
        try {
            await pazzaAPI.starPost(post._id);
            setStarred(!starred);
        } catch (error) {
            console.error('Error starring post:', error);
        }
    };

    const handlePostFollowUp = async () => {
        if (!followUpContent.trim()) return;

        setFollowUpLoading(true);
        try {
            await pazzaAPI.createFollowUp(post._id, {
                content: followUpContent.trim(),
                isAnswer: false,
            });
            setFollowUpContent('');
            setShowFollowUpForm(false);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error posting followup:', error);
            alert('Failed to post followup');
        } finally {
            setFollowUpLoading(false);
        }
    };

    const handleLikeFollowUp = async (followupId: string) => {
        try {
            await pazzaAPI.likeFollowUp(post._id, followupId);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error liking followup:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between mb-3">
                    <button
                        onClick={onClose}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                        <ArrowLeft size={18} />
                        <span className="font-medium">Back to posts</span>
                    </button>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <MessageSquare size={16} />
                        <span className="text-sm font-medium">{post.views} views</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="px-6 py-6">
                {/* Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    {post.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                        {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <span className="font-semibold text-gray-900">{post.author.name}</span>
                            <span
                                className="text-xs px-2 py-1 rounded-md font-semibold border"
                                style={{
                                    backgroundColor: getRoleBadge(post.author.role).bg,
                                    color: getRoleBadge(post.author.role).text,
                                    borderColor: getRoleBadge(post.author.role).border,
                                }}
                            >
                                {post.author.role === 'instructor' ? 'Instructor' : post.author.role === 'ta' ? 'TA' : 'Student'}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">
                            Updated {getTimeAgo(post.updatedAt)}
                        </p>
                    </div>
                </div>

                {/* Post Content */}
                <div className="prose max-w-none mb-6">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pb-6 border-b border-gray-200">
                    <button
                        onClick={handleLike}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${liked
                            ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        <ThumbsUp size={18} fill={liked ? 'currentColor' : 'none'} />
                        <span>{post.likes + (liked ? 1 : 0)}</span>
                    </button>

                    <button
                        onClick={handleBookmark}
                        className={`p-2.5 rounded-lg transition-all ${bookmarked
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        title="Bookmark"
                    >
                        <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
                    </button>

                    <button
                        onClick={handleStar}
                        className={`p-2.5 rounded-lg transition-all ${starred
                            ? 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        title="Star"
                    >
                        <Star size={18} fill={starred ? 'currentColor' : 'none'} />
                    </button>

                    <button
                        onClick={handleCopyLink}
                        className="p-2.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                        title="Copy link"
                    >
                        <Link2 size={18} />
                    </button>
                </div>
            </div>

            {/* Followups Section */}
            <div className="px-6 py-6 bg-gray-50">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                        <MessageSquare size={22} className="text-gray-600" />
                        <span>{post.followups.length} Followup Discussion{post.followups.length !== 1 ? 's' : ''}</span>
                    </h2>
                    <button
                        onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                        className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium"
                    >
                        {showFollowUpForm ? 'Cancel' : '+ Add Followup'}
                    </button>
                </div>

                {showFollowUpForm && (
                    <div className="mb-6 bg-white p-4 border-2 border-blue-200 rounded-lg shadow-sm">
                        <textarea
                            value={followUpContent}
                            onChange={(e) => setFollowUpContent(e.target.value)}
                            placeholder="Compose a new followup discussion..."
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                        <div className="mt-3 flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={() => setShowFollowUpForm(false)}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handlePostFollowUp}
                                disabled={followUpLoading || !followUpContent.trim()}
                                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {followUpLoading ? 'Posting...' : 'Post Followup'}
                            </button>
                        </div>
                    </div>
                )}

                {post.followups.length === 0 ? (
                    <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                        <MessageSquare size={48} className="mx-auto text-gray-400 mb-3" />
                        <p className="text-gray-500 font-medium">No followup discussions yet.</p>
                        <p className="text-gray-400 text-sm mt-1">Be the first to add one!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {post.followups.map((followup: any) => {
                            const roleBadge = getRoleBadge(followup.author.role);
                            return (
                                <div
                                    key={followup._id}
                                    className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
                                >
                                    {/* Followup Header */}
                                    <div className="flex items-start space-x-3 mb-3">
                                        <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-sm flex-shrink-0">
                                            {followup.author.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-2 mb-1">
                                                <span className="font-semibold text-gray-900">
                                                    {followup.author.name}
                                                </span>
                                                <span
                                                    className="text-xs px-2 py-0.5 rounded-md font-semibold border"
                                                    style={{
                                                        backgroundColor: roleBadge.bg,
                                                        color: roleBadge.text,
                                                        borderColor: roleBadge.border,
                                                    }}
                                                >
                                                    {followup.author.role}
                                                </span>
                                                {followup.isAnswer && (
                                                    <span className="text-xs px-2 py-0.5 rounded-md font-semibold bg-green-100 text-green-700 border border-green-300">
                                                        ✓ Answer
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500">
                                                {getTimeAgo(followup.createdAt)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Followup Content */}
                                    <p className="text-gray-800 leading-relaxed mb-3 pl-12">
                                        {followup.content}
                                    </p>

                                    {/* Followup Actions */}
                                    <div className="flex items-center space-x-4 pl-12">
                                        <button
                                            onClick={() => handleLikeFollowUp(followup._id)}
                                            className="flex items-center space-x-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                                        >
                                            <ThumbsUp size={14} />
                                            <span className="font-medium">{followup.likes}</span>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}