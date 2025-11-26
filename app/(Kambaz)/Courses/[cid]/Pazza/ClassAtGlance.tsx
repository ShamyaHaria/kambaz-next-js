'use client';

import { Users, MessageSquare, GraduationCap, AlertCircle, Apple } from 'lucide-react';
import styles from './pazza.module.css';

interface CourseStats {
    totalPosts: number;
    totalContributions: number;
    studentsEnrolled: number;
    unreadPosts: number;
    unansweredQuestions: number;
    unansweredFollowups: number;
    instructorResponses: number;
    studentResponses: number;
}

interface ClassAtGlanceProps {
    stats: CourseStats | null;
}

export default function ClassAtGlance({ stats }: ClassAtGlanceProps) {
    if (!stats) return null;

    return (
        <div className={styles.glanceCard}>
            <h2 className={styles.glanceTitle}>Class at a Glance</h2>

            {/* Needs Attention Row */}
            <div className={styles.attentionRow}>
                <div className={styles.attentionCard}>
                    <div className={styles.attentionHeader}>
                        <AlertCircle size={18} />
                        <span className={styles.attentionLabel}>Needs Attention</span>
                    </div>
                    <p className={styles.attentionNumber}>{stats.unreadPosts}</p>
                    <p className={styles.attentionText}>unread posts</p>
                </div>

                <div className={styles.attentionCard}>
                    <div className={styles.attentionHeader}>
                        <AlertCircle size={18} />
                        <span className={styles.attentionLabel}>Needs Attention</span>
                    </div>
                    <p className={styles.attentionNumber}>{stats.unansweredQuestions}</p>
                    <p className={styles.attentionText}>unanswered questions</p>
                </div>

                <div className={styles.attentionCard}>
                    <div className={styles.attentionHeader}>
                        <AlertCircle size={18} />
                        <span className={styles.attentionLabel}>Needs Attention</span>
                    </div>
                    <p className={styles.attentionNumber}>{stats.unansweredFollowups}</p>
                    <p className={styles.attentionText}>unanswered followups</p>
                </div>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
                <div className={styles.statCard}>
                    <Users className={styles.statIcon} size={36} style={{ color: '#6b7280' }} />
                    <div>
                        <p className={styles.statNumber}>{stats.totalPosts}</p>
                        <p className={styles.statLabel}>Total Posts</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <MessageSquare className={styles.statIcon} size={36} style={{ color: '#6b7280' }} />
                    <div>
                        <p className={styles.statNumber}>{stats.totalContributions}</p>
                        <p className={styles.statLabel}>Total Contributions</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <GraduationCap className={styles.statIcon} size={36} style={{ color: '#6b7280' }} />
                    <div>
                        <p className={styles.statNumber}>{stats.studentsEnrolled}</p>
                        <p className={styles.statLabel}>Students Enrolled</p>
                    </div>
                </div>
            </div>

            {/* License Section */}
            <div className={styles.licenseSection}>
                <p className={styles.licenseLabel}>License Status</p>
                <p className={styles.licenseStatus}>active instructor license</p>
            </div>

            {/* Engagement Row */}
            <div className={styles.engagementRow}>
                <div className={styles.engagementCard}>
                    <p className={styles.engagementLabel}>Instructor Engagement</p>
                    <div className={styles.engagementContent}>
                        <Apple size={32} style={{ color: '#6b7280' }} />
                        <div>
                            <p className={styles.engagementNumber}>{stats.instructorResponses}</p>
                            <p className={styles.engagementText}>instructor responses</p>
                        </div>
                    </div>
                </div>

                <div className={styles.engagementCard}>
                    <p className={styles.engagementLabel}>Student Participation</p>
                    <div className={styles.engagementContent}>
                        <Users size={32} style={{ color: '#6b7280' }} />
                        <div>
                            <p className={styles.engagementNumber}>{stats.studentResponses}</p>
                            <p className={styles.engagementText}>student responses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}