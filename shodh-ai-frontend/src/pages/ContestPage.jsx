import { Link, useParams, useNavigate } from "react-router-dom";

export default function ContestPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const questions = [
    { id: 1, title: "Two Sum" },
    { id: 2, title: "Reverse String" },
    { id: 3, title: "Binary Search" },
  ];

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
    </div>
  );
}
