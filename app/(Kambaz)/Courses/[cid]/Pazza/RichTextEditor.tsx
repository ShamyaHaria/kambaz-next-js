'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2 } from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || 'Enter your question or message here...',
            }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false, // Fix for Next.js SSR
    });

    if (!editor) {
        return null;
    }

    return (
        <div style={{ border: '1px solid #d1d5db', borderRadius: '8px', overflow: 'hidden' }}>
            {/* Toolbar */}
            <div style={{
                display: 'flex',
                gap: '4px',
                padding: '8px',
                background: '#f9fafb',
                borderBottom: '1px solid #d1d5db',
                flexWrap: 'wrap'
            }}>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('bold') ? '#3b82f6' : 'white',
                        color: editor.isActive('bold') ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Bold size={16} />
                    Bold
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('italic') ? '#3b82f6' : 'white',
                        color: editor.isActive('italic') ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Italic size={16} />
                    Italic
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('heading', { level: 1 }) ? '#3b82f6' : 'white',
                        color: editor.isActive('heading', { level: 1 }) ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Heading1 size={16} />
                    H1
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('heading', { level: 2 }) ? '#3b82f6' : 'white',
                        color: editor.isActive('heading', { level: 2 }) ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <Heading2 size={16} />
                    H2
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('bulletList') ? '#3b82f6' : 'white',
                        color: editor.isActive('bulletList') ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <List size={16} />
                    Bullet List
                </button>

                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    style={{
                        padding: '6px 10px',
                        border: '1px solid #d1d5db',
                        borderRadius: '4px',
                        background: editor.isActive('orderedList') ? '#3b82f6' : 'white',
                        color: editor.isActive('orderedList') ? 'white' : '#374151',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}
                >
                    <ListOrdered size={16} />
                    Numbered List
                </button>
            </div>

            {/* Editor Content */}
            <EditorContent
                editor={editor}
                style={{
                    minHeight: '200px',
                    padding: '12px',
                    fontSize: '14px',
                    lineHeight: '1.5'
                }}
            />
        </div>
    );
}