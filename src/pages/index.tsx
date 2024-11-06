import { GetStaticProps } from 'next';
import { useState } from 'react';
import PostCard from '../components/PostCard';
import FilterDropdown from '../components/FilterDropdown';

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


interface HomeProps {
    posts: Post[];
    users: User[];
}

export default function Home({ posts, users }: HomeProps) {
    const [filteredPosts, setFilteredPosts] = useState(posts);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const filterPosts = (userId: number | null) => {
        setFilteredPosts(userId ? posts.filter(post => post.userId === userId) : posts);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-3xl font-bold text-center text-primary">Blog Dashboard</h1>
            <FilterDropdown users={users} onChange={filterPosts} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {filteredPosts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        authorName={users.find(user => user.id === post.userId)?.name || 'Unknown'}
                    />
                ))}
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
    const posts: Post[] = await fetch('https://jsonplaceholder.typicode.com/posts').then(res => res.json());
    const users: User[] = await fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json());

    return { props: { posts, users } };
};
