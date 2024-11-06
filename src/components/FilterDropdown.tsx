interface FilterDropdownProps {
    users: { id: number; name: string }[];
    onChange: (userId: number | null) => void;
}

export default function FilterDropdown({ users, onChange }: FilterDropdownProps) {
    return (
        <select
            onChange={(e) => onChange(Number(e.target.value) || null)}
            className="p-2 border border-gray-300 rounded-lg bg-white"
        >
            <option value="">All Authors</option>
            {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.name}
                </option>
            ))}
        </select>
    );
}
