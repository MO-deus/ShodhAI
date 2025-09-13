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
  // Convert literal "\n" in the JSON string to actual newlines
  const boilerCode = boilerCodeRaw.replace(/\\n/g, "\n");
  setCode(boilerCode);
}, [problem, language]);


const handleRun = async () => {
  setLoading(true);
  try {
    const participant = JSON.parse(localStorage.getItem("participant"));

    const response = await fetch(
      `http://localhost:8080/api/problems/${problemId}/submit`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language,
          code,
          testCases: problem.testCases,
          userId: participant?.userId,   // ✅ send userId
          contestId: participant?.contestId, // ✅ send contestId
        }),
      }
    );

    
    const data = await response.json();
    
    const parsedResults = data.results;
    console.log(parsedResults);
    setResults(parsedResults || []);
  } catch (err) {
    console.error(err);
    setResults([{ error: "Failed to run code" }]);
  } finally {
    setLoading(false);
  }
};


  if (!problem) return <div className="p-6">Loading problem...</div>;

  return (
    <div className="p-6 space-y-4">
      {/* 🔙 Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-bold">{problem.title}</h2>
      <p>{problem.description}</p>
      <p>
        <strong>Difficulty:</strong> {problem.difficulty}
      </p>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-3 p-2 border rounded"
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
      </select>

      {/* Code Editor */}
      <CodeEditor code={code} onChange={setCode} language={language} />

      {/* Run Button */}
      <button
        onClick={handleRun}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-400"
      >
        {loading ? "Running..." : "Run Code"}
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Results:</h3>
        {results.map((res, i) => (
          <pre key={i} className="bg-gray-100 p-2 rounded mt-2">
            {JSON.stringify(res, null, 2)}
          </pre>
        ))}
      </div>
    </div>
  );
};

export default ProblemPage;
