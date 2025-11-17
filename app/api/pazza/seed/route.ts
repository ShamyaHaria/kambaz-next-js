// import { NextRequest, NextResponse } from 'next/server';
// import connectDB from '@/lib/mongodb';
// import Folder from '@/models/Folder';
// import Post from '@/models/Post';
// export async function GET(request: NextRequest) {
//     try {
//         await connectDB();
//         const { searchParams } = new URL(request.url);
//         const courseId = searchParams.get('courseId');
//         if (!courseId) {
//             return NextResponse.json(
//                 { success: false, error: 'courseId is required' },
//                 { status: 400 }
//             );
//         }
//         await Folder.deleteMany({ courseId });
//         await Post.deleteMany({ courseId });
//         const folders = await Folder.insertMany([
//             { courseId, name: 'hw1', color: '#3B82F6' },
//             { courseId, name: 'hw2', color: '#10B981' },
//             { courseId, name: 'hw3', color: '#F59E0B' },
//             { courseId, name: 'hw4', color: '#EF4444' },
//             { courseId, name: 'hw5', color: '#8B5CF6' },
//             { courseId, name: 'General', color: '#6B7280' },
//         ]);
//         const samplePosts = [
//             {
//                 courseId,
//                 folderId: folders[3]._id.toString(),
//                 authorId: 'instructor-123',
//                 type: 'note',
//                 title: 'The Tests for A4',
//                 content:
//                     '<p>Class, here are the input files with expected output that we used to test your program in Assignment 4. Before submitting, make sure your program passes all these tests.</p>',
//                 isPinned: true,
//                 hasInstructorAnswer: false,
//                 hasStudentAnswer: false,
//             },
//             {
//                 courseId,
//                 folderId: folders[1]._id.toString(),
//                 authorId: 'instructor-123',
//                 type: 'note',
//                 title: 'Codewalk spreadsheet Access - Schedule',
//                 content:
//                     '<p>Hi All, Please see the codewalk 2 schedule here. You may have to login with your northeastern credentials. This is a shared spreadsheet.</p>',
//                 hasInstructorAnswer: false,
//                 hasStudentAnswer: false,
//             },
//             {
//                 courseId,
//                 folderId: folders[1]._id.toString(),
//                 authorId: 'instructor-123',
//                 type: 'question',
//                 title: 'Reminder: please sign up for code walk 2',
//                 content:
//                     '<p>A reminder to sign up for code walk 2 if you have not! Please see the previous post for details.</p>',
//                 hasInstructorAnswer: false,
//                 hasStudentAnswer: false,
//             },
//             {
//                 courseId,
//                 folderId: folders[5]._id.toString(),
//                 authorId: 'student-456',
//                 type: 'question',
//                 title: 'Question about final project deadline',
//                 content: '<p>Hi Professor, is the final project deadline extended by a week? I heard some rumors.</p>',
//                 category: 'other',
//                 hasInstructorAnswer: false,
//                 hasStudentAnswer: false,
//             },
//             {
//                 courseId,
//                 folderId: folders[2]._id.toString(),
//                 authorId: 'student-789',
//                 type: 'question',
//                 title: 'NullPointerException in test cases',
//                 content:
//                     '<p>I keep getting a NullPointerException when running the test cases. My code works for my own tests but fails on the provided ones. Any hints?</p>',
//                 category: 'bug',
//                 hasInstructorAnswer: false,
//                 hasStudentAnswer: true,
//             },
//             {
//                 courseId,
//                 folderId: folders[0]._id.toString(),
//                 authorId: 'student-101',
//                 type: 'question',
//                 title: 'How do I set up the development environment?',
//                 content:
//                     '<p>I am new to Java and IntelliJ. Can someone guide me through setting up the project for hw1?</p>',
//                 category: 'setup',
//                 hasInstructorAnswer: true,
//                 hasStudentAnswer: false,
//                 isResolved: true,
//             },
//         ];
//         const posts = await Post.insertMany(samplePosts);
//         return NextResponse.json({
//             success: true,
//             message: 'Sample data created successfully',
//             data: {
//                 folders: folders.length,
//                 posts: posts.length,
//             },
//         });
//     } catch (error) {
//         console.error('❌ Error seeding data:', error);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: 'Failed to seed data',
//                 details: error instanceof Error ? error.message : 'Unknown error',
//             },
//             { status: 500 }
//         );
//     }
// }