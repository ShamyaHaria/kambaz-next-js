'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
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
    onPostSelect: (post: Post) => void;
    selectedPostId?: string;
}

function groupPostsByDate(posts: Post[]) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);

    const groups = {
        pinned: [] as Post[],
        today: [] as Post[],
        yesterday: [] as Post[],
        lastWeek: [] as Post[],
    };

    posts.forEach(post => {
        if (post.isPinned) {
            groups.pinned.push(post);
            return;
        }

        const postDate = new Date(post.createdAt);
        const postDateOnly = new Date(postDate.getFullYear(), postDate.getMonth(), postDate.getDate());

        if (postDateOnly.getTime() === today.getTime()) {
            groups.today.push(post);
        } else if (postDateOnly.getTime() === yesterday.getTime()) {
            groups.yesterday.push(post);
        } else if (postDateOnly >= lastWeekStart) {
            groups.lastWeek.push(post);
        } else {
            groups.lastWeek.push(post);

        }
    });

    return groups;
}

export default function PostsList({
    posts,
    loading,
    showPinnedOnly,
    onTogglePinned,
    selectedTags,
    onTagSelect,
    onPostSelect,
    selectedPostId,
}: PostsListProps) {
    const [showFilters, setShowFilters] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        pinned: true,
        today: true,
        yesterday: true,
        lastWeek: true,
    });

    const availableTags = [
        'hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7',
        'labs', 'code_walks', 'logistics', 'other'
    ];

    const toggleSection = (section: keyof typeof expandedSections) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const groupedPosts = groupPostsByDate(posts);

    if (loading) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                Loading posts...
            </div>
        );
    }

    return (
        <div className={styles.postsList}>
            { }
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

            { }
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

            { }
            {showPinnedOnly ? (
                <div>
                    {groupedPosts.pinned.length === 0 ? (
                        <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                            No pinned posts
                        </div>
                    ) : (
                        groupedPosts.pinned.map(post => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onSelect={onPostSelect}
                                isSelected={post._id === selectedPostId}
                            />
                        ))
                    )}
                </div>
            ) : (
                <>
                    { }
                    <div className={styles.accordionSection}>
                        <button
                            onClick={() => toggleSection('pinned')}
                            className={styles.accordionHeader}
                        >
                            {expandedSections.pinned ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <span style={{ fontWeight: '600' }}>📌 Pinned</span>
                            <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '14px' }}>
                                {groupedPosts.pinned.length}
                            </span>
                        </button>
                        {expandedSections.pinned && (
                            <div>
                                {groupedPosts.pinned.length === 0 ? (
                                    <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                                        No pinned posts
                                    </div>
                                ) : (
                                    groupedPosts.pinned.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            onSelect={onPostSelect}
                                            isSelected={post._id === selectedPostId}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    { }
                    <div className={styles.accordionSection}>
                        <button
                            onClick={() => toggleSection('today')}
                            className={styles.accordionHeader}
                        >
                            {expandedSections.today ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <span style={{ fontWeight: '600' }}>Today</span>
                            <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '14px' }}>
                                {groupedPosts.today.length}
                            </span>
                        </button>
                        {expandedSections.today && (
                            <div>
                                {groupedPosts.today.length === 0 ? (
                                    <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                                        No posts today
                                    </div>
                                ) : (
                                    groupedPosts.today.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            onSelect={onPostSelect}
                                            isSelected={post._id === selectedPostId}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    { }
                    <div className={styles.accordionSection}>
                        <button
                            onClick={() => toggleSection('yesterday')}
                            className={styles.accordionHeader}
                        >
                            {expandedSections.yesterday ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <span style={{ fontWeight: '600' }}>Yesterday</span>
                            <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '14px' }}>
                                {groupedPosts.yesterday.length}
                            </span>
                        </button>
                        {expandedSections.yesterday && (
                            <div>
                                {groupedPosts.yesterday.length === 0 ? (
                                    <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                                        No posts yesterday
                                    </div>
                                ) : (
                                    groupedPosts.yesterday.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            onSelect={onPostSelect}
                                            isSelected={post._id === selectedPostId}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    { }
                    <div className={styles.accordionSection}>
                        <button
                            onClick={() => toggleSection('lastWeek')}
                            className={styles.accordionHeader}
                        >
                            {expandedSections.lastWeek ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                            <span style={{ fontWeight: '600' }}>Last Week</span>
                            <span style={{ marginLeft: 'auto', color: '#6b7280', fontSize: '14px' }}>
                                {groupedPosts.lastWeek.length}
                            </span>
                        </button>
                        {expandedSections.lastWeek && (
                            <div>
                                {groupedPosts.lastWeek.length === 0 ? (
                                    <div style={{ padding: '16px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                                        No posts last week
                                    </div>
                                ) : (
                                    groupedPosts.lastWeek.map(post => (
                                        <PostCard
                                            key={post._id}
                                            post={post}
                                            onSelect={onPostSelect}
                                            isSelected={post._id === selectedPostId}
                                        />
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}