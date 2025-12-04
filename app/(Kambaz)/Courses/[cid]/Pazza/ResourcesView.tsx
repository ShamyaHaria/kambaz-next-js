'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styles from './Resources/resources.module.css';
import { Plus, X, Upload } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

interface ResourcesViewProps {
    courseId: string;
}

export default function ResourcesView({ courseId }: ResourcesViewProps) {
    const courses = useSelector((state: any) => state.coursesReducer.courses);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const currentCourse = courses.find((c: any) => c._id === courseId);

    const [activeTab, setActiveTab] = useState('Course Information');
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(false);

    // Modal states
    const [showGeneralInfoModal, setShowGeneralInfoModal] = useState(false);
    const [showResourceModal, setShowResourceModal] = useState(false);
    const [showOfficeHoursModal, setShowOfficeHoursModal] = useState(false);
    const [resourceType, setResourceType] = useState('');
    const [editingStaffId, setEditingStaffId] = useState('');

    // Form states
    const [generalInfo, setGeneralInfo] = useState('');
    const [resourceTitle, setResourceTitle] = useState('');
    const [resourceFile, setResourceFile] = useState<File | null>(null);
    const [resourceLink, setResourceLink] = useState('');
    const [officeDays, setOfficeDays] = useState('');
    const [officeTime, setOfficeTime] = useState('');
    const [officeLocation, setOfficeLocation] = useState('');

    const canEdit = currentUser && (currentUser.role === 'FACULTY' || currentUser.role === 'ADMIN');

    useEffect(() => {
        if (activeTab === 'Staff') {
            fetchStaff();
        }
    }, [activeTab, courseId]);

    const fetchStaff = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/pazza/courses/${courseId}/staff`, {
                withCredentials: true,
            });
            setStaff(response.data);
        } catch (error) {
            console.error('Error fetching staff:', error);
        } finally {
            setLoading(false);
        }
    };

    const openOfficeHoursModal = (staffMember: any) => {
        setEditingStaffId(staffMember._id);
        setOfficeDays(staffMember.officeHours?.days || '');
        setOfficeTime(staffMember.officeHours?.time || '');
        setOfficeLocation(staffMember.officeHours?.location || '');
        setShowOfficeHoursModal(true);
    };

    const handleSaveOfficeHours = async () => {
        try {
            await axios.put(
                `${API_BASE}/users/${editingStaffId}/office-hours`,
                {
                    days: officeDays,
                    time: officeTime,
                    location: officeLocation,
                },
                { withCredentials: true }
            );
            setShowOfficeHoursModal(false);
            fetchStaff();
        } catch (error) {
            console.error('Error saving office hours:', error);
            alert('Failed to save office hours');
        }
    };

    const handleSaveGeneralInfo = async () => {
        try {
            console.log('Save general info:', generalInfo);
            setShowGeneralInfoModal(false);
        } catch (error) {
            console.error('Error saving general info:', error);
        }
    };

    const handleSaveResource = async () => {
        try {
            console.log('Save resource:', { resourceType, resourceTitle, resourceFile, resourceLink });
            setShowResourceModal(false);
            setResourceTitle('');
            setResourceFile(null);
            setResourceLink('');
        } catch (error) {
            console.error('Error saving resource:', error);
        }
    };

    const openResourceModal = (type: string) => {
        setResourceType(type);
        setShowResourceModal(true);
    };

    return (
        <div className="bg-white">
            {/* Course Header */}
            <div className={styles.courseHeader}>
                <h1 className={styles.courseTitle}>
                    {currentCourse?.number || 'RS4550'}: {currentCourse?.name || 'Rocket Propulsion'} {currentCourse?.term || 'Fall 2025'}
                </h1>
                <p className={styles.courseSubtitle}>
                    Northeastern University - {currentCourse?.term || 'Fall 2025'}
                </p>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabsWrapper}>
                    <button
                        onClick={() => setActiveTab('Course Information')}
                        className={`${styles.tab} ${activeTab === 'Course Information' ? styles.tabActive : ''}`}
                    >
                        Course Information
                    </button>
                    <button
                        onClick={() => setActiveTab('Staff')}
                        className={`${styles.tab} ${activeTab === 'Staff' ? styles.tabActive : ''}`}
                    >
                        Staff
                    </button>
                    <button
                        onClick={() => setActiveTab('Resources')}
                        className={`${styles.tab} ${activeTab === 'Resources' ? styles.tabActive : ''}`}
                    >
                        Resources
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className={styles.contentWrapper}>
                {activeTab === 'Course Information' && (
                    <div>
                        <div className="mb-16">
                            <h2 className={styles.sectionTitle}>Description</h2>
                            {currentCourse?.description ? (
                                <p className="text-gray-800 leading-relaxed text-base">{currentCourse.description}</p>
                            ) : (
                                <div className={styles.emptyState}>
                                    <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className={styles.emptyText}>No description, yet. Stay tuned!</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className={styles.sectionTitle}>General Information</h2>
                                {canEdit && (
                                    <button
                                        onClick={() => setShowGeneralInfoModal(true)}
                                        className={styles.addButton}
                                    >
                                        <Plus size={18} />
                                        <span>Add Information</span>
                                    </button>
                                )}
                            </div>
                            <div className={styles.emptyState}>
                                <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className={styles.emptyText}>No information, yet. Stay tuned!</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Staff' && (
                    <div>
                        <h2 className={styles.sectionTitle}>Staff Office Hours</h2>

                        {loading ? (
                            <p className="text-gray-500">Loading staff...</p>
                        ) : staff.length === 0 ? (
                            <div className={styles.emptyState}>
                                <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <p className={styles.emptyText}>No staff assigned yet.</p>
                            </div>
                        ) : (
                            <div className={styles.staffList}>
                                {staff.map((member: any) => (
                                    <div key={member._id} className={styles.staffCard}>
                                        <div className={styles.staffAvatar}>
                                            <svg className={styles.staffAvatarIcon} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className={styles.staffInfo}>
                                            <h3 className={styles.staffName}>
                                                {member.firstName} {member.lastName}
                                            </h3>
                                            <div className={styles.staffDetails}>
                                                <div className={styles.staffDetail}>
                                                    <svg className={styles.staffDetailIcon} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{member.officeHours?.time || '--'}</span>
                                                </div>
                                                <div className={styles.staffDetail}>
                                                    <svg className={styles.staffDetailIcon} fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>{member.officeHours?.location || '--'}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {currentUser?._id === member._id && (
                                            <button
                                                onClick={() => openOfficeHoursModal(member)}
                                                className={styles.editOfficeHoursButton}
                                            >
                                                <Plus size={16} />
                                                <span>Edit Hours</span>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'Resources' && (
                    <div className={styles.resourcesGrid}>
                        {['Homework', 'Homework Solutions', 'Lecture Notes', 'General Resources'].map((section) => (
                            <div key={section}>
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className={styles.sectionTitle}>{section}</h2>
                                    {canEdit && (
                                        <button
                                            onClick={() => openResourceModal(section)}
                                            className={styles.addButton}
                                        >
                                            <Plus size={18} />
                                            <span>Add Resource</span>
                                        </button>
                                    )}
                                </div>
                                <div className={styles.emptyState}>
                                    <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className={styles.emptyText}>Nothing has been added to the {section} section, yet. Stay tuned!</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modals - same as before */}
            {showGeneralInfoModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Add General Information</h3>
                            <button onClick={() => setShowGeneralInfoModal(false)} className={styles.modalClose}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <textarea
                                value={generalInfo}
                                onChange={(e) => setGeneralInfo(e.target.value)}
                                placeholder="Enter general information..."
                                rows={8}
                                className={styles.modalTextarea}
                            />
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setShowGeneralInfoModal(false)} className={styles.modalButtonCancel}>
                                Cancel
                            </button>
                            <button onClick={handleSaveGeneralInfo} className={styles.modalButtonSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showOfficeHoursModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Edit Office Hours</h3>
                            <button onClick={() => setShowOfficeHoursModal(false)} className={styles.modalClose}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Days *</label>
                                    <input
                                        type="text"
                                        value={officeDays}
                                        onChange={(e) => setOfficeDays(e.target.value)}
                                        placeholder="e.g., Mon, Wed, Fri"
                                        className={styles.modalInput}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
                                    <input
                                        type="text"
                                        value={officeTime}
                                        onChange={(e) => setOfficeTime(e.target.value)}
                                        placeholder="e.g., 2:00 PM - 4:00 PM"
                                        className={styles.modalInput}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                                    <input
                                        type="text"
                                        value={officeLocation}
                                        onChange={(e) => setOfficeLocation(e.target.value)}
                                        placeholder="e.g., Room 301, Building A"
                                        className={styles.modalInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setShowOfficeHoursModal(false)} className={styles.modalButtonCancel}>
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveOfficeHours}
                                disabled={!officeDays.trim() || !officeTime.trim() || !officeLocation.trim()}
                                className={styles.modalButtonSave}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showResourceModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Add {resourceType}</h3>
                            <button onClick={() => setShowResourceModal(false)} className={styles.modalClose}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={resourceTitle}
                                        onChange={(e) => setResourceTitle(e.target.value)}
                                        placeholder="Enter resource title"
                                        className={styles.modalInput}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                                    <div className={styles.uploadArea}>
                                        <input
                                            type="file"
                                            onChange={(e) => setResourceFile(e.target.files?.[0] || null)}
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer block">
                                            <Upload className={styles.uploadIcon} size={48} />
                                            <p className={styles.uploadText}>
                                                {resourceFile ? resourceFile.name : 'Click to upload or drag and drop'}
                                            </p>
                                            <p className={styles.uploadSubtext}>PDF, DOC, PPT up to 10MB</p>
                                        </label>
                                    </div>
                                </div>
                                <div className="text-center text-gray-500 text-sm font-medium">OR</div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Add Link</label>
                                    <input
                                        type="url"
                                        value={resourceLink}
                                        onChange={(e) => setResourceLink(e.target.value)}
                                        placeholder="https://example.com/resource"
                                        className={styles.modalInput}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={styles.modalFooter}>
                            <button onClick={() => setShowResourceModal(false)} className={styles.modalButtonCancel}>
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveResource}
                                disabled={!resourceTitle.trim() || (!resourceFile && !resourceLink.trim())}
                                className={styles.modalButtonSave}
                            >
                                Add Resource
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}