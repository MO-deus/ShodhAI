// LeaderboardPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LeaderboardPage = () => {
    const { contestId } = useParams();
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/contests/${contestId}/leaderboard`);
                const data = await res.json();
                setLeaderboard(data);
            } catch (err) {
                console.error("Failed to fetch leaderboard", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
        const interval = setInterval(fetchLeaderboard, 5000); // 🔄 refresh every 5s
        return () => clearInterval(interval);
    }, [contestId]);

    if (loading) return <div>Loading leaderboard...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🏆 Leaderboard</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Rank</th>
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Solved</th>
                        <th className="border p-2">Submissions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, i) => (
                        <tr key={entry.userId}>
                            <td className="border p-2">{i + 1}</td>
                            <td className="border p-2">{entry.username}</td>
                            <td className="border p-2">{entry.solvedCount}</td>
                            <td className="border p-2">{entry.totalSubmissions}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaderboardPage;
