// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Post from '@/models/Post';
// export async function GET(request: NextRequest) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(request.url);
//         const courseId = searchParams.get('courseId');
//         const folderId = searchParams.get('folderId');
//         if (!courseId) {
//             return NextResponse.json(
//                 { success: false, error: 'courseId is required' },
//                 { status: 400 }
//             );
//         }
//         const query: any = { courseId };
//         if (folderId) {
//             query.folderId = folderId;
//         }
//         const posts = await Post.find(query)
//             .sort({ isPinned: -1, createdAt: -1 })
//             .lean();
//         return NextResponse.json({
//             success: true,
//             posts,
//             count: posts.length,
//         });
//     } catch (error) {
//         console.error('❌ Error fetching posts:', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Failed to fetch posts',
//                 details: error instanceof Error ? error.message : 'Unknown error',
//             },
//             { status: 500 }
//         );
//     }
// }
// export async function POST(request: NextRequest) {
//     try {
//         await connectDB();
//         const body = await request.json();
//         const {
//             courseId,
//             folderId,
//             authorId,
//             type,
//             title,
//             content,
//             category,
//             isAnonymous,
//         } = body;
//         if (!courseId || !folderId || !authorId || !type || !title || !content) {
//             return NextResponse.json(
//                 {
//                     success: false,
//                     error: 'Missing required fields: courseId, folderId, authorId, type, title, content',
//                 },
//                 { status: 400 }
//             );
//         }
//         if (!['question', 'note'].includes(type)) {
//             return NextResponse.json(
//                 { success: false, error: 'type must be either "question" or "note"' },
//                 { status: 400 }
//             );
//         }
//         const newPost = await Post.create({
//             courseId,
//             folderId,
//             authorId,
//             type,
//             title,
//             content,
//             category: category || undefined,
//             isAnonymous: isAnonymous || false,
//             isPinned: false,
//             viewCount: 0,
//             hasStudentAnswer: false,
//             hasInstructorAnswer: false,
//             isResolved: false,
//         });
//         return NextResponse.json(
//             {
//                 success: true,
//                 message: 'Post created successfully',
//                 post: newPost,
//             },
//             { status: 201 }
//         );
//     } catch (error) {
//         console.error('❌ Error creating post:', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Failed to create post',
//                 details: error instanceof Error ? error.message : 'Unknown error',
//             },
//             { status: 500 }
//         );
//     }
// }