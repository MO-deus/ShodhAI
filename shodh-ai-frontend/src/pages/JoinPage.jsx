import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contestId, setContestId] = useState("");
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [simpleIdMap, setSimpleIdMap] = useState({}); // simpleId -> real UUID
  const [selectedSimpleId, setSelectedSimpleId] = useState("");
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

        const map = {};
        const contestsWithSimple = data.map((contest, idx) => {
          const simpleId = (idx + 1).toString(); // 1, 2, 3...
          map[simpleId] = contest.id;
          return { ...contest, simpleId };
        });

        setContests(contestsWithSimple);
        setSimpleIdMap(map);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contestId = simpleIdMap[selectedSimpleId];
    console.log(selectedSimpleId);

    if (!contestId) return alert("Invalid contest ID");
    try {
      const resUser = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email }),
      });
      if (!resUser.ok) throw new Error("Failed to register user");
      const user = await resUser.json();

      const resParticipant = await fetch("http://localhost:8080/api/contest-participants", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, contestId }),
      });
      if (!resParticipant.ok) throw new Error("Failed to join contest");
      const participant = await resParticipant.json();

      localStorage.removeItem("participant");
      localStorage.setItem("participant", JSON.stringify(participant));
      navigate(`/contest/${contestId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-gray-500 text-center mt-10">Loading contests...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl flex flex-col h-[90vh]">

        {/* Form */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Join a Contest</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
            <input
              type="text"
              placeholder="Contest ID"
              value={selectedSimpleId}             // ✅ the simple ID
              onChange={(e) => setSelectedSimpleId(e.target.value)} // update state
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl shadow hover:bg-indigo-700 transition transform hover:scale-105"
            >
              Join Contest
            </button>
          </form>
        </div>

        {/* Contest List */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-3 text-gray-700">Available Contests</h2>
          <ul className="space-y-2">
            {contests.map((contest) => (
              <li
                key={contest.id}
                className="p-4 border rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 flex justify-between items-center shadow hover:shadow-lg transition transform hover:scale-102"
              >
                <span className="font-medium text-indigo-800">{contest.name}</span>
                <span className="text-sm text-gray-500">ID: {contest.simpleId}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
