'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit, Save, X, Trash2 } from 'lucide-react';
import { pazzaAPI } from './client';

interface ManageFoldersProps {
    courseId: string;
}

export default function ManageFolders({ courseId }: ManageFoldersProps) {
    const [folders, setFolders] = useState<string[]>([
        'hw1', 'hw2', 'hw3', 'hw4', 'hw5', 'hw6', 'hw7',
        'labs', 'code_walks', 'logistics', 'other', 'office_hours'
    ]);
    const [newFolderName, setNewFolderName] = useState('');
    const [editingFolder, setEditingFolder] = useState<string | null>(null);
    const [editedName, setEditedName] = useState('');
    const [selectedFolders, setSelectedFolders] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(false);

    const handleAddFolder = () => {
        if (!newFolderName.trim()) {
            alert('Please enter a folder name');
            return;
        }

        if (folders.includes(newFolderName.trim())) {
            alert('Folder already exists');
            return;
        }

        setFolders([...folders, newFolderName.trim()]);
        setNewFolderName('');
    };

    const handleStartEdit = (folder: string) => {
        setEditingFolder(folder);
        setEditedName(folder);
    };

    const handleSaveEdit = () => {
        if (!editedName.trim()) {
            alert('Folder name cannot be empty');
            return;
        }

        if (editedName !== editingFolder && folders.includes(editedName.trim())) {
            alert('Folder name already exists');
            return;
        }

        setFolders(folders.map(f => f === editingFolder ? editedName.trim() : f));
        setEditingFolder(null);
        setEditedName('');
    };

    const handleCancelEdit = () => {
        setEditingFolder(null);
        setEditedName('');
    };

    const handleToggleSelect = (folder: string) => {
        const newSelected = new Set(selectedFolders);
        if (newSelected.has(folder)) {
            newSelected.delete(folder);
        } else {
            newSelected.add(folder);
        }
        setSelectedFolders(newSelected);
    };

    const handleDeleteSelected = () => {
        if (selectedFolders.size === 0) {
            alert('Please select folders to delete');
            return;
        }

        if (!confirm(`Delete ${selectedFolders.size} folder(s)?`)) {
            return;
        }

        setFolders(folders.filter(f => !selectedFolders.has(f)));
        setSelectedFolders(new Set());
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', padding: '32px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '8px' }}>
                    Manage Folders
                </h2>
                <p style={{ color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>
                    Configure class folders to organize questions and discussions
                </p>

                <div style={{ marginBottom: '32px', padding: '20px', background: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '12px', fontSize: '14px' }}>
                        Add New Folder
                    </label>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAddFolder()}
                            placeholder="Enter folder name (e.g., hw8, project, exam)"
                            style={{
                                flex: 1,
                                padding: '10px 16px',
                                border: '2px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '14px'
                            }}
                        />
                        <button
                            onClick={handleAddFolder}
                            style={{
                                padding: '10px 24px',
                                background: '#2563eb',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px',
                                transition: 'all 0.2s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
                            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
                        >
                            <Plus size={18} />
                            Add Folder
                        </button>
                    </div>
                </div>

                {selectedFolders.size > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <button
                            onClick={handleDeleteSelected}
                            style={{
                                padding: '10px 20px',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                fontSize: '14px'
                            }}
                        >
                            <Trash2 size={16} />
                            Delete {selectedFolders.size} Selected Folder(s)
                        </button>
                    </div>
                )}

                <div style={{ marginBottom: '16px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>
                    Current Folders ({folders.length})
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {folders.map((folder, index) => (
                        <div
                            key={folder}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px 16px',
                                background: selectedFolders.has(folder) ? '#eff6ff' : '#ffffff',
                                border: selectedFolders.has(folder) ? '2px solid #3b82f6' : '1px solid #e5e7eb',
                                borderRadius: '8px',
                                transition: 'all 0.2s'
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={selectedFolders.has(folder)}
                                onChange={() => handleToggleSelect(folder)}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />

                            <span style={{
                                minWidth: '40px',
                                color: '#6b7280',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}>
                                {index + 1}.
                            </span>

                            {editingFolder === folder ? (
                                <>
                                    <input
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                                        autoFocus
                                        style={{
                                            flex: 1,
                                            padding: '8px 12px',
                                            border: '2px solid #3b82f6',
                                            borderRadius: '6px',
                                            fontSize: '14px',
                                            fontWeight: '500'
                                        }}
                                    />
                                    <button
                                        onClick={handleSaveEdit}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#10b981',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <Save size={14} />
                                        Save
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        style={{
                                            padding: '8px 16px',
                                            background: '#6b7280',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <X size={14} />
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span style={{
                                        flex: 1,
                                        fontSize: '15px',
                                        fontWeight: '500',
                                        color: '#111827'
                                    }}>
                                        {folder}
                                    </span>
                                    <button
                                        onClick={() => handleStartEdit(folder)}
                                        style={{
                                            padding: '6px 14px',
                                            background: '#eff6ff',
                                            color: '#2563eb',
                                            border: '1px solid #bfdbfe',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            fontSize: '13px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        <Edit size={14} />
                                        Edit
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {folders.length === 0 && (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px',
                        color: '#9ca3af',
                        background: '#f9fafb',
                        borderRadius: '8px',
                        border: '1px dashed #d1d5db'
                    }}>
                        No folders yet. Add your first folder above!
                    </div>
                )}
            </div>
        </div>
    );
}