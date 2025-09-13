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
        const interval = setInterval(fetchLeaderboard, 15000); // refresh every 15s
        return () => clearInterval(interval);
    }, [contestId]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-screen text-gray-500 text-lg">
                Loading leaderboard...
            </div>
        );
    if (error)
        return (
            <div className="flex justify-center items-center h-screen text-red-500 text-lg">
                Error: {error}
            </div>
        );

    const getRankColor = (rank) => {
        switch (rank) {
            case 0:
                return "bg-yellow-300 font-bold"; // Gold
            case 1:
                return "bg-gray-300 font-semibold"; // Silver
            case 2:
                return "bg-orange-300 font-semibold"; // Bronze
            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
                >
                    ← Back
                </button>

                <h2 className="text-3xl font-bold mb-6 text-indigo-700 text-center">
                    Contest Leaderboard
                </h2>

                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse rounded-xl overflow-hidden shadow-md">
                        <thead className="bg-indigo-100">
                            <tr>
                                <th className="p-3 border-b border-gray-300 text-left">Rank</th>
                                <th className="p-3 border-b border-gray-300 text-left">Username</th>
                                <th className="p-3 border-b border-gray-300 text-left">Solved</th>
                                <th className="p-3 border-b border-gray-300 text-left">Submissions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map((entry, i) => (
                                <tr
                                    key={entry.userId}
                                    className={`hover:bg-indigo-50 transition ${getRankColor(i)}`}
                                >
                                    <td className="p-3 border-b border-gray-200">{i + 1}</td>
                                    <td className="p-3 border-b border-gray-200">{entry.username}</td>
                                    <td className="p-3 border-b border-gray-200">{entry.solvedCount}</td>
                                    <td className="p-3 border-b border-gray-200">{entry.totalSubmissions}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
