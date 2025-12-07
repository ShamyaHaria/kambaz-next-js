'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ThumbsUp, Bookmark, Star, Link2, MessageSquare, CheckCircle, Trash2 } from 'lucide-react';
import { useSelector } from 'react-redux';
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
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [liked, setLiked] = useState(false);
    const [likedFollowups, setLikedFollowups] = useState<Set<string>>(new Set());
    const [currentLikes, setCurrentLikes] = useState(post.likes);
    const [bookmarked, setBookmarked] = useState(post.bookmarked);
    const [starred, setStarred] = useState(post.starred);
    const [showFollowUpForm, setShowFollowUpForm] = useState(false);
    const [followUpContent, setFollowUpContent] = useState('');
    const [followUpLoading, setFollowUpLoading] = useState(false);
    const [showOnlyResolved, setShowOnlyResolved] = useState(false);
    const [showAIAnswer, setShowAIAnswer] = useState(false);
    const [aiAnswer, setAiAnswer] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResolved, setAiResolved] = useState(false);

    // Initialize liked state for post
    useEffect(() => {
        const likedBy = (post as any).likedBy || [];
        const isLiked = currentUser ? likedBy.includes(currentUser._id) : false;
        setLiked(isLiked);
        setCurrentLikes(post.likes);
    }, [post._id, post.likes, currentUser]);

    // Initialize liked followups
    useEffect(() => {
        if (currentUser) {
            const liked = new Set<string>();
            post.followups.forEach(f => {
                if (f.likedBy?.includes(currentUser._id)) {
                    liked.add(f._id);
                }
            });
            setLikedFollowups(liked);
        }
    }, [post.followups, currentUser]);

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
        const newLikedState = !liked;
        const newLikesCount = newLikedState ? currentLikes + 1 : currentLikes - 1;

        setLiked(newLikedState);
        setCurrentLikes(newLikesCount);

        try {
            const response = await pazzaAPI.likePost(post._id);
            setLiked(response.data.userHasLiked);
            setCurrentLikes(response.data.likes);
        } catch (error) {
            console.error('Error liking post:', error);
            setLiked(!newLikedState);
            setCurrentLikes(liked ? currentLikes + 1 : currentLikes - 1);
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
        } catch (error: any) {
            console.error('Error posting followup:', error);
            alert('Failed to post followup: ' + (error.response?.data?.error || error.message));
        } finally {
            setFollowUpLoading(false);
        }
    };

    const handleDeletePost = async () => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await pazzaAPI.deletePost(post._id);
            alert('Post deleted successfully');
            onClose();
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Failed to delete post');
        }
    };

    const handleDeleteFollowUp = async (followupId: string) => {
        if (!confirm('Are you sure you want to delete this followup?')) return;

        try {
            await pazzaAPI.deleteFollowUp(post._id, followupId);
            if (onUpdate) onUpdate();
        } catch (error) {
            console.error('Error deleting followup:', error);
            alert('Failed to delete followup');
        }
    };

    const canDeletePost = () => {
        if (!currentUser) return false;
        const isAuthor = post.author._id === currentUser._id;
        const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
        return isAuthor || isFacultyOrAdmin;
    };

    const canDeleteFollowup = (followup: any) => {
        if (!currentUser) return false;
        const isAuthor = followup.author._id === currentUser._id;
        const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN';
        return isAuthor || isFacultyOrAdmin;
    };

    const handleLikeFollowUp = async (followupId: string) => {
        // Optimistic update
        const newLikedFollowups = new Set(likedFollowups);
        if (newLikedFollowups.has(followupId)) {
            newLikedFollowups.delete(followupId);
        } else {
            newLikedFollowups.add(followupId);
        }
        setLikedFollowups(newLikedFollowups);

        try {
            await pazzaAPI.likeFollowUp(post._id, followupId);
            
            // Refresh to get accurate counts
            if (onUpdate) {
                await onUpdate();
            }
        } catch (error) {
            console.error('Error liking followup:', error);
            // Revert on error
            setLikedFollowups(likedFollowups);
        }
    };

    const filteredFollowups = showOnlyResolved
        ? post.followups.filter(f => f.isAnswer)
        : post.followups;

    const handleGenerateAIAnswer = async () => {
        setAiLoading(true);
        setShowAIAnswer(true);
        try {
            const response = await pazzaAPI.generateAIAnswer(post._id, {
                title: post.title,
                content: post.content,
                tags: post.tags,
                category: (post as any).category || 'Other'
            });
            setAiAnswer(response.data.answer);
        } catch (error) {
            console.error('Error generating AI answer:', error);
            setAiAnswer('Failed to generate AI answer. Please try again.');
        } finally {
            setAiLoading(false);
        }
    };

    const handleMarkResolved = async () => {
        try {
            await pazzaAPI.markAsResolved(post._id, true);
            setAiResolved(true);
            alert('Post marked as resolved! Faculty will be notified.');
        } catch (error) {
            console.error('Error marking as resolved:', error);
        }
    };

    return (
        <div className={styles.postDetailContainer}>
            {/* Header */}
            <div className={styles.postHeader}>
                <div className={styles.headerTop}>
                    <button onClick={onClose} className={styles.backButton}>
                        <ArrowLeft size={18} />
                        <span>Back to posts</span>
                    </button>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className={styles.viewCount}>
                            <MessageSquare size={18} />
                            <span>{post.views} views</span>
                        </div>
                        {canDeletePost() && (
                            <button
                                onClick={handleDeletePost}
                                className={styles.deletePostButton}
                                title="Delete post"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
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
                    <span>{currentLikes}</span>
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

            {/* AI Answer Section */}
            {!showAIAnswer && post.followups.length === 0 && (
                <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-t border-gray-200">
                    <button
                        onClick={handleGenerateAIAnswer}
                        className={styles.aiAnswerButton}
                    >
                        <span>✨</span>
                        <span>Get AI-Powered Answer</span>
                    </button>
                </div>
            )}

            {showAIAnswer && (
                <div className="px-6 py-6 bg-gradient-to-br from-purple-50 to-blue-50 border-t-2 border-purple-200">
                    <div className="bg-white rounded-lg border-2 border-purple-300 p-5 shadow-md">
                        <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md flex-shrink-0">
                                🤖
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold text-gray-900">AI Assistant</span>
                                    <span className="text-xs px-2 py-1 rounded-md font-semibold bg-purple-100 text-purple-700 border border-purple-300">
                                        Powered by AI
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500">Generated just now</p>
                            </div>
                        </div>

                        {aiLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                <span className="ml-3 text-gray-600">Generating answer...</span>
                            </div>
                        ) : (
                            <>
                                <div className="prose max-w-none mb-4">
                                    <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                                        {aiAnswer}
                                    </p>
                                </div>

                                {!aiResolved && (
                                    <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                                        <p className="text-sm text-gray-600 italic">
                                            💡 Was this answer helpful? Mark as resolved to notify faculty.
                                        </p>
                                        <button
                                            onClick={handleMarkResolved}
                                            className={styles.markResolvedButton}
                                        >
                                            ✓ Mark as Resolved
                                        </button>
                                    </div>
                                )}

                                {aiResolved && (
                                    <div className="flex items-center gap-2 pt-4 border-t border-green-200 bg-green-50 px-4 py-3 rounded-lg">
                                        <CheckCircle size={20} className="text-green-600" />
                                        <span className="text-green-700 font-semibold">
                                            Marked as resolved - Faculty notified!
                                        </span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

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
                                <span>Resolved only</span>
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
                                        className={`${styles.likeFollowupButton} ${likedFollowups.has(followup._id) ? styles.likeFollowupButtonActive : ''}`}
                                    >
                                        <ThumbsUp size={14} fill={likedFollowups.has(followup._id) ? 'currentColor' : 'none'} />
                                        <span>{followup.likes}</span>
                                    </button>
                                    {canDeleteFollowup(followup) && (
                                        <button
                                            onClick={() => handleDeleteFollowUp(followup._id)}
                                            className={styles.deleteFollowupButton}
                                            title="Delete followup"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}