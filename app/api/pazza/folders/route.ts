import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Folder from '@/models/Folder';
import Post from '@/models/Post';
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const courseId = searchParams.get('courseId');
        if (!courseId) {
            return NextResponse.json(
                { success: false, error: 'courseId is required' },
                { status: 400 }
            );
        }
        const folders = await Folder.find({ courseId }).sort({ createdAt: 1 }).lean();
        const foldersWithCounts = await Promise.all(
            folders.map(async (folder) => {
                const postCount = await Post.countDocuments({
                    courseId,
                    folderId: folder._id.toString(),
                });
                return {
                    ...folder,
                    postCount,
                };
            })
        );
        return NextResponse.json({
            success: true,
            folders: foldersWithCounts,
            count: foldersWithCounts.length,
        });
    } catch (error) {
        console.error('❌ Error fetching folders:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch folders',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();
        const { courseId, name, color } = body;
        if (!courseId || !name) {
            return NextResponse.json(
                { success: false, error: 'courseId and name are required' },
                { status: 400 }
            );
        }
        const existingFolder = await Folder.findOne({ courseId, name });
        if (existingFolder) {
            return NextResponse.json(
                { success: false, error: 'Folder with this name already exists in this course' },
                { status: 409 }
            );
        }
        const newFolder = await Folder.create({
            courseId,
            name,
            color: color || '#3B82F6',
        });
        return NextResponse.json(
            {
                success: true,
                message: 'Folder created successfully',
                folder: newFolder,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('❌ Error creating folder:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to create folder',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}