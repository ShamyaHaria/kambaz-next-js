import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IReply extends Document {
    answerId: string;
    postId: string;
    authorId: string;
    content: string;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const ReplySchema = new Schema<IReply>(
    {
        answerId: {
            type: String,
            required: true,
            index: true,
        },
        postId: {
            type: String,
            required: true,
            index: true,
        },
        authorId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        isAnonymous: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

ReplySchema.index({ answerId: 1, createdAt: 1 });

const Reply: Model<IReply> =
    mongoose.models.Reply || mongoose.model<IReply>('Reply', ReplySchema);

export default Reply;