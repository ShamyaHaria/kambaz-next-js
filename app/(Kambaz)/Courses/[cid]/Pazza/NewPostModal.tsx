'use client';

import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { pazzaAPI } from './client';
import styles from './pazza.module.css';

interface NewPostModalProps {
    courseId: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function NewPostModal({ courseId, onClose, onSuccess }: NewPostModalProps) {
    const [category, setCategory] = useState('Concept');
    const [postTo, setPostTo] = useState('Entire Class');
    const [selectedFolder, setSelectedFolder] = useState('hw1');
    const [subject, setSubject] = useState('');
    const [content, setContent] = useState('');
    const [editorType, setEditorType] = useState('Plain text editor');
    const [showName, setShowName] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categories = ['Concept', 'Clarification', 'Testing', 'Bug', 'Setup', 'Other'];
    const folders = ['hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7', 'labs', 'code_walks', 'logistics', 'other'];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject.trim() || !content.trim()) {
            setError('Subject and content are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await pazzaAPI.createPost(courseId, {
                title: subject.trim(),
                content: content.trim(),
                tags: [selectedFolder],
                category: category,
            } as any);

            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveDraft = () => {
        // TODO: Implement save draft functionality
        console.log('Save draft');
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Header */}
                <div className={styles.modalHeader}>
                    <div className={styles.modalHeaderLeft}>
                        <button onClick={onClose} className={styles.backButton}>
                            ←
                        </button>
                        <h2 className={styles.modalTitle}>New Post</h2>
                    </div>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.modalBody}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}

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
                    </div>

                    {/* Content Editor Selection */}
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
                    </div>

                    {/* Content Textarea */}
                    <div className={styles.formGroup}>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your question or message here..."
                            rows={10}
                            className={styles.textArea}
                            required
                        />
                        {editorType === 'Markdown editor' && (
                            <p className={styles.helperText}>
                                Use &lt;md&gt;markdown block&lt;/md&gt; for markdown. Use $$latex formula$$ for LaTeX.
                            </p>
                        )}
                    </div>

                    {/* Show Name */}
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel}>
                            Post as
                        </label>
                        <select
                            value={showName ? 'Shamya Mitesh Haria' : 'Anonymous'}
                            onChange={(e) => setShowName(e.target.value === 'Shamya Mitesh Haria')}
                            className={styles.selectInput}
                        >
                            <option value="Shamya Mitesh Haria">Shamya Mitesh Haria</option>
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
                            {loading ? 'Posting...' : `Post My Question to ${courseId}!`}
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