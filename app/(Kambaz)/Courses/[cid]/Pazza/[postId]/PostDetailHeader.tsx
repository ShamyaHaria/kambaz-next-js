'use client';

import { ArrowLeft, MoreVertical } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    tags: string[];
    views: number;
}

interface PostDetailHeaderProps {
    post: Post;
    onBack: () => void;
}

export default function PostDetailHeader({ post, onBack }: PostDetailHeaderProps) {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-5xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between mb-4">
                    <button
                        onClick={onBack}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Posts</span>
                    </button>

                    <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{post.views} views</span>
                        <button className="text-gray-600 hover:text-gray-800">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-2">
                    {post.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-2xl font-bold text-gray-900">
                    {post.title}
                </h1>
            </div>
        </div>
    );
}