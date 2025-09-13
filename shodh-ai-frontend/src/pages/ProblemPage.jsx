import React, { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import { useParams, useNavigate } from "react-router-dom";

const ProblemPage = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch problem
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/problems/${problemId}`);
        if (!response.ok) throw new Error("Failed to fetch problem");
        const data = await response.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProblem();
  }, [problemId]);

  // Autofill boilerplate when problem loads or language changes
  useEffect(() => {
    if (!problem?.boilerPlateCode) return;
    const boilerCodeRaw = problem.boilerPlateCode[language] || "";
    const boilerCode = boilerCodeRaw.replace(/\\n/g, "\n");
    setCode(boilerCode);
  }, [problem, language]);

  const handleRun = async () => {
    setLoading(true);
    try {
      const participant = JSON.parse(localStorage.getItem("participant"));
      const response = await fetch(`http://localhost:8080/api/problems/${problemId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          testCases: problem.testCases,
          userId: participant?.userId,
          contestId: participant?.contestId,
        }),
      });
      const data = await response.json();
      setResults(data.judgeResponse?.results || []);
    } catch (err) {
      console.error(err);
      setResults([{ error: "Failed to run code" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!problem)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
        Loading problem...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6 space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
        >
          ← Back
        </button>

        {/* Problem Info */}
        <div>
          <h2 className="text-3xl font-bold text-indigo-700">{problem.title}</h2>
          <p className="mt-2 text-gray-700">{problem.description}</p>
          <p className="mt-1 text-gray-500">
            <strong>Difficulty:</strong> {problem.difficulty}
          </p>
          <div>
          {problem.testCases && problem.testCases.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-xl border border-gray-300 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2">Sample Test Case</h3>
              <p>
                <span className="font-medium">Input:</span>{" "}
                <code className="bg-gray-200 px-1 rounded">{problem.testCases[0].input}</code>
              </p>
              <p>
                <span className="font-medium">Expected Output:</span>{" "}
                <code className="bg-gray-200 px-1 rounded">{problem.testCases[0].expectedOutput}</code>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-4">
        <label className="font-medium text-gray-700">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
        >
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
      </div>

      {/* Code Editor */}
      <div className="mt-4">
        <CodeEditor code={code} onChange={setCode} language={language} />
      </div>

      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={loading}
        className="mt-4 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 disabled:bg-indigo-400 transition transform hover:scale-105"
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      {/* Results */}
      {/* Results */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Results:</h3>
        <div className="mt-2 space-y-3">
          {results.length === 0 && <p className="text-gray-500">No results yet.</p>}

          {results.map((res, i) => (
            <div
              key={i}
              className={`p-4 rounded-xl shadow-sm border ${res.passed ? "bg-green-100 border-green-400" : "bg-red-100 border-red-400"
                }`}
            >
              {res.error ? (
                <p className="text-red-700 font-medium">{res.error}</p>
              ) : (
                <>
                  <p>
                    <strong>Test Case {i + 1}</strong>
                  </p>
                  <p>
                    <span className="font-medium">Input:</span> {res.input}
                  </p>
                  <p>
                    <span className="font-medium">Expected Output:</span> {res.expectedOutput}
                  </p>
                  <p>
                    <span className="font-medium">Your Output:</span> {res.output}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    <span className={res.passed ? "text-green-700 font-semibold" : "text-red-700 font-semibold"}>
                      {res.passed ? "Passed ✅" : "Failed ❌"}
                    </span>
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
    </div >
  );
};

export default ProblemPage;
