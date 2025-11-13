import Link from 'next/link';
import NewPostButton from './components/NewPostButton';
interface PazzaPageProps {
  params: {
    cid: string;
  };
  searchParams: {
    view?: 'qa' | 'glance';
    folderId?: string;
  };
}
async function getFolders(courseId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pazza/folders?courseId=${courseId}`,
      { cache: 'no-store' }
    );
    const data = await res.json();
    return data.success ? data.folders : [];
  } catch (error) {
    console.error('Error fetching folders:', error);
    return [];
  }
}
async function getPosts(courseId: string, folderId?: string) {
  try {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/pazza/posts?courseId=${courseId}`;
    if (folderId) {
      url += `&folderId=${folderId}`;
    }
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json();
    return data.success ? data.posts : [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}
export default async function PazzaPage({ params, searchParams }: PazzaPageProps) {
  const { cid } = params;
  const currentView = searchParams.view || 'qa';
  const selectedFolderId = searchParams.folderId;
  const folders = await getFolders(cid);
  const posts = await getPosts(cid, selectedFolderId);
  return (
    <div className="h-full bg-gray-50">
      {}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center gap-6 px-6 py-3">
          <Link 
            href={`/Courses/${cid}/Pazza?view=qa`}
            className={`pb-1 text-sm font-medium border-b-2 transition-colors ${
              currentView === 'qa' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Q & A
          </Link>
          <Link 
            href={`/Courses/${cid}/Pazza?view=glance`}
            className={`pb-1 text-sm font-medium border-b-2 transition-colors ${
              currentView === 'glance' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Class at a Glance
          </Link>
          <button className="pb-1 text-sm font-medium text-gray-500 hover:text-gray-700">
            Resources
          </button>
          <button className="pb-1 text-sm font-medium text-gray-500 hover:text-gray-700">
            Statistics
          </button>
        </div>
        {currentView === 'qa' && (
          <div className="bg-blue-50 border-t border-blue-100 px-6 py-2 flex items-center justify-between">
            <p className="text-sm text-blue-900">
              Students, we've launched the new Pazza user interface!
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Learn More
            </button>
          </div>
        )}
      </div>
      {currentView === 'qa' ? (
        <QAView cid={cid} folders={folders} posts={posts} selectedFolderId={selectedFolderId} />
      ) : (
        <GlanceView cid={cid} posts={posts} />
      )}
    </div>
  );
}
function QAView({ 
  cid, 
  folders, 
  posts,
  selectedFolderId 
}: { 
  cid: string; 
  folders: any[]; 
  posts: any[];
  selectedFolderId?: string;
}) {
  const pinnedPosts = posts.filter(p => p.isPinned);
  const regularPosts = posts.filter(p => !p.isPinned);
  return (
    <>
      {}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between mb-3">
          <NewPostButton courseId={cid} folders={folders} />
          <input
            type="text"
            placeholder="Search posts..."
            className="px-4 py-2 border border-gray-300 rounded w-96 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {}
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Link
            href={`/Courses/${cid}/Pazza?view=qa`}
            className={`px-4 py-1.5 border rounded text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              !selectedFolderId 
                ? 'bg-blue-600 text-white border-blue-600' 
                : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
            }`}
          >
            All Posts
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              !selectedFolderId ? 'bg-blue-500' : 'bg-gray-300 text-gray-700'
            }`}>
              {posts.length}
            </span>
          </Link>
          {folders.map((folder) => (
            <Link
              key={folder._id}
              href={`/Courses/${cid}/Pazza?view=qa&folderId=${folder._id}`}
              className={`px-4 py-1.5 border rounded text-sm font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
                selectedFolderId === folder._id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
              }`}
              style={{ 
                borderColor: selectedFolderId === folder._id ? folder.color : undefined 
              }}
            >
              {folder.name}
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                selectedFolderId === folder._id ? 'bg-blue-500' : 'bg-gray-300 text-gray-700'
              }`}>
                {folder.postCount || 0}
              </span>
            </Link>
          ))}
        </div>
      </div>
      {}
      <div className="flex" style={{ height: 'calc(100vh - 250px)' }}>
        {}
        <aside className="w-96 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-3 flex items-center justify-between z-10">
            <button className="text-sm font-medium text-gray-700 flex items-center gap-2 hover:text-gray-900">
              <span>☰</span> All Posts
            </button>
            <button className="text-gray-400 hover:text-gray-600">⚙️</button>
          </div>
          <div className="p-4">
            {}
            {pinnedPosts.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Pinned
                  </h3>
                  <span className="text-red-500">📌</span>
                </div>
                {pinnedPosts.map((post) => (
                  <PostCard key={post._id} post={post} cid={cid} />
                ))}
              </div>
            )}
            {}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                All Posts
              </h3>
              {regularPosts.length > 0 ? (
                regularPosts.map((post) => <PostCard key={post._id} post={post} cid={cid} />)
              ) : (
                <p className="text-sm text-gray-500 text-center py-8">
                  No posts yet. Create the first one!
                </p>
              )}
            </div>
          </div>
        </aside>
        {}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <p className="text-lg text-gray-600 mb-2">Select a post to view details</p>
              <p className="text-sm text-gray-500">or create a new post to get started</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
