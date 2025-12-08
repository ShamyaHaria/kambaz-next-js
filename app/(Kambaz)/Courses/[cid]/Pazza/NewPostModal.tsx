'use client';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { pazzaAPI } from './client';
import RichTextEditor from './RichTextEditor';
import styles from './pazza.module.css';

interface NewPostModalProps {
    courseId: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function NewPostModal({ courseId, onClose, onSuccess }: NewPostModalProps) {
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);

    const [postType, setPostType] = useState<'Question' | 'Note' | 'Poll'>('Question');
    const [category, setCategory] = useState('Concept');
    const [postTo, setPostTo] = useState('Entire Class');
    const [selectedFolder, setSelectedFolder] = useState('hw1');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [editorType, setEditorType] = useState('Rich text editor');
    const [showName, setShowName] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [errors, setErrors] = useState({
        subject: '',
        content: '',
        folder: ''
    });

    const categories = ['Concept', 'Clarification', 'Testing', 'Bug', 'Setup', 'Other'];
    const folders = ['hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'labs', 'code_walks', 'logistics', 'other'];

    const userFullName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`.trim() || currentUser.username
        : 'User';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            subject: '',
            content: '',
            folder: ''
        };

        if (!subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!content.trim()) {
            newErrors.content = 'Content is required';
        }

        if (!selectedFolder) {
            newErrors.folder = 'Please select at least one folder';
        }

        setErrors(newErrors);

        if (newErrors.subject || newErrors.content || newErrors.folder) {
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await pazzaAPI.createPost(courseId, {
                title: subject.trim(),
                content: content.trim(),
                tags: [selectedFolder],
                category: category,
                type: postType,
                visibility: postTo === 'Entire Class' ? 'entire_class' : 'instructors_only',
            } as any);

            console.log('Post created successfully:', response.data);
            onSuccess();
            onClose();
        } catch (err: any) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.error || err.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = () => {
        console.log('Save draft');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <div className={styles.modalHeaderLeft}>
                        <button type="button" onClick={onClose} className={styles.backButton}>
                            ←
                        </button>
                        <h2 className={styles.modalTitle}>New Post</h2>
                    </div>
                    <button type="button" onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

                    {/* Post Type Tabs - REQUIRED BY RUBRIC */}
                    <div className={styles.formGroup}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', borderBottom: '2px solid #e5e7eb' }}>
                            <button
                                type="button"
                                onClick={() => setPostType('Question')}
                                style={{
                                    padding: '12px 24px',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: postType === 'Question' ? '3px solid #2563eb' : '3px solid transparent',
                                    color: postType === 'Question' ? '#2563eb' : '#6b7280',
                                    fontWeight: postType === 'Question' ? '600' : '400',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Question
                            </button>
                            <button
                                type="button"
                                onClick={() => setPostType('Note')}
                                style={{
                                    padding: '12px 24px',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: postType === 'Note' ? '3px solid #2563eb' : '3px solid transparent',
                                    color: postType === 'Note' ? '#2563eb' : '#6b7280',
                                    fontWeight: postType === 'Note' ? '600' : '400',
                                    cursor: 'pointer',
                                    fontSize: '16px'
                                }}
                            >
                                Note
                            </button>
                            <button
                                type="button"
                                onClick={() => setPostType('Poll')}
                                disabled
                                style={{
                                    padding: '12px 24px',
                                    border: 'none',
                                    background: 'transparent',
                                    borderBottom: postType === 'Poll' ? '3px solid #2563eb' : '3px solid transparent',
                                    color: '#9ca3af',
                                    fontWeight: '400',
                                    cursor: 'not-allowed',
                                    fontSize: '16px',
                                    opacity: 0.5
                                }}
                            >
                                Poll (Coming Soon)
                            </button>
                        </div>
                    </div>

                    {/* Category Selection */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            What category does your question fall under?<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.categoryButtons}>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => setCategory(cat)}
                                    className={`${styles.categoryButton} ${category === cat ? styles.categoryButtonActive : ''}`}
                                >
                                    {category === cat ? '●' : '○'} {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Post To */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Post To<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="postTo"
                                    value="Entire Class"
                                    checked={postTo === 'Entire Class'}
                                    onChange={(e) => setPostTo(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span>Entire Class</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="postTo"
                                    value="Instructor(s)"
                                    checked={postTo === 'Instructor(s)'}
                                    onChange={(e) => setPostTo(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span>Instructor(s)</span>
                            </label>
                        </div>
                    </div>

                    {/* Select Folder */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Select Folder(s)<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.folderButtons}>
                            {folders.map((folder) => (
                                <button
                                    key={folder}
                                    type="button"
                                    onClick={() => setSelectedFolder(folder)}
                                    className={`${styles.folderButton} ${selectedFolder === folder ? styles.folderButtonActive : ''}`}
                                >
                                    {folder}
                                </button>
                            ))}
                        </div>
                        {errors.folder && (
                            <div style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
                                {errors.folder}
                            </div>
                        )}
                    </div>

                    {/* Subject */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Subject<span className={styles.required}>*</span>
                        </label>
                        <input
                            type="text"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="Enter a one line summary, 100 characters or less"
                            maxLength={100}
                            className={styles.textInput}
                            required
                        />
                        {errors.subject && (
                            <div style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
                                {errors.subject}
                            </div>
                        )}
                    </div>

                    {/* Content Editor Selection - Keep all options, Rich Text as default */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            What do you need help with?<span className={styles.required}>*</span>
                        </label>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="editorType"
                                    value="Rich text editor"
                                    checked={editorType === 'Rich text editor'}
                                    onChange={(e) => setEditorType(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span>Rich text editor</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="editorType"
                                    value="Plain text editor"
                                    checked={editorType === 'Plain text editor'}
                                    onChange={(e) => setEditorType(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span>Plain text editor</span>
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="editorType"
                                    value="Markdown editor"
                                    checked={editorType === 'Markdown editor'}
                                    onChange={(e) => setEditorType(e.target.value)}
                                    className={styles.radioInput}
                                />
                                <span>Markdown editor</span>
                            </label>
                        </div>
                        {errors.content && (
                            <div style={{ color: '#dc2626', fontSize: '13px', marginTop: '4px' }}>
                                {errors.content}
                            </div>
                        )}
                    </div>

                    {/* Conditional Editor Rendering */}
                    <div className={styles.formGroup}>
                        {editorType === 'Rich text editor' && (
                            <RichTextEditor
                                content={content}
                                onChange={setContent}
                                placeholder="Enter your question or message here..."
                            />
                        )}

                        {editorType === 'Plain text editor' && (
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter your question or message here..."
                                rows={10}
                                className={styles.textArea}
                                required
                            />
                        )}

                        {editorType === 'Markdown editor' && (
                            <>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Enter your question or message here..."
                                    rows={10}
                                    className={styles.textArea}
                                    required
                                />
                                <p className={styles.helperText}>
                                    Use &lt;md&gt;markdown block&lt;/md&gt; for markdown. Use $$latex formula$$ for LaTeX.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Show Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Post as
                        </label>
                        <select
                            value={showName ? userFullName : 'Anonymous'}
                            onChange={(e) => setShowName(e.target.value === userFullName)}
                            className={styles.selectInput}
                        >
                            <option value={userFullName}>{userFullName}</option>
                            <option value="Anonymous">Anonymous</option>
                        </select>
                    </div>

                    <p className={styles.requiredNote}>* Required fields</p>

                    {/* Actions */}
                    <div className={styles.modalActions}>
                        <button
                            type="submit"
                            disabled={loading}
                            className={styles.submitButton}
                        >
                            {loading ? 'Posting...' : `Post My ${postType} to ${courseId}!`}
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            className={styles.draftButton}
                        >
                            Save Draft
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className={styles.cancelButton}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}