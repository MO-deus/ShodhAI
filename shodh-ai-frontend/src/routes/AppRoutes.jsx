import { Routes, Route } from "react-router-dom";
import JoinPage from "../pages/JoinPage";
import ContestPage from "../pages/ContestPage";
import ProblemPage from "../pages/ProblemPage";
import LeaderboardPage from "../pages/LeaderBoardPage"; // import your leaderboard component

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<JoinPage />} />
      <Route path="/contest/:contestId" element={<ContestPage />} />
      <Route path="/contest/:contestId/problem/:problemId" element={<ProblemPage />} />
      <Route path="/contest/:contestId/leaderboard" element={<LeaderboardPage />} />
    </Routes>
  );
}

