import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAnswer extends Document {
    postId: string;
    authorId: string;
    type: 'student' | 'instructor';
    content: string;
    isEndorsed: boolean;
    isSuggestedByAI?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>(
    {
        postId: {
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
            enum: ['student', 'instructor'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isEndorsed: {
            type: Boolean,
            default: false,
        },
        isSuggestedByAI: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

AnswerSchema.index({ postId: 1, type: 1, createdAt: 1 });

const Answer: Model<IAnswer> =
    mongoose.models.Answer || mongoose.model<IAnswer>('Answer', AnswerSchema);

export default Answer;