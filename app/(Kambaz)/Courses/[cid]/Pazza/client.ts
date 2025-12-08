import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

const pazzaClient = axios.create({
    baseURL: `${API_BASE}/pazza`,
    withCredentials: true,
});

export const pazzaAPI = {
    // Posts
    getPosts: (courseId: string, filters?: { tags?: string; pinned?: boolean }) =>
        pazzaClient.get(`/courses/${courseId}/posts`, { params: filters }),

    getPost: (postId: string) =>
        pazzaClient.get(`/posts/${postId}`),

    createPost: (courseId: string, data: { title: string; content: string; tags: string[]; category?: string }) =>
        pazzaClient.post(`/courses/${courseId}/posts`, data),

    updatePost: (postId: string, data: { title?: string; content?: string; tags?: string[] }) =>
        pazzaClient.put(`/posts/${postId}`, data),

    deletePost: (postId: string) =>
        pazzaClient.delete(`/posts/${postId}`),

    togglePin: (postId: string) =>
        pazzaClient.patch(`/posts/${postId}/pin`),

    incrementView: (postId: string) =>
        pazzaClient.post(`/posts/${postId}/view`),

    // Interactions
    likePost: (postId: string) =>
        pazzaClient.post(`/posts/${postId}/like`),

    bookmarkPost: (postId: string) =>
        pazzaClient.post(`/posts/${postId}/bookmark`),

    starPost: (postId: string) =>
        pazzaClient.post(`/posts/${postId}/star`),

    // Followups
    createFollowUp: (postId: string, data: { content: string; isAnswer?: boolean }) =>
        pazzaClient.post(`/posts/${postId}/followups`, data),

    deleteFollowUp: (postId: string, followupId: string) =>
        pazzaClient.delete(`/posts/${postId}/followups/${followupId}`),

    likeFollowUp: (postId: string, followupId: string) =>
        pazzaClient.post(`/posts/${postId}/followups/${followupId}/like`),

    // Replies (NESTED REPLIES - ADD THESE THREE)
    createReply: (postId: string, followupId: string, data: { content: string }) =>
        pazzaClient.post(`/posts/${postId}/followups/${followupId}/replies`, data),

    deleteReply: (postId: string, followupId: string, replyId: string) =>
        pazzaClient.delete(`/posts/${postId}/followups/${followupId}/replies/${replyId}`),

    likeReply: (postId: string, followupId: string, replyId: string) =>
        pazzaClient.post(`/posts/${postId}/followups/${followupId}/replies/${replyId}/like`),

    // Stats
    getCourseStats: (courseId: string) =>
        pazzaClient.get(`/courses/${courseId}/stats`),

    // AI
    generateAIAnswer: (postId: string, data: { title: string; content: string; tags: string[]; category: string }) =>
        pazzaClient.post(`/posts/${postId}/ai-answer`, data),

    markAsResolved: (postId: string, resolvedByAI: boolean) =>
        pazzaClient.post(`/posts/${postId}/resolve`, { resolvedByAI }),

    updateFollowUp: (postId: string, followupId: string, data: { content: string }) =>
        pazzaClient.put(`/posts/${postId}/followups/${followupId}`, data),

    updateReply: (postId: string, followupId: string, replyId: string, data: { content: string }) =>
        pazzaClient.put(`/posts/${postId}/followups/${followupId}/replies/${replyId}`, data),
};

export default pazzaClient;