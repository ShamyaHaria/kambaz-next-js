'use client';
import { useState } from 'react';
import CreatePostModal from './CreatePostModal';
interface NewPostButtonProps {
    courseId: string;
    folders: any[];
}
export default function NewPostButton({ courseId, folders }: NewPostButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium text-sm flex items-center gap-2 shadow-sm transition-colors"
            >
                <span className="text-lg">+</span> New Post
            </button>
            <CreatePostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                courseId={courseId}
                folders={folders}
            />
        </>
    );
}