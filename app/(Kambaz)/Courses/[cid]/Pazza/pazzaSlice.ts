import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
    _id: string;
    courseId: string;
    title: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    tags: string[];
    isPinned: boolean;
    isInstructor: boolean;
    views: number;
    likes: number;
    bookmarked: boolean;
    starred: boolean;
    followups: FollowUp[];
    createdAt: string;
    updatedAt: string;
}

interface FollowUp {
    _id: string;
    postId: string;
    content: string;
    author: {
        _id: string;
        name: string;
        role: 'student' | 'instructor' | 'ta';
    };
    isAnswer: boolean;
    likes: number;
    createdAt: string;
}

interface CourseStats {
    totalPosts: number;
    totalContributions: number;
    studentsEnrolled: number;
    unreadPosts: number;
    unansweredQuestions: number;
    unansweredFollowups: number;
    instructorResponses: number;
    studentResponses: number;
}

interface PazzaState {
    posts: Post[];
    currentPost: Post | null;
    stats: CourseStats | null;
    selectedTags: string[];
    loading: boolean;
    error: string | null;
}

const initialState: PazzaState = {
    posts: [],
    currentPost: null,
    stats: null,
    selectedTags: [],
    loading: false,
    error: null,
};

const pazzaSlice = createSlice({
    name: 'pazza',
    initialState,
    reducers: {
        setPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },
        setCurrentPost: (state, action: PayloadAction<Post | null>) => {
            state.currentPost = action.payload;
        },
        setStats: (state, action: PayloadAction<CourseStats>) => {
            state.stats = action.payload;
        },
        addPost: (state, action: PayloadAction<Post>) => {
            state.posts.unshift(action.payload);
        },
        updatePost: (state, action: PayloadAction<Post>) => {
            const index = state.posts.findIndex(p => p._id === action.payload._id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
            if (state.currentPost?._id === action.payload._id) {
                state.currentPost = action.payload;
            }
        },
        deletePost: (state, action: PayloadAction<string>) => {
            state.posts = state.posts.filter(p => p._id !== action.payload);
        },
        addFollowUp: (state, action: PayloadAction<{ postId: string; followup: FollowUp }>) => {
            const post = state.posts.find(p => p._id === action.payload.postId);
            if (post) {
                post.followups.push(action.payload.followup);
            }
            if (state.currentPost?._id === action.payload.postId) {
                state.currentPost.followups.push(action.payload.followup);
            }
        },
        toggleBookmark: (state, action: PayloadAction<string>) => {
            const post = state.posts.find(p => p._id === action.payload);
            if (post) {
                post.bookmarked = !post.bookmarked;
            }
            if (state.currentPost?._id === action.payload) {
                state.currentPost.bookmarked = !state.currentPost.bookmarked;
            }
        },
        toggleStar: (state, action: PayloadAction<string>) => {
            const post = state.posts.find(p => p._id === action.payload);
            if (post) {
                post.starred = !post.starred;
            }
            if (state.currentPost?._id === action.payload) {
                state.currentPost.starred = !state.currentPost.starred;
            }
        },
        incrementViews: (state, action: PayloadAction<string>) => {
            const post = state.posts.find(p => p._id === action.payload);
            if (post) {
                post.views += 1;
            }
            if (state.currentPost?._id === action.payload) {
                state.currentPost.views += 1;
            }
        },
        setSelectedTags: (state, action: PayloadAction<string[]>) => {
            state.selectedTags = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setPosts,
    setCurrentPost,
    setStats,
    addPost,
    updatePost,
    deletePost,
    addFollowUp,
    toggleBookmark,
    toggleStar,
    incrementViews,
    setSelectedTags,
    setLoading,
    setError,
} = pazzaSlice.actions;

export default pazzaSlice.reducer;