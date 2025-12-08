'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, ThumbsUp, Bookmark, Star, Link2, MessageSquare, CheckCircle, Trash2, Edit } from 'lucide-react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import { pazzaAPI } from './client';
import styles from './postDetail.module.css';
import NestedReplies from './NestedReplies';
import EditContentModal from './EditContentModal';

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
    isPinned?: boolean;
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

const categorizeFollowups = (followups: any[]) => {
    const studentAnswers = followups.filter(f =>
        f.isAnswer && (f.author.role === 'student' || f.author.role === 'STUDENT')
    );

    const instructorAnswers = followups.filter(f =>
        f.isAnswer && (f.author.role === 'instructor' || f.author.role === 'FACULTY' || f.author.role === 'ta' || f.author.role === 'TA')
    );

    const discussions = followups.filter(f => !f.isAnswer);

    return { studentAnswers, instructorAnswers, discussions };
};

export default function PostDetailView({ post, onClose, onUpdate }: PostDetailViewProps) {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const [liked, setLiked] = useState(false);
    const [likedFollowups, setLikedFollowups] = useState<Set<string>>(new Set());
    const [currentLikes, setCurrentLikes] = useState(post.likes);
    const [bookmarked, setBookmarked] = useState(post.bookmarked);
    const [starred, setStarred] = useState(post.starred);
    const [showStudentAnswerForm, setShowStudentAnswerForm] = useState(false);
    const [showInstructorAnswerForm, setShowInstructorAnswerForm] = useState(false);
    const [showDiscussionForm, setShowDiscussionForm] = useState(false);
    const [studentAnswerContent, setStudentAnswerContent] = useState('');
    const [instructorAnswerContent, setInstructorAnswerContent] = useState('');
    const [discussionContent, setDiscussionContent] = useState('');
    const [answerLoading, setAnswerLoading] = useState(false);
    const [discussionLoading, setDiscussionLoading] = useState(false);
    const [showAIAnswer, setShowAIAnswer] = useState(false);
    const [aiAnswer, setAiAnswer] = useState('');
    const [aiLoading, setAiLoading] = useState(false);
    const [aiResolved, setAiResolved] = useState(false);
    const [editingItem, setEditingItem] = useState<{ type: 'post' | 'answer' | 'discussion' | 'reply', id: string, content: string, followupId?: string } | null>(null);

    useEffect(() => {
        const likedBy = (post as any).likedBy || [];
        const isLiked = currentUser ? likedBy.includes(currentUser._id) : false;
        setLiked(isLiked);
        setCurrentLikes(post.likes);
    }, [post._id, post.likes, currentUser]);

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

    const handlePostStudentAnswer = async () => {
        if (!studentAnswerContent.trim()) return;

        setAnswerLoading(true);
        try {
            await pazzaAPI.createFollowUp(post._id, {
                content: studentAnswerContent.trim(),
                isAnswer: true,
            });

            setStudentAnswerContent('');
            setShowStudentAnswerForm(false);

            if (onUpdate) onUpdate();
        } catch (error: any) {
            console.error('Error posting answer:', error);
            alert('Failed to post answer: ' + (error.response?.data?.error || error.message));
        } finally {
            setAnswerLoading(false);
        }
    };

    const handlePostInstructorAnswer = async () => {
        if (!instructorAnswerContent.trim()) return;

        setAnswerLoading(true);
        try {
            await pazzaAPI.createFollowUp(post._id, {
                content: instructorAnswerContent.trim(),
                isAnswer: true,
            });

            setInstructorAnswerContent('');
            setShowInstructorAnswerForm(false);

            if (onUpdate) onUpdate();
        } catch (error: any) {
            console.error('Error posting answer:', error);
            alert('Failed to post answer: ' + (error.response?.data?.error || error.message));
        } finally {
            setAnswerLoading(false);
        }
    };

    const handlePostDiscussion = async () => {
        if (!discussionContent.trim()) return;

        setDiscussionLoading(true);
        try {
            await pazzaAPI.createFollowUp(post._id, {
                content: discussionContent.trim(),
                isAnswer: false,
            });

            setDiscussionContent('');
            setShowDiscussionForm(false);

            if (onUpdate) onUpdate();
        } catch (error: any) {
            console.error('Error posting discussion:', error);
            alert('Failed to post discussion: ' + (error.response?.data?.error || error.message));
        } finally {
            setDiscussionLoading(false);
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
        const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN' || currentUser.role === 'TA';
        return isAuthor || isFacultyOrAdmin;
    };

    const canDeleteFollowup = (followup: any) => {
        if (!currentUser) return false;
        const isAuthor = followup.author._id === currentUser._id;
        const isFacultyOrAdmin = currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN' || currentUser.role === 'TA';
        return isAuthor || isFacultyOrAdmin;
    };

    const handleLikeFollowUp = async (followupId: string) => {
        const newLikedFollowups = new Set(likedFollowups);
        if (newLikedFollowups.has(followupId)) {
            newLikedFollowups.delete(followupId);
        } else {
            newLikedFollowups.add(followupId);
        }
        setLikedFollowups(newLikedFollowups);

        try {
            await pazzaAPI.likeFollowUp(post._id, followupId);

            if (onUpdate) {
                await onUpdate();
            }
        } catch (error) {
            console.error('Error liking followup:', error);
            setLikedFollowups(likedFollowups);
        }
    };

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

    const { studentAnswers, instructorAnswers, discussions } = categorizeFollowups(post.followups);
    const isStudent = currentUser?.role === 'STUDENT' || currentUser?.role === 'student';
    const isInstructor = currentUser?.role === 'FACULTY' || currentUser?.role === 'instructor' || currentUser?.role === 'TA' || currentUser?.role === 'ta' || currentUser?.role === 'ADMIN';

    return (
        <div className={styles.postDetailContainer}>
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
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                    onClick={async () => {
                                        try {
                                            await pazzaAPI.togglePin(post._id);
                                            if (onUpdate) onUpdate();
                                        } catch (error) {
                                            console.error('Error toggling pin:', error);
                                        }
                                    }}
                                    className={`${styles.pinButton} ${post.isPinned ? styles.pinButtonPinned : styles.pinButtonUnpinned}`}
                                >
                                    📌 {post.isPinned ? 'Unpin' : 'Pin'}
                                </button>
                                <button
                                    onClick={() => setEditingItem({
                                        type: 'post',
                                        id: post._id,
                                        content: post.content
                                    })}
                                    className={styles.editPostButton}
                                >
                                    <Edit size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={handleDeletePost}
                                    className={styles.deletePostButton}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
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

            <div className={styles.answersContainer}>
                <div className={styles.answerSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Student's Answers</h3>
                        <span className={styles.sectionCount}>
                            {studentAnswers.length}
                        </span>
                    </div>

                    {isStudent && studentAnswers.length === 0 && !showStudentAnswerForm && (
                        <div className={styles.emptySection}>
                            <p className={styles.emptyText}>No student answers yet</p>
                            <button
                                onClick={() => setShowStudentAnswerForm(true)}
                                className={styles.emptyActionButton}
                            >
                                Be the first to answer
                            </button>
                        </div>
                    )}

                    {isStudent && showStudentAnswerForm && (
                        <div className={styles.answerForm}>
                            <textarea
                                value={studentAnswerContent}
                                onChange={(e) => setStudentAnswerContent(e.target.value)}
                                placeholder="Write your answer here..."
                                className={styles.answerTextarea}
                                rows={6}
                            />
                            <div className={styles.answerFormActions}>
                                <button
                                    onClick={() => {
                                        setShowStudentAnswerForm(false);
                                        setStudentAnswerContent('');
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePostStudentAnswer}
                                    disabled={answerLoading || !studentAnswerContent.trim()}
                                    className={styles.submitButton}
                                >
                                    {answerLoading ? 'Posting...' : 'Post Answer'}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isStudent && studentAnswers.length === 0 && (
                        <div className={styles.emptySection}>
                            <p className={styles.emptyText}>No student answers yet</p>
                        </div>
                    )}

                    {studentAnswers.length > 0 && (
                        <div className={styles.answersList}>
                            {studentAnswers.map((answer: any) => (
                                <div key={answer._id} className={styles.answerCard}>
                                    <div className={styles.answerHeader}>
                                        <div className={styles.answerAvatar}>
                                            {answer.author.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className={styles.answerAuthorInfo}>
                                            <div className={styles.answerAuthorTop}>
                                                <span className={styles.answerAuthorName}>
                                                    {answer.author.name}
                                                </span>
                                                <span className={`${styles.roleBadge} ${getRoleBadgeClass(answer.author.role)}`}>
                                                    Student
                                                </span>
                                            </div>
                                            <div className={styles.answerTime}>
                                                {getTimeAgo(answer.createdAt)}
                                            </div>
                                        </div>
                                        {canDeleteFollowup(answer) && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => setEditingItem({
                                                        type: 'answer',
                                                        id: answer._id,
                                                        content: answer.content
                                                    })}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#eff6ff',
                                                        color: '#2563eb',
                                                        border: '1px solid #bfdbfe',
                                                        borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    title="Edit answer"
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFollowUp(answer._id)}
                                                    className={styles.deleteButton}
                                                    title="Delete answer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.answerContent}>
                                        {answer.content}
                                    </div>

                                    <div className={styles.answerActions}>
                                        <button
                                            onClick={() => handleLikeFollowUp(answer._id)}
                                            className={`${styles.likeButton} ${likedFollowups.has(answer._id) ? styles.likeButtonActive : ''}`}
                                        >
                                            <ThumbsUp size={14} fill={likedFollowups.has(answer._id) ? 'currentColor' : 'none'} />
                                            <span>{answer.likes || 0}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.answerSection}>
                    <div className={styles.sectionHeader}>
                        <h3 className={styles.sectionTitle}>Instructor's Answers</h3>
                        <span className={styles.sectionCount}>
                            {instructorAnswers.length}
                        </span>
                    </div>

                    {isInstructor && instructorAnswers.length === 0 && !showInstructorAnswerForm && (
                        <div className={styles.emptySection}>
                            <p className={styles.emptyText}>No instructor answers yet</p>
                            <button
                                onClick={() => setShowInstructorAnswerForm(true)}
                                className={styles.emptyActionButton}
                            >
                                Post an answer
                            </button>
                        </div>
                    )}

                    {isInstructor && showInstructorAnswerForm && (
                        <div className={styles.answerForm}>
                            <textarea
                                value={instructorAnswerContent}
                                onChange={(e) => setInstructorAnswerContent(e.target.value)}
                                placeholder="Write your answer here..."
                                className={styles.answerTextarea}
                                rows={6}
                            />
                            <div className={styles.answerFormActions}>
                                <button
                                    onClick={() => {
                                        setShowInstructorAnswerForm(false);
                                        setInstructorAnswerContent('');
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePostInstructorAnswer}
                                    disabled={answerLoading || !instructorAnswerContent.trim()}
                                    className={styles.submitButton}
                                >
                                    {answerLoading ? 'Posting...' : 'Post Answer'}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isInstructor && instructorAnswers.length === 0 && (
                        <div className={styles.emptySection}>
                            <p className={styles.emptyText}>No instructor answers yet</p>
                        </div>
                    )}

                    {instructorAnswers.length > 0 && (
                        <div className={styles.answersList}>
                            {instructorAnswers.map((answer: any) => (
                                <div key={answer._id} className={`${styles.answerCard} ${styles.instructorAnswer}`}>
                                    <div className={styles.answerHeader}>
                                        <div className={styles.answerAvatar}>
                                            {answer.author.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className={styles.answerAuthorInfo}>
                                            <div className={styles.answerAuthorTop}>
                                                <span className={styles.answerAuthorName}>
                                                    {answer.author.name}
                                                </span>
                                                <span className={`${styles.roleBadge} ${getRoleBadgeClass(answer.author.role)}`}>
                                                    {answer.author.role === 'FACULTY' || answer.author.role === 'instructor' ? 'Instructor' : 'TA'}
                                                </span>
                                            </div>
                                            <div className={styles.answerTime}>
                                                {getTimeAgo(answer.createdAt)}
                                            </div>
                                        </div>
                                        {canDeleteFollowup(answer) && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => setEditingItem({
                                                        type: 'answer',
                                                        id: answer._id,
                                                        content: answer.content
                                                    })}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#eff6ff',
                                                        color: '#2563eb',
                                                        border: '1px solid #bfdbfe',
                                                        borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    title="Edit answer"
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFollowUp(answer._id)}
                                                    className={styles.deleteButton}
                                                    title="Delete answer"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.answerContent}>
                                        {answer.content}
                                    </div>

                                    <div className={styles.answerActions}>
                                        <button
                                            onClick={() => handleLikeFollowUp(answer._id)}
                                            className={`${styles.likeButton} ${likedFollowups.has(answer._id) ? styles.likeButtonActive : ''}`}
                                        >
                                            <ThumbsUp size={14} fill={likedFollowups.has(answer._id) ? 'currentColor' : 'none'} />
                                            <span>{answer.likes || 0}</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className={styles.discussionSection}>
                    <div className={styles.sectionHeader}>
                        <div className={styles.sectionTitleWithIcon}>
                            <MessageSquare size={24} />
                            <h3 className={styles.sectionTitle}>Follow-up Discussions</h3>
                        </div>
                        <span className={styles.sectionCount}>
                            {discussions.length}
                        </span>
                    </div>

                    <button
                        onClick={() => setShowDiscussionForm(!showDiscussionForm)}
                        className={styles.addDiscussionButton}
                    >
                        {showDiscussionForm ? 'Cancel' : '+ Start a new discussion'}
                    </button>

                    {showDiscussionForm && (
                        <div className={styles.discussionForm}>
                            <textarea
                                value={discussionContent}
                                onChange={(e) => setDiscussionContent(e.target.value)}
                                placeholder="Share your thoughts, ask a question..."
                                className={styles.discussionTextarea}
                                rows={4}
                            />
                            <div className={styles.discussionFormActions}>
                                <button
                                    onClick={() => {
                                        setShowDiscussionForm(false);
                                        setDiscussionContent('');
                                    }}
                                    className={styles.cancelButton}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePostDiscussion}
                                    disabled={discussionLoading || !discussionContent.trim()}
                                    className={styles.submitButton}
                                >
                                    {discussionLoading ? 'Posting...' : 'Post Discussion'}
                                </button>
                            </div>
                        </div>
                    )}

                    {discussions.length === 0 ? (
                        <div className={styles.emptySection}>
                            <MessageSquare size={48} className={styles.emptyIcon} />
                            <p className={styles.emptyText}>No discussions yet</p>
                            <p className={styles.emptySubtext}>Be the first to start the conversation!</p>
                        </div>
                    ) : (
                        <div className={styles.discussionsList}>
                            {discussions.map((discussion: any) => (
                                <div key={discussion._id} className={styles.discussionCard}>
                                    <div className={styles.discussionHeader}>
                                        <div className={styles.discussionAvatar}>
                                            {discussion.author.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className={styles.discussionAuthorInfo}>
                                            <div className={styles.discussionAuthorTop}>
                                                <span className={styles.discussionAuthorName}>
                                                    {discussion.author.name}
                                                </span>
                                                <span className={`${styles.roleBadge} ${getRoleBadgeClass(discussion.author.role)}`}>
                                                    {discussion.author.role}
                                                </span>
                                            </div>
                                            <div className={styles.discussionTime}>
                                                {getTimeAgo(discussion.createdAt)}
                                            </div>
                                        </div>
                                        {canDeleteFollowup(discussion) && (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => setEditingItem({
                                                        type: 'discussion',
                                                        id: discussion._id,
                                                        content: discussion.content
                                                    })}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#eff6ff',
                                                        color: '#2563eb',
                                                        border: '1px solid #bfdbfe',
                                                        borderRadius: '6px',
                                                        fontSize: '13px',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                    title="Edit discussion"
                                                >
                                                    <Edit size={14} />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteFollowUp(discussion._id)}
                                                    className={styles.deleteButton}
                                                    title="Delete discussion"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.discussionContent}>
                                        {discussion.content}
                                    </div>

                                    <div className={styles.discussionActions}>
                                        <button
                                            onClick={async () => {
                                                try {
                                                    await pazzaAPI.toggleResolveDiscussion(post._id, discussion._id);
                                                    if (onUpdate) onUpdate();
                                                } catch (error) {
                                                    console.error('Error toggling resolve:', error);
                                                }
                                            }}
                                            className={`${styles.resolvedButton} ${discussion.isResolved ? styles.resolvedButtonResolved : styles.resolvedButtonUnresolved}`}
                                        >
                                            <CheckCircle size={14} />
                                            {discussion.isResolved ? 'Resolved' : 'Unresolved'}
                                        </button>

                                        <button
                                            onClick={() => handleLikeFollowUp(discussion._id)}
                                            className={`${styles.likeButton} ${likedFollowups.has(discussion._id) ? styles.likeButtonActive : ''}`}
                                        >
                                            <ThumbsUp size={14} fill={likedFollowups.has(discussion._id) ? 'currentColor' : 'none'} />
                                            <span>{discussion.likes || 0}</span>
                                        </button>
                                    </div>

                                    <NestedReplies
                                        postId={post._id}
                                        followupId={discussion._id}
                                        replies={discussion.replies || []}
                                        currentUser={currentUser}
                                        likedReplies={likedFollowups}
                                        onUpdate={onUpdate || (() => { })}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {editingItem && (
                <EditContentModal
                    content={editingItem.content}
                    title={`Edit ${editingItem.type}`}
                    onSave={async (newContent) => {
                        if (editingItem.type === 'post') {
                            await pazzaAPI.updatePost(post._id, { content: newContent });
                        } else {
                            await pazzaAPI.updateFollowUp(post._id, editingItem.id, { content: newContent });
                        }
                        if (onUpdate) onUpdate();
                        setEditingItem(null);
                    }}
                    onClose={() => setEditingItem(null)}
                />
            )}
        </div>
    );
}