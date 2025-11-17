// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// interface CreatePostModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     courseId: string;
//     folders: any[];
// }
// export default function CreatePostModal({ isOpen, onClose, courseId, folders }: CreatePostModalProps) {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         type: 'question' as 'question' | 'note',
//         folderId: '',
//         title: '',
//         content: '',
//         category: '',
//         isAnonymous: false,
//     });
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await fetch('/api/pazza/posts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     courseId,
//                     folderId: formData.folderId,
//                     authorId: 'user-123',
//                     type: formData.type,
//                     title: formData.title,
//                     content: formData.content,
//                     category: formData.category || undefined,
//                     isAnonymous: formData.isAnonymous,
//                 }),
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setFormData({
//                     type: 'question',
//                     folderId: '',
//                     title: '',
//                     content: '',
//                     category: '',
//                     isAnonymous: false,
//                 });
//                 onClose();
//                 router.refresh();
//             } else {
//                 alert('Failed to create post: ' + data.error);
//             }
//         } catch (error) {
//             console.error('Error creating post:', error);
//             alert('Failed to create post');
//         } finally {
//             setLoading(false);
//         }
//     };
//     if (!isOpen) return null;
//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//             <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//                 { }
//                 <div className="flex items-center justify-between p-6 border-b border-gray-200">
//                     <h2 className="text-2xl font-bold text-gray-900">Create New Post</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-600 text-2xl"
//                     >
//                         ×
//                     </button>
//                 </div>
//                 { }
//                 <form onSubmit={handleSubmit} className="p-6">
//                     { }
//                     <div className="mb-6">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Post Type
//                         </label>
//                         <div className="flex gap-4">
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="type"
//                                     value="question"
//                                     checked={formData.type === 'question'}
//                                     onChange={(e) => setFormData({ ...formData, type: 'question' })}
//                                     className="mr-2"
//                                 />
//                                 <span className="text-sm">❓ Question</span>
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="radio"
//                                     name="type"
//                                     value="note"
//                                     checked={formData.type === 'note'}
//                                     onChange={(e) => setFormData({ ...formData, type: 'note' })}
//                                     className="mr-2"
//                                 />
//                                 <span className="text-sm">📝 Note</span>
//                             </label>
//                         </div>
//                     </div>
//                     { }
//                     <div className="mb-6">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Folder <span className="text-red-500">*</span>
//                         </label>
//                         <select
//                             required
//                             value={formData.folderId}
//                             onChange={(e) => setFormData({ ...formData, folderId: e.target.value })}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         >
//                             <option value="">Select a folder...</option>
//                             {folders.map((folder) => (
//                                 <option key={folder._id} value={folder._id}>
//                                     {folder.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     { }
//                     {formData.type === 'question' && (
//                         <div className="mb-6">
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                 Category (Optional) - Your Unique Feature! 🌟
//                             </label>
//                             <select
//                                 value={formData.category}
//                                 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//                                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             >
//                                 <option value="">Select a category...</option>
//                                 <option value="bug">🐛 Bug</option>
//                                 <option value="concept">💡 Concept</option>
//                                 <option value="testing">🧪 Testing</option>
//                                 <option value="setup">⚙️ Setup</option>
//                                 <option value="other">📌 Other</option>
//                             </select>
//                         </div>
//                     )}
//                     { }
//                     <div className="mb-6">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Title <span className="text-red-500">*</span>
//                         </label>
//                         <input
//                             type="text"
//                             required
//                             maxLength={200}
//                             value={formData.title}
//                             onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                             placeholder="Enter a clear, descriptive title..."
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                             {formData.title.length}/200 characters
//                         </p>
//                     </div>
//                     { }
//                     <div className="mb-6">
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                             Content <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                             required
//                             value={formData.content}
//                             onChange={(e) => setFormData({ ...formData, content: e.target.value })}
//                             placeholder="Describe your question or note in detail..."
//                             rows={8}
//                             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                         />
//                         <p className="text-xs text-gray-500 mt-1">
//                             You can use basic HTML tags like &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;
//                         </p>
//                     </div>
//                     { }
//                     <div className="mb-6">
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 checked={formData.isAnonymous}
//                                 onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
//                                 className="mr-2"
//                             />
//                             <span className="text-sm text-gray-700">Post anonymously</span>
//                         </label>
//                     </div>
//                     { }
//                     <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             {loading ? 'Creating...' : 'Create Post'}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }