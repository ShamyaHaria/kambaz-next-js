'use client';

import { Search, Plus } from 'lucide-react';
import styles from './pazza.module.css';

interface PazzaHeaderProps {
    courseId: string;
    onNewPost: () => void;
}

export default function PazzaHeader({ courseId, onNewPost }: PazzaHeaderProps) {
    return (
        <div className={styles.header}>
            <div className={styles.headerTop}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.logo}>pazza</h1>
                    <div className={styles.courseInfo}>
                        <span className={styles.courseName}>CS 5010.MERGED.202610</span>
                        <span className={styles.courseNumber}>47</span>
                    </div>
                </div>

                <div className={styles.headerCenter}>
                    <a href="#" className={styles.navLink}>Q & A</a>
                    <a href="#" className={styles.navLink}>Resources</a>
                    <a href="#" className={styles.navLink}>Statistics</a>
                </div>

                <div className={styles.headerRight}>
                    <button className={styles.employersButton}>
                        <span>📦</span>
                        <span>Employers</span>
                    </button>
                    <div className={styles.userInfo}>
                        <span>Shamya Mitesh Haria</span>
                        <div className={styles.avatar}>S</div>
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