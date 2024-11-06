interface CommentProps {
    comment: { id: number; name: string; body: string };
    onDelete: (id: number) => void;
}

export default function Comment({ comment, onDelete }: CommentProps) {
    return (
        <div className="bg-white p-4 rounded-lg mb-2 shadow">
            <div className="flex justify-between">
                <h3 className="font-semibold text-primary">{comment.name}</h3>
                <button
                    onClick={() => onDelete(comment.id)}
                    className="text-red-500 hover:underline"
                >
                    Delete
                </button>
            </div>
            <p className="text-gray-700">{comment.body}</p>
        </div>
    );
}
