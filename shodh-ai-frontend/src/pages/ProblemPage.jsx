import { useParams, useNavigate } from "react-router-dom";

export default function ProblemPage() {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Problem {problemId} (Contest {contestId})
      </h1>

      <div className="mb-6 p-6 bg-white rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
        <p className="text-gray-700">
          Placeholder problem statement for Problem {problemId}. Later this will
          be fetched from backend.
        </p>
      </div>

      <div className="p-6 bg-white rounded-xl shadow border border-gray-200 h-80 flex flex-col">
        <h2 className="text-xl font-semibold mb-3">Code Editor</h2>
        <textarea
          className="w-full flex-grow border rounded-lg p-3 font-mono resize-none focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Write your code here..."
        />
      </div>
    </div>
  );
}
