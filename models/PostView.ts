import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPostView extends Document {
    postId: string;
    userId: string;
    viewedAt: Date;
}

const PostViewSchema = new Schema<IPostView>(
    {
        postId: {
            type: String,
            required: true,
            index: true,
        },
        userId: {
            type: String,
            required: true,
        },
        viewedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: false,
    }
);

PostViewSchema.index({ postId: 1, userId: 1 }, { unique: true });
PostViewSchema.index({ postId: 1, viewedAt: -1 });

const PostView: Model<IPostView> =
    mongoose.models.PostView || mongoose.model<IPostView>('PostView', PostViewSchema);

export default PostView;