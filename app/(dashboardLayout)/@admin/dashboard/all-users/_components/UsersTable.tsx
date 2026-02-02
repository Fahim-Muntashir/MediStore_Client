"use client";

import { useState } from "react";
import { updateUserStatus } from "@/actions/admin.action";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersTable({ users }: { users: User[] }) {
  const [data, setData] = useState(users);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";

    try {
      setLoadingId(id);

      await updateUserStatus(id, newStatus);

      setData((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
      );
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Name</th>
          <th className="border p-2">Email</th>
          <th className="border p-2">Role</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.role}</td>
            <td className="border p-2">
              {user.status === "ACTIVE" ? "✅ Active" : "⛔ Banned"}
            </td>
            <td className="border p-2">
              <button
                disabled={loadingId === user.id}
                onClick={() => handleToggleStatus(user.id, user.status)}
                className={`px-3 py-1 rounded text-white disabled:opacity-50 ${
                  user.status === "ACTIVE" ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {loadingId === user.id
                  ? "Updating..."
                  : user.status === "ACTIVE"
                    ? "Ban"
                    : "Unban"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