function PostCard({ post, cid }: { post: any; cid: string }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit'
  });
  return (
    <Link href={`/Courses/${cid}/Pazza/${post._id}`} className="block mb-2">
      <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md hover:border-gray-300 transition-all">
        <div className="flex items-start gap-2 mb-2">
          <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-1 rounded">
            🟠 Instr
          </span>
          {post.category && (
            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-1 rounded capitalize">
              {post.category}
            </span>
          )}
        </div>
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          {post.title}
        </h4>
        <div 
          className="text-xs text-gray-600 mb-3 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        {post.hasInstructorAnswer && (
          <div className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded inline-block mb-2">
            Instructor answered
          </div>
        )}
        {post.hasStudentAnswer && !post.hasInstructorAnswer && (
          <div className="text-xs text-blue-600 font-semibold mb-2">
            Student answered
          </div>
        )}
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{formattedDate}</p>
          <p className="text-xs text-gray-500">{post.viewCount} views</p>
        </div>
      </div>
    </Link>
  );
}
function GlanceView({ cid, posts }: { cid: string; posts: any[] }) {
  const totalPosts = posts.length;
  const unansweredQuestions = posts.filter(p => p.type === 'question' && !p.hasInstructorAnswer && !p.hasStudentAnswer).length;
  const instructorAnswers = posts.filter(p => p.hasInstructorAnswer).length;
  const studentAnswers = posts.filter(p => p.hasStudentAnswer).length;
  return (
    <div className="p-8 overflow-y-auto bg-gray-50" style={{ height: 'calc(100vh - 200px)' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Class at a Glance</h2>
        {}
        {unansweredQuestions > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-lg shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                <div>
                  <p className="text-orange-900 font-semibold text-lg">Needs Attention</p>
                  <p className="text-orange-700 text-sm">{unansweredQuestions} unanswered questions</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">👥</div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{totalPosts}</p>
            <p className="text-gray-600">Total Posts</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">🍎</div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{instructorAnswers}</p>
            <p className="text-gray-600">Instructor Responses</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="text-5xl mb-3">👨‍🎓</div>
            <p className="text-4xl font-bold text-gray-900 mb-1">{studentAnswers}</p>
            <p className="text-gray-600">Student Responses</p>
          </div>
        </div>
        {}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-lg p-8 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🔥</span>
            <h3 className="text-2xl font-bold text-gray-900">Confusion Heatmap</h3>
            <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">AI-POWERED</span>
          </div>
          <p className="text-gray-700 mb-6">
            Visual representation of which topics need more instructor attention
          </p>
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-500 mb-2">Coming soon: Interactive chart</p>
            <p className="text-sm text-gray-400">Shows folders with high views but low instructor answers</p>
          </div>
        </div>
      </div>
    </div>
  );
}