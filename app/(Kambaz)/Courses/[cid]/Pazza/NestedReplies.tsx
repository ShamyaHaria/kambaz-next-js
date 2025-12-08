'use client';

import { useState } from 'react';
import { ThumbsUp, Trash2, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { pazzaAPI } from './client';
import styles from './postDetail.module.css';

interface Reply {
    _id: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: string;
    };
    likes: number;
    likedBy?: string[];
    createdAt: string;
}

interface NestedRepliesProps {
    postId: string;
    followupId: string;
    replies: Reply[];
    currentUser: any;
    likedReplies: Set<string>;
    onUpdate: () => void;
}

export default function NestedReplies({
    postId,
    followupId,
    replies = [],
    currentUser,
    likedReplies,
    onUpdate
}: NestedRepliesProps) {
    const [showReplyForm, setShowReplyForm] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [replyLoading, setReplyLoading] = useState(false);

    const getTimeAgo = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return date;
        }
    };

    const getRoleBadgeClass = (role: string) => {
        if (role === 'instructor' || role === 'FACULTY') return styles.roleBadgeInstructor;
        if (role === 'ta' || role === 'TA') return styles.roleBadgeTA;
        return styles.roleBadgeStudent;
    };

    const canDeleteReply = (reply: Reply) => {
        if (!currentUser) return false;
        const isAuthor = reply.author._id === currentUser._id;
        const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN' || currentUser.role === 'TA';
        return isAuthor || isFacultyOrAdmin;
    };

    const handlePostReply = async () => {
        if (!replyContent.trim()) return;

        setReplyLoading(true);
        try {
            await pazzaAPI.createReply(postId, followupId, {
                content: replyContent.trim()
            });

            setReplyContent('');
            setShowReplyForm(false);
            onUpdate();
        } catch (error: any) {
            console.error('Error posting reply:', error);
            alert('Failed to post reply: ' + (error.response?.data?.error || error.message));
        } finally {
            setReplyLoading(false);
        }
    };

    const handleLikeReply = async (replyId: string) => {
        try {
            await pazzaAPI.likeReply(postId, followupId, replyId);
            onUpdate();
        } catch (error) {
            console.error('Error liking reply:', error);
        }
    };

    const handleDeleteReply = async (replyId: string) => {
        if (!confirm('Are you sure you want to delete this reply?')) return;

        try {
            await pazzaAPI.deleteReply(postId, followupId, replyId);
            onUpdate();
        } catch (error) {
            console.error('Error deleting reply:', error);
            alert('Failed to delete reply');
        }
    };

    return (
        <div className={styles.nestedReplies}>
            {replies.length > 0 && (
                <div className={styles.repliesList}>
                    {replies.map((reply) => (
                        <div key={reply._id} className={styles.replyCard}>
                            <div className={styles.replyHeader}>
                                <div className={styles.replyAvatar}>
                                    {reply.author.name.charAt(0).toUpperCase()}
                                </div>
                                <div className={styles.replyAuthorInfo}>
                                    <div className={styles.replyAuthorTop}>
                                        <span className={styles.replyAuthorName}>
                                            {reply.author.name}
                                        </span>
                                        <span className={`${styles.roleBadge} ${getRoleBadgeClass(reply.author.role)}`}>
                                            {reply.author.role === 'FACULTY' || reply.author.role === 'instructor' ? 'Instructor' :
                                                reply.author.role === 'TA' || reply.author.role === 'ta' ? 'TA' : 'Student'}
                                        </span>
                                    </div>
                                    <div className={styles.replyTime}>
                                        {getTimeAgo(reply.createdAt)}
                                    </div>
                                </div>
                                {canDeleteReply(reply) && (
                                    <button
                                        onClick={() => handleDeleteReply(reply._id)}
                                        className={styles.deleteButton}
                                        title="Delete reply"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>

                            <div className={styles.replyContent}>
                                {reply.content}
                            </div>

                            <div className={styles.replyActions}>
                                <button
                                    onClick={() => handleLikeReply(reply._id)}
                                    className={`${styles.likeButton} ${likedReplies.has(reply._id) ? styles.likeButtonActive : ''}`}
                                >
                                    <ThumbsUp size={12} fill={likedReplies.has(reply._id) ? 'currentColor' : 'none'} />
                                    <span>{reply.likes || 0}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!showReplyForm ? (
                <button
                    onClick={() => setShowReplyForm(true)}
                    className={styles.replyButton}
                >
                    <MessageSquare size={14} />
                    Reply
                </button>
            ) : (
                <div className={styles.replyForm}>
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                        className={styles.replyTextarea}
                        rows={3}
                        autoFocus
                    />
                    <div className={styles.replyFormActions}>
                        <button
                            onClick={() => {
                                setShowReplyForm(false);
                                setReplyContent('');
                            }}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handlePostReply}
                            disabled={replyLoading || !replyContent.trim()}
                            className={styles.submitButton}
                        >
                            {replyLoading ? 'Posting...' : 'Post Reply'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}