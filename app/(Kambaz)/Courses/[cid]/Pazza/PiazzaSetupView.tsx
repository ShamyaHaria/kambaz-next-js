'use client';

import { useSelector } from 'react-redux';
import styles from './pazza.module.css';

interface PiazzaSetupViewProps {
    courseId: string;
}

export default function PiazzaSetupView({ courseId }: PiazzaSetupViewProps) {
    const courses = useSelector((state: any) => state.coursesReducer.courses);
    const currentCourse = courses.find((c: any) => c._id === courseId);

    return (
        <div className={styles.setupPage}>
            {/* Blue Header */}
            <div className={styles.setupHeader}>
                <h1 className={styles.setupHeaderTitle}>piazza</h1>
            </div>

            {/* Gray Background Section */}
            <div className={styles.setupContent}>
                <div className={styles.setupContainer}>
                    <h2 className={styles.setupTitle}>Piazza Setup</h2>

                    {/* School Information Box */}
                    <div className={styles.setupBox}>
                        <h3 className={styles.setupBoxTitle}>School Information</h3>

                        <div className={styles.setupRow}>
                            <span className={styles.setupLabel}>School Name:</span>
                            <input
                                type="text"
                                value="Northeastern University"
                                disabled
                                className={styles.setupInput}
                            />
                        </div>

                        <div className={styles.setupRow}>
                            <span className={styles.setupLabel}>School Email(s):</span>
                            <input
                                type="text"
                                value="neu.edu"
                                disabled
                                className={styles.setupInput}
                            />
                        </div>
                    </div>

                    {/* Piazza Class Does Not Exist Box */}
                    <div className={styles.setupBox}>
                        <h3 className={styles.setupBoxTitle}>Piazza Class Does Not Yet Exist</h3>

                        <div className={styles.setupRow}>
                            <span className={styles.setupLabel}>Class Name:</span>
                            <input
                                type="text"
                                value={currentCourse?.name || 'CS5610 18616 Web Development'}
                                disabled
                                className={styles.setupInput}
                            />
                        </div>

                        <div className={styles.setupRow}>
                            <span className={styles.setupLabel}>Class Number:</span>
                            <input
                                type="text"
                                value={currentCourse?.number || 'CS 5610.18616.202610'}
                                disabled
                                className={styles.setupInput}
                            />
                        </div>

                        <div className={styles.setupRow}>
                            <span className={styles.setupLabel}>Term:</span>
                            <input
                                type="text"
                                value={currentCourse?.term || 'Spring 2026'}
                                disabled
                                className={styles.setupInput}
                            />
                        </div>

                        <p className={styles.setupMessage}>
                            The class instructor or TA has not yet created this class in Piazza. Please ask them to click on the{' '}
                            <span className={styles.setupMessageBold}>Piazza</span> app link in your LMS to create the class!
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.setupFooter}>
                <div className={styles.setupFooterContent}>
                    <div className={styles.setupFooterColumns}>
                        <div className={styles.setupFooterColumn}>
                            <h4 className={styles.setupFooterHeading}>Company</h4>
                            <ul className={styles.setupFooterList}>
                                <li><a href="#" className={styles.setupFooterLink}>Our Story</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Our Investors</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Jobs</a></li>
                            </ul>
                        </div>

                        <div className={styles.setupFooterColumn}>
                            <h4 className={styles.setupFooterHeading}>Product</h4>
                            <ul className={styles.setupFooterList}>
                                <li><a href="#" className={styles.setupFooterLink}>Why Piazza Works</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Features</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Product FAQ</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Instructor FAQ</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>LMS Integration</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Accessibility</a></li>
                            </ul>
                        </div>

                        <div className={styles.setupFooterColumn}>
                            <h4 className={styles.setupFooterHeading}>Support</h4>
                            <ul className={styles.setupFooterList}>
                                <li><a href="#" className={styles.setupFooterLink}>Help</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Contact Us</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Resources For Instructors</a></li>
                            </ul>
                        </div>

                        <div className={styles.setupFooterColumn}>
                            <h4 className={styles.setupFooterHeading}>Links</h4>
                            <ul className={styles.setupFooterList}>
                                <li><a href="#" className={styles.setupFooterLink}>Home</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Blog</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Mobile</a></li>
                                <li><a href="#" className={styles.setupFooterLink}>Login Page</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.setupFooterBottom}>
                        <div className={styles.setupFooterSocial}>
                            <span className={styles.setupFooterSocialText}>Find us on:</span>
                            <a href="#" className={styles.setupFooterSocialIcon}>
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                            <a href="#" className={styles.setupFooterSocialIcon}>
                                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </a>
                        </div>

                        <div className={styles.setupFooterBottomText}>
                            <p className={styles.setupFooterTerms}>
                                Our Terms have changed, you can review the Piazza Terms of Service.
                            </p>
                            <p className={styles.setupFooterCopyright}>
                                Copyright © 2013 Piazza Technologies, Inc. All Rights Reserved.
                            </p>
                            <div className={styles.setupFooterLinks}>
                                <a href="#" className={styles.setupFooterBottomLink}>Privacy Policy</a>
                                <span className={styles.setupFooterDot}>•</span>
                                <a href="#" className={styles.setupFooterBottomLink}>Copyright Policy</a>
                                <span className={styles.setupFooterDot}>•</span>
                                <a href="#" className={styles.setupFooterBottomLink}>Terms of Service</a>
                                <span className={styles.setupFooterDot}>•</span>
                                <a href="#" className={styles.setupFooterBottomLink}>FERPA</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}