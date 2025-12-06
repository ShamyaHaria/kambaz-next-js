'use client';

import { useState } from 'react';
import { ArrowLeft, ThumbsUp, Bookmark, Star, Link2, MessageSquare, CheckCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pazzaAPI } from './client';
import styles from './postDetail.module.css';

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
    const [showOnlyResolved, setShowOnlyResolved] = useState(false);

    const getTimeAgo = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return date;
        }
    };

    const getRoleBadgeClass = (role: string) => {
        if (role === 'instructor') return styles.roleBadgeInstructor;
        if (role === 'ta') return styles.roleBadgeTA;
        return styles.roleBadgeStudent;
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

    const filteredFollowups = showOnlyResolved
        ? post.followups.filter(f => f.isAnswer)
        : post.followups;

    return (
        <div className={styles.postDetailContainer}>
            {/* Header */}
            <div className={styles.postHeader}>
                <div className={styles.headerTop}>
                    <button onClick={onClose} className={styles.backButton}>
                        <ArrowLeft size={18} />
                        <span>Back to posts</span>
                    </button>
                    <div className={styles.viewCount}>
                        <MessageSquare size={18} />
                        <span>{post.views} views</span>
                    </div>
                </div>

                <div className={styles.tagsContainer}>
                    {post.tags.map((tag, index) => (
                        <span key={index} className={styles.tag}>
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className={styles.postContent}>
                <h1 className={styles.postTitle}>{post.title}</h1>

                <div className={styles.authorSection}>
                    <div className={styles.authorAvatar}>
                        {post.author.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.authorInfo}>
                        <div className={styles.authorName}>{post.author.name}</div>
                        <div className={styles.authorMeta}>
                            <span className={`${styles.roleBadge} ${getRoleBadgeClass(post.author.role)}`}>
                                {post.author.role === 'instructor' ? 'Instructor' : post.author.role === 'ta' ? 'TA' : 'Student'}
                            </span>
                            <span className={styles.updateTime}>
                                Updated {getTimeAgo(post.updatedAt)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.postBody}>{post.content}</div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
                <button
                    onClick={handleLike}
                    className={`${styles.actionButton} ${styles.likeButton} ${liked ? styles.likeButtonActive : ''}`}
                >
                    <ThumbsUp size={18} fill={liked ? 'currentColor' : 'none'} />
                    <span>{post.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                    onClick={handleBookmark}
                    className={`${styles.actionButton} ${styles.bookmarkButton} ${bookmarked ? styles.bookmarkButtonActive : ''}`}
                >
                    <Bookmark size={18} fill={bookmarked ? 'currentColor' : 'none'} />
                </button>

                <button
                    onClick={handleStar}
                    className={`${styles.actionButton} ${styles.starButton} ${starred ? styles.starButtonActive : ''}`}
                >
                    <Star size={18} fill={starred ? 'currentColor' : 'none'} />
                </button>

                <button
                    onClick={handleCopyLink}
                    className={`${styles.actionButton} ${styles.shareButton}`}
                >
                    <Link2 size={18} />
                </button>
            </div>

            {/* Followups Section */}
            <div className={styles.followupsSection}>
                <div className={styles.followupsHeader}>
                    <div className={styles.followupsTitle}>
                        <MessageSquare size={24} className={styles.followupsIcon} />
                        <span>{filteredFollowups.length} Followup Discussion{filteredFollowups.length !== 1 ? 's' : ''}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {post.followups.some(f => f.isAnswer) && (
                            <button
                                onClick={() => setShowOnlyResolved(!showOnlyResolved)}
                                className={`${styles.resolvedToggle} ${showOnlyResolved ? styles.resolvedToggleActive : ''}`}
                            >
                                <CheckCircle size={16} />
                                <span>Resolved</span>
                            </button>
                        )}
                        <button
                            onClick={() => setShowFollowUpForm(!showFollowUpForm)}
                            className={styles.addFollowupButton}
                        >
                            {showFollowUpForm ? 'Cancel' : '+ Add Followup'}
                        </button>
                    </div>
                </div>

                {showFollowUpForm && (
                    <div className={styles.followupForm}>
                        <textarea
                            value={followUpContent}
                            onChange={(e) => setFollowUpContent(e.target.value)}
                            placeholder="Share your thoughts, ask a question, or provide an answer..."
                            className={styles.followupTextarea}
                        />
                        <div className={styles.followupFormActions}>
                            <button
                                onClick={() => setShowFollowUpForm(false)}
                                className={styles.cancelButton}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePostFollowUp}
                                disabled={followUpLoading || !followUpContent.trim()}
                                className={styles.submitButton}
                            >
                                {followUpLoading ? 'Posting...' : 'Post Followup'}
                            </button>
                        </div>
                    </div>
                )}

                {filteredFollowups.length === 0 ? (
                    <div className={styles.emptyFollowups}>
                        <MessageSquare size={56} className={styles.emptyIcon} />
                        <div className={styles.emptyTitle}>
                            {showOnlyResolved ? 'No resolved discussions yet' : 'No followup discussions yet'}
                        </div>
                        <div className={styles.emptySubtitle}>
                            {showOnlyResolved ? 'Switch to view all discussions' : 'Be the first to start the conversation!'}
                        </div>
                    </div>
                ) : (
                    <div className={styles.followupsList}>
                        {filteredFollowups.map((followup: any) => (
                            <div
                                key={followup._id}
                                className={`${styles.followupCard} ${followup.isAnswer ? styles.followupCardAnswer : ''}`}
                            >
                                <div className={styles.followupHeader}>
                                    <div className={styles.followupAvatar}>
                                        {followup.author.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className={styles.followupAuthorInfo}>
                                        <div className={styles.followupAuthorTop}>
                                            <span className={styles.followupAuthorName}>
                                                {followup.author.name}
                                            </span>
                                            <span className={`${styles.roleBadge} ${getRoleBadgeClass(followup.author.role)}`}>
                                                {followup.author.role}
                                            </span>
                                            {followup.isAnswer && (
                                                <span className={styles.answerBadge}>
                                                    <CheckCircle size={12} />
                                                    Answer
                                                </span>
                                            )}
                                        </div>
                                        <div className={styles.followupTime}>
                                            {getTimeAgo(followup.createdAt)}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.followupContent}>
                                    {followup.content}
                                </div>

                                <div className={styles.followupActions}>
                                    <button
                                        onClick={() => handleLikeFollowUp(followup._id)}
                                        className={styles.likeFollowupButton}
                                    >
                                        <ThumbsUp size={14} />
                                        <span>{followup.likes}</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}