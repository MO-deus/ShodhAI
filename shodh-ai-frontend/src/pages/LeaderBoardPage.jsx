import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function LeaderboardPage() {
    const { contestId } = useParams();
    const navigate = useNavigate();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchLeaderboard = async () => {
        try {
            const res = await fetch(
                `http://localhost:8080/api/contests/${contestId}/leaderboard`
            );
            if (!res.ok) throw new Error("Failed to fetch leaderboard");
            const data = await res.json();
            setLeaderboard(data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 15000); // every 15 sec
        return () => clearInterval(interval);
    }, [contestId]);

    if (loading) return <p>Loading leaderboard...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="p-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
                ← Back
            </button>

            <h2 className="text-2xl font-bold mb-4">Contest Leaderboard</h2>

            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">Rank</th>
                        <th className="border border-gray-300 p-2">Username</th>
                        <th className="border border-gray-300 p-2">Solved</th>
                        <th className="border border-gray-300 p-2">Submissions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, i) => (
                        <tr key={entry.userId}>
                            <td className="border border-gray-300 p-2">{i + 1}</td>
                            <td className="border border-gray-300 p-2">{entry.username}</td>
                            <td className="border border-gray-300 p-2">{entry.solvedCount}</td>
                            <td className="border border-gray-300 p-2">{entry.totalSubmissions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
