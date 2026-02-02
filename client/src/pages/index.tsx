import { useState, useEffect } from "react";
import api from "@/utils/api";

export default function IndexPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("randomusers", { params: { page: '1', limit: '10' } })
      .then((res) => {
        // Access nested data structure: res.data.data contains the users array
        setData(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Random Users</h1>
      {data.length > 0 ? (
        <ul className="space-y-4">
          {data.map((user: any) => (
            <li key={user.id} className="border p-4 rounded">
              <div className="flex items-start gap-4">
                <img
                  src={user.picture.medium}
                  alt={user.name.first}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold">
                    {user.name.title} {user.name.first} {user.name.last}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.location.city}, {user.location.country}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
}

