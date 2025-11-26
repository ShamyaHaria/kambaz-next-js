'use client';

import { useRouter } from 'next/navigation';
import { MessageSquare, Eye, FileText, Pin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
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

interface PostCardProps {
    post: Post;
}

export default function PostCard({ post }: PostCardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/Courses/${post.courseId}/Pazza/${post._id}`);
    };

    const getTimeAgo = (date: string) => {
        try {
            return formatDistanceToNow(new Date(date), { addSuffix: true });
        } catch {
            return date;
        }
    };

    const getUnresolvedCount = () => {
        return post.followups.filter(f => !f.isAnswer).length;
    };

    return (
        <div className={styles.postCard} onClick={handleClick}>
            {/* Left Icon */}
            <div className={`${styles.postIcon} ${post.isInstructor ? styles.instructor : styles.student}`}>
                {post.isInstructor ? (
                    <FileText size={20} />
                ) : (
                    <MessageSquare size={20} />
                )}
            </div>

            {/* Content */}
            <div className={styles.postContent}>
                <div className={styles.postHeader}>
                    {post.isPinned && (
                        <Pin size={14} style={{ color: '#6b7280', fill: '#6b7280' }} />
                    )}
                    <span className={`${styles.roleBadge} ${styles[post.author.role]}`}>
                        {post.author.role === 'instructor' ? 'Instr' : post.author.role === 'ta' ? 'TA' : 'Student'}
                    </span>
                </div>

                <h3 className={styles.postTitle}>{post.title}</h3>

                <p className={styles.postExcerpt}>{post.content}</p>

                {post.tags.length > 0 && (
                    <div className={styles.postTags}>
                        {post.tags.map((tag, index) => (
                            <span key={index} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className={styles.postMeta}>
                    <span>{getTimeAgo(post.createdAt)}</span>
                    <span>by {post.author.name}</span>
                </div>
            </div>

            {/* Right Stats */}
            <div className={styles.postStats}>
                {getUnresolvedCount() > 0 && (
                    <div className={styles.unresolvedBadge}>
                        {getUnresolvedCount()} Unresolved followup{getUnresolvedCount() > 1 ? 's' : ''}
                    </div>
                )}

                <div className={styles.statsRow}>
                    <div className={styles.statItem}>
                        <Eye size={14} />
                        <span>{post.views}</span>
                    </div>
                    <div className={styles.statItem}>
                        <MessageSquare size={14} />
                        <span>{post.followups.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}