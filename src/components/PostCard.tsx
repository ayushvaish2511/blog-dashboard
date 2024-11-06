import Link from 'next/link';

interface PostCardProps {
    post: { id: number; title: string; body: string; userId: number };
    authorName: string;
}

export default function PostCard({ post, authorName }: PostCardProps) {
    return (
        <Link href={`/posts/${post.id}`}>
            <div className="bg-white shadow-md p-6 rounded-lg hover:bg-primary/10 transition">
                <h2 className="text-xl font-semibold text-primary">{post.title}</h2>
                <p className="text-sm text-gray-700 mt-2">{post.body.slice(0, 100)}...</p>
                <p className="text-gray-500 text-right mt-4">by {authorName}</p>
            </div>
        </Link>
    );
}
