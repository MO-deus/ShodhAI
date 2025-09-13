import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ContestPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/problems/contest/${contestId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch problems");
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [contestId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading problems...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
      >
        ⬅ Back
      </button>

      {/* Contest Header */}
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-indigo-700">
        Contest {contestId}
      </h1>

      {/* Problems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q) => (
          <Link
            key={q.id}
            to={`/contest/${contestId}/problem/${q.id}`}
            className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-200 transition transform hover:-translate-y-1 hover:scale-105"
          >
            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              {q.title}
            </h2>
            <p className="mt-2 text-gray-500">{q.description?.slice(0, 80)}...</p>
          </Link>
        ))}
      </div>

      {/* Leaderboard Button */}
      <div className="mt-8 flex justify-center">
        <Link
          to={`/contest/${contestId}/leaderboard`}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:from-purple-500 hover:to-indigo-500 transition transform hover:scale-105"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  );
}
