// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Post from '@/models/Post';

// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ postId: string }> }
// ) {
//   try {
//     await connectDB();
//     const { postId } = await params;
//     const post = await Post.findById(postId).lean();

//     if (!post) {
//       return NextResponse.json(
//         { success: false, error: 'Post not found' },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       post,
//     });
//   } catch (error) {
//     console.error('❌ Error fetching post:', error);
//     return NextResponse.json(
//       {
//         success: false,
//         error: 'Failed to fetch post',
//         details: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }