import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";

export default function ProblemPage() {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchProblem() {
      try {
        const res = await fetch(`http://localhost:8080/api/problems/${problemId}`);
        if (!res.ok) throw new Error("Failed to load problem");
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProblem();
  }, [problemId]);

  if (loading) return <div className="p-6 text-gray-600">Loading problem...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!problem) return <div className="p-6 text-gray-600">Problem not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
      >
        ⬅ Back
      </button>

      <h1 className="text-3xl font-bold mb-4 text-gray-800">{problem.title}</h1>

      <div className="mb-6 p-6 bg-white rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-3">Problem Statement</h2>
        <p className="text-gray-700">{problem.description}</p>
        <p className="mt-4 text-sm text-gray-500">
          Difficulty: <span className="font-semibold">{problem.difficulty}</span>
        </p>
      </div>

      {/* ✅ Test Cases Section */}
      <div className="mb-6 p-6 bg-white rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-3">Sample Test Cases</h2>
        {problem.testCases && problem.testCases.length > 0 ? (
          <ul className="space-y-3">
            {problem.testCases.map((tc, index) => (
              <li key={index} className="p-3 bg-gray-50 border rounded-lg">
                <p><span className="font-semibold">Input:</span> {tc.input}</p>
                <p><span className="font-semibold">Expected Output:</span> {tc.expectedOutput}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No test cases available.</p>
        )}
      </div>


      <div className="p-6 bg-white rounded-xl shadow border border-gray-200 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Code Editor</h2>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border px-3 py-2 rounded-lg text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <CodeEditor
          language={language}
          code={code}
          onChange={(newCode) => setCode(newCode)}
        />
      </div>
    </div>
  );
}
