import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:4000/api';

const pazzaClient = axios.create({
    baseURL: `${API_BASE}/pazza`,
    withCredentials: true,
});

export const pazzaAPI = {
    // Posts
    getPosts: (courseId: string, filters?: { tags?: string[]; pinned?: boolean }) =>
        pazzaClient.get(`/courses/${courseId}/posts`, { params: filters }),

    getPost: (postId: string) =>
        pazzaClient.get(`/posts/${postId}`),

    createPost: (courseId: string, data: { title: string; content: string; tags: string[] }) =>
        pazzaClient.post(`/courses/${courseId}/posts`, data),

    updatePost: (postId: string, data: { title?: string; content?: string; tags?: string[] }) =>
        pazzaClient.put(`/posts/${postId}`, data),

    deletePost: (postId: string) =>
        pazzaClient.delete(`/posts/${postId}`),

    togglePin: (postId: string) =>
        pazzaClient.patch(`/posts/${postId}/pin`),

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

    likeFollowUp: (postId: string, followupId: string) =>
        pazzaClient.post(`/posts/${postId}/followups/${followupId}/like`),

    // Stats
    getCourseStats: (courseId: string) =>
        pazzaClient.get(`/courses/${courseId}/stats`),
};

export default pazzaClient;