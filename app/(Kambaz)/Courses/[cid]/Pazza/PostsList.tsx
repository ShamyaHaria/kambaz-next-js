'use client';

import { useState } from 'react';
import { Pin, Filter } from 'lucide-react';
import PostCard from './PostCard';
import styles from './pazza.module.css';

interface Post {
    _id: string;
    courseId: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    tags: string[];
    isPinned: boolean;
    isInstructor: boolean;
    views: number;
    likes: number;
    bookmarked: boolean;
    starred: boolean;
    followups: any[];
    createdAt: string;
    updatedAt: string;
}

interface PostsListProps {
    posts: Post[];
    loading: boolean;
    showPinnedOnly: boolean;
    onTogglePinned: () => void;
    selectedTags: string[];
    onTagSelect: (tag: string) => void;
}

export default function PostsList({
    posts,
    loading,
    showPinnedOnly,
    onTogglePinned,
    selectedTags,
    onTagSelect,
}: PostsListProps) {
    const [showFilters, setShowFilters] = useState(false);

    const availableTags = [
        'hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7',
        'labs', 'code_walks', 'logistics', 'other'
    ];

    const pinnedPosts = posts.filter(post => post.isPinned);
    const regularPosts = posts.filter(post => !post.isPinned);

    if (loading) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                Loading posts...
            </div>
        );
    }

    return (
        <div className={styles.postsList}>
            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.filterButtons}>
                    <button
                        onClick={onTogglePinned}
                        className={`${styles.filterButton} ${showPinnedOnly ? styles.active : ''}`}
                    >
                        📌 Pinned
                    </button>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className={styles.filterButton}
                    >
                        🔽 All Posts
                    </button>
                </div>

                <div className={styles.postCount}>
                    {posts.length} post{posts.length !== 1 ? 's' : ''}
                </div>
            </div>

            {/* Tags Filter */}
            {showFilters && (
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => onTagSelect(tag)}
                            style={{
                                padding: '4px 12px',
                                borderRadius: '16px',
                                fontSize: '13px',
                                border: 'none',
                                cursor: 'pointer',
                                background: selectedTags.includes(tag) ? '#2563eb' : '#e5e7eb',
                                color: selectedTags.includes(tag) ? 'white' : '#374151',
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            )}

            {/* Pinned Posts Section */}
            {!showPinnedOnly && pinnedPosts.length > 0 && (
                <div className={styles.pinnedSection}>
                    <div className={styles.pinnedHeader}>
                        📌 Pinned
                    </div>
                    <div>
                        {pinnedPosts.map(post => (
                            <PostCard key={post._id} post={post} />
                        ))}
                    </div>
                </div>
            )}

            {/* Regular Posts */}
            <div>
                {(showPinnedOnly ? pinnedPosts : regularPosts).length === 0 ? (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                        No posts found
                    </div>
                ) : (
                    (showPinnedOnly ? pinnedPosts : regularPosts).map(post => (
                        <PostCard key={post._id} post={post} />
                    ))
                )}
            </div>
        </div>
    );
}