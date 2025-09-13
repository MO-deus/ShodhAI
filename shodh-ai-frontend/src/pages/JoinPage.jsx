import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contestId, setContestId] = useState("");
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/contests")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contests");
        return res.json();
      })
      .then((data) => {
        setContests(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Loading contests...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;


const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Step 1: Create or fetch user
    const resUser = await fetch("http://localhost:8080/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email }),
    });

    if (!resUser.ok) throw new Error("Failed to register user");
    const user = await resUser.json(); // ✅ contains user.id

    // Step 2: Join contest
    const resParticipant = await fetch("http://localhost:8080/api/contest-participants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        contestId,
      }),
    });

    if (!resParticipant.ok) throw new Error("Failed to join contest");
    const participant = await resParticipant.json(); // ✅ either existing or new

    console.log("Joined contest:", participant);

    // Step 3: Navigate to contest page
    navigate(`/contest/${contestId}`);
  } catch (err) {
    setError(err.message);
  }
};




  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg flex flex-col h-[90vh]">
        {/* Form */}
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">Join Contest</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Contest ID"
              value={contestId}
              onChange={(e) => setContestId(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg"
            >
              Join
            </button>
          </form>
        </div>

        {/* Contest List */}
        <div className="mt-6 flex-1 flex flex-col">
          <h1 className="text-xl font-bold mb-2">Available Contests</h1>
          <ul className="space-y-2 overflow-y-auto pr-2 flex-1">
            {contests.map((contest) => (
              <li
                key={contest.id}
                className="p-3 border rounded-lg bg-gray-50 flex justify-between items-center"
              >
                <span className="font-medium">{contest.name}</span>
                <span className="text-sm text-gray-500">{contest.id}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
