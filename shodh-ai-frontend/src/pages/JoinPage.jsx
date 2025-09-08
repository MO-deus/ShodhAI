import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function JoinPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [contestId, setContestId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // redirect to contest page for now
    navigate(`/contest/${contestId}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Contest</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  );
}
