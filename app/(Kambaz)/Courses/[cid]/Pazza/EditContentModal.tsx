'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import styles from './pazza.module.css';

interface EditContentModalProps {
    content: string;
    onSave: (newContent: string) => Promise<void>;
    onClose: () => void;
    title?: string;
}

export default function EditContentModal({ content, onSave, onClose, title = 'Edit Content' }: EditContentModalProps) {
    const [editedContent, setEditedContent] = useState(content);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!editedContent.trim()) {
            alert('Content cannot be empty');
            return;
        }

        setSaving(true);
        try {
            await onSave(editedContent.trim());
            onClose();
        } catch (error) {
            console.error('Error saving:', error);
            alert('Failed to save changes');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.editModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.editModalHeader}>
                    <h3>{title}</h3>
                    <button onClick={onClose} className={styles.closeButton}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.editModalBody}>
                    <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className={styles.editTextarea}
                        rows={8}
                        autoFocus
                    />
                </div>

                <div className={styles.editModalFooter}>
                    <button onClick={onClose} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving || !editedContent.trim()}
                        className={styles.submitButton}
                    >
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
}