'use client';

import { useState } from 'react';
import { ThumbsUp, Bookmark, Star, Link2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleBookmark, toggleStar } from '../pazzaSlice';
import { pazzaAPI } from '../client';
import { formatDistanceToNow } from 'date-fns';

interface Post {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    likes: number;
    bookmarked: boolean;
    starred: boolean;
    createdAt: string;
    updatedAt: string;
}

interface PostContentProps {
    post: Post;
}

export default function PostContent({ post }: PostContentProps) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);

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
            dispatch(toggleBookmark(post._id));
        } catch (error) {
            console.error('Error bookmarking post:', error);
        }
    };

    const handleStar = async () => {
        try {
            await pazzaAPI.starPost(post._id);
            dispatch(toggleStar(post._id));
        } catch (error) {
            console.error('Error starring post:', error);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
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

    return (
        <div className="p-6">
            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {post.author.name.charAt(0).toUpperCase()}
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold">{post.author.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded ${getRoleBadge(post.author.role)}`}>
                            {post.author.role}
                        </span>
                    </div>
                    <div className="text-sm text-gray-500">
                        Updated {getTimeAgo(post.updatedAt)}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="prose max-w-none mb-6">
                <p className="whitespace-pre-wrap">{post.content}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <button
                    onClick={handleLike}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${liked
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <ThumbsUp size={18} />
                    <span className="text-sm">{post.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                    onClick={handleBookmark}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${post.bookmarked
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <Bookmark size={18} fill={post.bookmarked ? 'currentColor' : 'none'} />
                </button>
                        
                <button
                    onClick={handleStar}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md transition ${post.starred
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    <Star size={18} fill={post.starred ? 'currentColor' : 'none'} />
                </button>

                <button
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                >
                    <Link2 size={18} />
                </button>
            </div>
        </div>
    );
}