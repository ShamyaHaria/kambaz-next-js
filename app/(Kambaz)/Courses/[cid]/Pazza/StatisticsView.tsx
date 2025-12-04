'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import styles from './statistics.module.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

interface StatisticsViewProps {
    courseId: string;
}

export default function StatisticsView({ courseId }: StatisticsViewProps) {
    const courses = useSelector((state: any) => state.coursesReducer.courses);
    const currentCourse = courses.find((c: any) => c._id === courseId);

    const [activeChart, setActiveChart] = useState('Unique users per day');
    const [statisticsData, setStatisticsData] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStatistics();
    }, [courseId]);

    const fetchStatistics = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/pazza/courses/${courseId}/statistics`, {
                withCredentials: true,
            });
            setStatisticsData(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
            setStatisticsData({
                usageByDay: [],
                postsByDay: [],
                categoryBreakdown: {},
                classStats: {
                    totalPosts: 0,
                    totalContributions: 0,
                    uncreditedContributions: 0,
                    instructorResponses: 0,
                    avgResponseTime: 0
                },
                topContributors: [],
                studentParticipation: []
            });
        } finally {
            setLoading(false);
        }
    };

    const uniqueUsersChartData = {
        labels: statisticsData?.usageByDay?.map((d: any) => d.date) || [],
        datasets: [
            {
                label: 'Unique users',
                data: statisticsData?.usageByDay?.map((d: any) => d.uniqueUsers) || [],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const postsPerDayChartData = {
        labels: statisticsData?.postsByDay?.map((d: any) => d.date) || [],
        datasets: [
            {
                label: 'Posts',
                data: statisticsData?.postsByDay?.map((d: any) => d.posts) || [],
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const categoryBreakdownData = {
        labels: Object.keys(statisticsData?.categoryBreakdown || {}),
        datasets: [
            {
                label: 'Concept',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Concept || 0),
                backgroundColor: '#3b82f6',
            },
            {
                label: 'Clarification',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Clarification || 0),
                backgroundColor: '#8b5cf6',
            },
            {
                label: 'Testing',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Testing || 0),
                backgroundColor: '#10b981',
            },
            {
                label: 'Bug',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Bug || 0),
                backgroundColor: '#ef4444',
            },
            {
                label: 'Setup',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Setup || 0),
                backgroundColor: '#f59e0b',
            },
            {
                label: 'Other',
                data: Object.values(statisticsData?.categoryBreakdown || {}).map((c: any) => c?.Other || 0),
                backgroundColor: '#6b7280',
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top' as const,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    precision: 0,
                },
            },
        },
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <p className="text-gray-500 text-center py-12">Loading statistics...</p>
            </div>
        );
    }

    return (
        <div className={styles.statisticsPage}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>
                    {currentCourse?.number || 'CS 5010.MERGED.202610'} Statistics
                </h1>

                {/* Usage Trends Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Usage Trends</h2>

                    <div className={styles.chartContainer}>
                        <div className={styles.chartTabs}>
                            <button
                                onClick={() => setActiveChart('Unique users per day')}
                                className={`${styles.chartTab} ${activeChart === 'Unique users per day' ? styles.chartTabActive : ''}`}
                            >
                                Unique users per day
                            </button>
                            <button
                                onClick={() => setActiveChart('Posts per day')}
                                className={`${styles.chartTab} ${activeChart === 'Posts per day' ? styles.chartTabActive : ''}`}
                            >
                                Posts per day
                            </button>
                            <button
                                onClick={() => setActiveChart('Category breakdown')}
                                className={`${styles.chartTab} ${activeChart === 'Category breakdown' ? styles.chartTabActive : ''}`}
                            >
                                Question category trends
                            </button>
                        </div>

                        <div className={styles.chartContent}>
                            {activeChart === 'Unique users per day' && (
                                statisticsData?.usageByDay?.length > 0 ? (
                                    <Line data={uniqueUsersChartData} options={chartOptions} />
                                ) : (
                                    <div className={styles.emptyChart}>
                                        <p className={styles.emptyChartText}>No usage data yet. Start posting to see trends!</p>
                                    </div>
                                )
                            )}
                            {activeChart === 'Posts per day' && (
                                statisticsData?.postsByDay?.length > 0 ? (
                                    <Line data={postsPerDayChartData} options={chartOptions} />
                                ) : (
                                    <div className={styles.emptyChart}>
                                        <p className={styles.emptyChartText}>No posts data yet. Create posts to see trends!</p>
                                    </div>
                                )
                            )}
                            {activeChart === 'Category breakdown' && (
                                Object.keys(statisticsData?.categoryBreakdown || {}).length > 0 ? (
                                    <Bar data={categoryBreakdownData} options={barChartOptions} />
                                ) : (
                                    <div className={styles.emptyChart}>
                                        <p className={styles.emptyChartText}>No category data yet. Posts with categories will appear here!</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Class At A Glance & Top Contributors */}
                <div className={styles.statsGrid}>
                    <div className={styles.statsCard}>
                        <h2 className={styles.statsCardTitle}>Class At A Glance</h2>
                        <div>
                            <div className={styles.statRow}>
                                <span className={styles.statNumber}>{statisticsData?.classStats?.totalPosts || 0}</span>
                                <span className={styles.statLabel}>total posts *</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statNumber}>{statisticsData?.classStats?.totalContributions || 0}</span>
                                <span className={styles.statLabel}>total contributions **</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statNumber}>{statisticsData?.classStats?.uncreditedContributions || 0}</span>
                                <span className={styles.statLabel}>un-credited contributions ***</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statNumber}>{statisticsData?.classStats?.instructorResponses || 0}</span>
                                <span className={styles.statLabel}>instructors' responses</span>
                            </div>
                            <div className={styles.statRow}>
                                <span className={styles.statNumber}>{statisticsData?.classStats?.avgResponseTime || 0} min</span>
                                <span className={styles.statLabel}>avg. response time</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsCard}>
                        <h2 className={styles.statsCardTitle}>Top Student Contributors</h2>
                        {statisticsData?.topContributors?.length > 0 ? (
                            <ol className={styles.contributorsList}>
                                {statisticsData.topContributors.slice(0, 5).map((contributor: any, index: number) => (
                                    <li key={index} className={styles.contributorItem}>
                                        <div className={styles.contributorName}>
                                            {index + 1}. {contributor.name}
                                        </div>
                                        <div className={styles.contributorStats}>
                                            {contributor.contributions} contributions · {contributor.daysOnline} days online
                                        </div>
                                    </li>
                                ))}
                            </ol>
                        ) : (
                            <p className="text-gray-400 text-center py-8">No contributions yet!</p>
                        )}
                    </div>
                </div>

                {/* Footnotes */}
                <div className={styles.footnotes}>
                    <p>*posts are questions and notes</p>
                    <p>**contributions are posts, responses, edits, followups, and comments to followups (i.e., everything)</p>
                    <p>***un-credited contributions are un-credited fully anonymous contributions to preserve anonymity; they are randomly distributed as more anonymous contributions are submitted.</p>
                </div>

                {/* Student Participation Report */}
                <div className={styles.tableContainer}>
                    <div className={styles.tableHeader}>
                        <h2 className={styles.tableTitle}>Student Participation Report</h2>
                    </div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name, Email</th>
                                <th className={styles.sortable}>days online ▼</th>
                                <th>posts viewed</th>
                                <th>contributions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {statisticsData?.studentParticipation?.length > 0 ? (
                                statisticsData.studentParticipation.map((student: any, index: number) => (
                                    <tr key={index}>
                                        <td>
                                            <div className={styles.studentName}>{student.name}</div>
                                            <div className={styles.studentEmail}>{student.email}</div>
                                        </td>
                                        <td>{student.daysOnline}</td>
                                        <td>{student.postsViewed}</td>
                                        <td>{student.contributions}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className={styles.emptyTable}>
                                        No participation data available yet
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}