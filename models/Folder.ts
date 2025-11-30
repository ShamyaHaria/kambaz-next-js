import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFolder extends Document {
    courseId: string;
    name: string;
    color?: string;
    createdAt: Date;
    updatedAt: Date;
}

const FolderSchema = new Schema<IFolder>(
    {
        courseId: {
            type: String,
            required: true,
            index: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        color: {
            type: String,
            default: '#3B82F6',
        },
    },
    {
        timestamps: true,
    }
);

FolderSchema.index({ courseId: 1, name: 1 }, { unique: true });

const Folder: Model<IFolder> =
    mongoose.models.Folder || mongoose.model<IFolder>('Folder', FolderSchema);

export default Folder;