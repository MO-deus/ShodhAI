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

  if (loading) return <p className="text-gray-500">Loading problems...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  console.log(contestId);
  

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contest {contestId}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {questions.map((q) => (
          <Link
            key={q.id}
            to={`/contest/${contestId}/problem/${q.id}`}
            className="block p-6 bg-white rounded-xl shadow hover:shadow-lg border border-gray-200 transition"
          >
            <h2 className="text-lg font-semibold">{q.title}</h2>
          </Link>
        ))}
      </div>

      <Link to={`/contest/${contestId}/leaderboard`}>
        View Leaderboard
      </Link>
    </div>
  );
}
