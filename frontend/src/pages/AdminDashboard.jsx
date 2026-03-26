import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const name = localStorage.getItem("name");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/students/")
      .then((res) => setStudents(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">EduVault — Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{name}</span>
          <button onClick={logout} className="text-sm bg-white text-blue-700 px-3 py-1 rounded-lg font-medium">
            Logout
          </button>
        </div>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">All Students</h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Department</th>
                  <th className="px-4 py-3 text-left">Year</th>
                  <th className="px-4 py-3 text-left">Fee Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map((s) => (
                  <tr key={s.StudentID} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-gray-500">{s.StudentID}</td>
                    <td className="px-4 py-3 font-medium text-gray-800">{s.Name}</td>
                    <td className="px-4 py-3 text-gray-600">{s.Department}</td>
                    <td className="px-4 py-3 text-gray-600">Year {s.Year}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        s.FeeStatus === "Paid" ? "bg-green-100 text-green-700" :
                        s.FeeStatus === "Pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {s.FeeStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
