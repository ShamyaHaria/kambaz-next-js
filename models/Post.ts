import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPost extends Document {
    courseId: string;
    folderId: string;
    authorId: string;
    type: 'question' | 'note';
    title: string;
    content: string;
    category?: 'bug' | 'concept' | 'testing' | 'setup' | 'other';
    isAnonymous: boolean;
    isPinned: boolean;
    viewCount: number;
    hasStudentAnswer: boolean;
    hasInstructorAnswer: boolean;
    isResolved: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const PostSchema = new Schema<IPost>(
    {
        courseId: {
            type: String,
            required: true,
            index: true,
        },
        folderId: {
            type: String,
            required: true,
            index: true,
        },
        authorId: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ['question', 'note'],
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 200,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['bug', 'concept', 'testing', 'setup', 'other'],
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
        isPinned: {
            type: Boolean,
            default: false,
        },
        viewCount: {
            type: Number,
            default: 0,
        },
        hasStudentAnswer: {
            type: Boolean,
            default: false,
        },
        hasInstructorAnswer: {
            type: Boolean,
            default: false,
        },
        isResolved: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

PostSchema.index({ courseId: 1, createdAt: -1 });
PostSchema.index({ courseId: 1, folderId: 1 });
PostSchema.index({ courseId: 1, isPinned: -1, createdAt: -1 });

const Post: Model<IPost> =
    mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

export default Post;