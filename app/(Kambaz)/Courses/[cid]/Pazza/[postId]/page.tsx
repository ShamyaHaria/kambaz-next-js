import Link from 'next/link';
import { notFound } from 'next/navigation';
interface PostDetailPageProps {
    params: {
        cid: string;
        postId: string;
    };
}
async function getPost(postId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pazza/posts/${postId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.success ? data.post : null;
    } catch (error) {
        console.error('Error fetching post:', error);
        return null;
    }
}
async function getAnswers(postId: string) {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pazza/answers?postId=${postId}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.success ? data.answers : [];
    } catch (error) {
        console.error('Error fetching answers:', error);
        return [];
    }
}
export default async function PostDetailPage({ params }: PostDetailPageProps) {
    const { cid, postId } = params;
    const post = await getPost(postId);
    const answers = await getAnswers(postId);
    if (!post) {
        notFound();
    }
    const instructorAnswers = answers.filter((a: any) => a.type === 'instructor');
    const studentAnswers = answers.filter((a: any) => a.type === 'student');
    const formattedDate = new Date(post.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return (
        <div className="min-h-screen bg-gray-50">
            { }
            <div className="bg-white border-b border-gray-200 px-6 py-3">
                <Link
                    href={`/Courses/${cid}/Pazza`}
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-2"
                >
                    ← Back to all posts
                </Link>
            </div>
            <div className="max-w-5xl mx-auto p-6">
                { }
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded">
                                🟠 Instructor Post
                            </span>
                            {post.category && (
                                <span className="bg-purple-100 text-purple-700 text-sm font-semibold px-3 py-1 rounded capitalize">
                                    {post.category}
                                </span>
                            )}
                            {post.isPinned && (
                                <span className="text-red-500 text-lg">📌</span>
                            )}
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <span>{post.viewCount} views</span>
                    </div>
                    <div
                        className="prose max-w-none text-gray-700"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
                { }
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">Instructor's Answer</h2>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium">
                            + Add Instructor Answer
                        </button>
                    </div>
                    {instructorAnswers.length > 0 ? (
                        <div className="space-y-4">
                            {instructorAnswers.map((answer: any) => (
                                <AnswerCard key={answer._id} answer={answer} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500">No instructor answer yet</p>
                            <p className="text-sm text-gray-400 mt-1">Be the first to answer this question</p>
                        </div>
                    )}
                </div>
                { }
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Student Answers ({studentAnswers.length})
                        </h2>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-medium">
                            + Add Student Answer
                        </button>
                    </div>
                    {studentAnswers.length > 0 ? (
                        <div className="space-y-4">
                            {studentAnswers.map((answer: any) => (
                                <AnswerCard key={answer._id} answer={answer} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                            <p className="text-gray-500">No student answers yet</p>
                            <p className="text-sm text-gray-400 mt-1">Be the first student to answer</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
function AnswerCard({ answer }: { answer: any }) {
    const formattedDate = new Date(answer.createdAt).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded ${answer.type === 'instructor'
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                        {answer.type === 'instructor' ? '🟠 Instructor' : '👤 Student'}
                    </span>
                    {answer.isEndorsed && (
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">
                            ✓ Endorsed
                        </span>
                    )}
                </div>
                <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
            <div
                className="prose max-w-none text-gray-700 text-sm"
                dangerouslySetInnerHTML={{ __html: answer.content }}
            />
        </div>
    );
}