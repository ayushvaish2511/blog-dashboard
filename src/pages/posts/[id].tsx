import { useState } from 'react';
import Comment from '../../components/Comment';
import { GetServerSideProps } from 'next';

// types.ts
interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface User {
    id: number;
    name: string;
}

interface Comment {
    id: number;
    postId: number;
    name: string;
    body: string;
}

interface PostDetailProps {
    post: Post;
    author: User;
    initialComments: Comment[];
}


export default function PostDetail({ post, author, initialComments }: PostDetailProps) {
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [newComment, setNewComment] = useState({ name: '', body: '' });

    const handleAddComment = async () => {
        const comment: Comment = {
            id: Date.now(), // Mock an ID
            postId: post.id,
            name: newComment.name,
            body: newComment.body,
        };

        setComments([comment, ...comments]);
        setNewComment({ name: '', body: '' });
    };

    const handleDeleteComment = (id: number) => {
        setComments(comments.filter(comment => comment.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold text-primary">{post.title}</h1>
            <p className="text-lg text-secondary">{post.body}</p>
            <p className="text-md text-gray-500">Author: {author.name}</p>

            <h2 className="text-2xl font-semibold mt-6">Comments</h2>
            {comments.map(comment => (
                <div key={comment.id} className="border-b border-gray-300 py-2">
                    <p className="text-sm font-semibold">{comment.name}</p>
                    <p>{comment.body}</p>
                    <button
                        className="text-red-500 hover:underline mt-2 text-sm"
                        onClick={() => handleDeleteComment(comment.id)}
                    >
                        Delete
                    </button>
                </div>
            ))}

            <div className="mt-4">
                <input
                    type="text"
                    placeholder="Your name"
                    value={newComment.name}
                    onChange={e => setNewComment({ ...newComment, name: e.target.value })}
                    className="border rounded px-2 py-1 w-full mb-2"
                />
                <textarea
                    placeholder="Your comment"
                    value={newComment.body}
                    onChange={e => setNewComment({ ...newComment, body: e.target.value })}
                    className="border rounded px-2 py-1 w-full mb-2"
                />
                <button onClick={handleAddComment} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Add Comment
                </button>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<PostDetailProps> = async (context) => {
    const { id } = context.params as { id: string };
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json()) as Post;
    const author = await fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json()) as User;
    const initialComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json()) as Comment[];

    return { props: { post, author, initialComments } };
};