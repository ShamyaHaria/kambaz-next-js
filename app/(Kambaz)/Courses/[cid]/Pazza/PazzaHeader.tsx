'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Search, Plus, ChevronDown } from 'lucide-react';
import styles from './pazza.module.css';

interface PazzaHeaderProps {
    courseId: string;
    onNewPost: () => void;
    onShowSetup: () => void;
    onLogout: () => void;
    activePage?: 'Q&A' | 'Resources' | 'Statistics';
    onPageChange?: (page: 'Q&A' | 'Resources' | 'Statistics') => void;
}

export default function PazzaHeader({ courseId, onNewPost, onShowSetup, onLogout, activePage = 'Q&A', onPageChange }: PazzaHeaderProps) {
    const [showCourseDropdown, setShowCourseDropdown] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);

    // Get courses and user from Redux
    const courses = useSelector((state: any) => state.coursesReducer.courses);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    // Find current course
    const currentCourse = courses.find((c: any) => c._id === courseId);

    const handleCourseChange = (newCourseId: string) => {
        setShowCourseDropdown(false);
        window.location.href = `/Courses/${newCourseId}/Pazza`;
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest(`.${styles.courseDropdownContainer}`)) {
                setShowCourseDropdown(false);
            }
            if (!target.closest(`.${styles.userDropdownContainer}`)) {
                setShowUserDropdown(false);
            }
        };

        if (showCourseDropdown || showUserDropdown) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showCourseDropdown, showUserDropdown]);

    const getUserInitials = () => {
        if (!currentUser) return 'U';
        const firstName = currentUser.firstName || '';
        const lastName = currentUser.lastName || '';
        return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
    };

    const getUserFullName = () => {
        if (!currentUser) return 'User';
        return `${currentUser.firstName || ''} ${currentUser.lastName || ''}`.trim() || currentUser.username || 'User';
    };

    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.logo}>pazza</h1>

                    {/* Course Dropdown */}
                    <div className={styles.courseDropdownContainer}>
                        <button
                            className={`${styles.courseDropdownButton} ${showCourseDropdown ? styles.courseDropdownButtonActive : ''}`}
                            onClick={() => setShowCourseDropdown(!showCourseDropdown)}
                        >
                            <span className={styles.courseName}>
                                {currentCourse?.name || currentCourse?.number || 'Select Course'}
                            </span>
                            <span className={styles.courseNumber}>47</span>
                            <ChevronDown size={18} className={styles.dropdownIcon} />
                        </button>

                        {showCourseDropdown && (
                            <div className={styles.courseDropdownMenu}>
                                {courses.map((course: any) => (
                                    <button
                                        key={course._id}
                                        className={`${styles.courseDropdownItem} ${course._id === courseId ? styles.courseDropdownItemActive : ''}`}
                                        onClick={() => handleCourseChange(course._id)}
                                    >
                                        <div className={styles.courseDropdownItemContent}>
                                            <div className={styles.courseDropdownItemHeader}>
                                                <span className={styles.courseDropdownItemCode}>
                                                    {course.number || course.name}
                                                </span>
                                                <span className={styles.courseDropdownItemBadge}>
                                                    {course.term || 'Fall 2025'}
                                                </span>
                                            </div>
                                            <div className={styles.courseDropdownItemName}>
                                                {course.name}
                                            </div>
                                            {course.description && (
                                                <div className={styles.courseDropdownItemSemester}>
                                                    {course.description.substring(0, 50)}...
                                                </div>
                                            )}
                                        </div>
                                        <span className={styles.courseDropdownItemCount}>
                                            {course._id === courseId ? '47' : '0'}
                                        </span>
                                    </button>
                                ))}

                                <div className={styles.courseDropdownDivider} />

                                <button
                                    className={styles.userDropdownItemBlue}
                                    onClick={() => window.location.href = `/Courses/${courseId}/Pazza/setup`}
                                >
                                    <span className={styles.userDropdownIcon}>⚙️</span>
                                    <span>Piazza Settings</span>
                                </button>

                                <button
                                    className={styles.userDropdownItemBlue}
                                    onClick={() => window.location.href = '/Dashboard'}
                                >
                                    <span className={styles.userDropdownIcon}>→</span>
                                    <span>Join Another Class</span>
                                </button>

                                <button
                                    className={styles.userDropdownItemBlue}
                                    onClick={onLogout}>
                                    <span className={styles.userDropdownIcon}>↪</span>
                                    <span>Log Out</span>
                                </button>

                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.headerCenter}>
                    <button 
                        onClick={() => onPageChange?.('Q&A')}
                        className={`${styles.navLink} ${activePage === 'Q&A' ? styles.navLinkActive : ''}`}
                    >
                        Q & A
                    </button>
                    <button 
                        onClick={() => onPageChange?.('Resources')}
                        className={`${styles.navLink} ${activePage === 'Resources' ? styles.navLinkActive : ''}`}
                    >
                        Resources
                    </button>
                    <button 
                        onClick={() => onPageChange?.('Statistics')}
                        className={`${styles.navLink} ${activePage === 'Statistics' ? styles.navLinkActive : ''}`}
                    >
                        Statistics
                    </button>
                </div>

                <div className={styles.headerRight}>
                    <button className={styles.employersButton}>
                        <span>📦</span>
                        <span>Employers</span>
                    </button>

                    {/* User Dropdown */}
                    <div className={styles.userDropdownContainer}>
                        <button
                            className={`${styles.userDropdownButton} ${showUserDropdown ? styles.userDropdownButtonActive : ''}`}
                            onClick={() => setShowUserDropdown(!showUserDropdown)}
                        >
                            <span className={styles.userName}>{getUserFullName()}</span>
                            <div className={styles.avatar}>{getUserInitials()}</div>
                        </button>

                        {showUserDropdown && (
                            <div className={styles.userDropdownMenu}>
                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>⚙️</span>
                                    <span>Account Settings</span>
                                </button>

                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>🎨</span>
                                    <span>Theme</span>
                                    <span className={styles.userDropdownArrow}>›</span>
                                </button>

                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>🌙</span>
                                    <span>Enable Dark Mode</span>
                                </button>

                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>📏</span>
                                    <span>Enable Compact Mode</span>
                                </button>

                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>❓</span>
                                    <span>Support</span>
                                </button>

                                <button className={styles.userDropdownItem}>
                                    <span className={styles.userDropdownIcon}>🐛</span>
                                    <span>Report Bug</span>
                                </button>

                                <button
                                    className={styles.userDropdownItem}
                                    onClick={() => window.location.href = `/Courses/${courseId}/Pazza/setup`}>
                                    <span className={styles.userDropdownIcon}>🏠</span>
                                    <span>Piazza Homepage</span>
                                </button>

                                <div className={styles.courseDropdownDivider} />

                                <button
                                    className={styles.userDropdownItemBlue}
                                    onClick={() => window.location.href = '/Dashboard'}>
                                    <span className={styles.userDropdownIcon}>→</span>
                                    <span>Join Another Class</span>
                                </button>

                                <button
                                    className={styles.userDropdownItemBlue}
                                    onClick={() => {
                                        setShowUserDropdown(false);
                                        onLogout();
                                    }}>
                                    <span className={styles.userDropdownIcon}>↪</span>
                                    <span>Log Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.headerBottom}>
                <button onClick={onNewPost} className={styles.newPostButton}>
                    <Plus size={18} />
                    <span>New Post</span>
                </button>

                <div className={styles.searchBox}>
                    <Search className={styles.searchIcon} size={18} />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.tagsList}>
                    <button className={styles.tagButton}>hw1 <span className={styles.tagCount}>15</span></button>
                    <button className={styles.tagButton}>hw2 <span className={styles.tagCount}>38</span></button>
                    <button className={styles.tagButton}>hw3 <span className={styles.tagCount}>49</span></button>
                    <button className={styles.tagButton}>hw4 <span className={styles.tagCount}>77</span></button>
                    <button className={styles.tagButton}>hw5 <span className={styles.tagCount}>46</span></button>
                    <button className={styles.tagButton}>hw6 <span className={styles.tagCount}>35</span></button>
                    <button className={styles.tagButton}>hw7 <span className={styles.tagCount}>4</span></button>
                    <button className={styles.tagButton}>labs <span className={styles.tagCount}>26</span></button>
                    <button className={styles.tagButton}>code_walks <span className={styles.tagCount}>11</span></button>
                    <button className={styles.tagButton}>logistics <span className={styles.tagCount}>53</span></button>
                </div>
            </div>
        </div>
    );
}