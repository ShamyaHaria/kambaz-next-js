import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Answer from '@/models/Answer';
export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get('postId');
        if (!postId) {
            return NextResponse.json(
                { success: false, error: 'postId is required' },
                { status: 400 }
            );
        }
        const answers = await Answer.find({ postId })
            .sort({ type: -1, createdAt: 1 })
            .lean();
        return NextResponse.json({
            success: true,
            answers,
            count: answers.length,
        });
    } catch (error) {
        console.error('❌ Error fetching answers:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch answers',
                details: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}