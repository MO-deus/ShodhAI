import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import ContestPage from "./pages/ContestPage";
import ProblemPage from "./pages/ProblemPage";
import LeaderboardPage from "./pages/LeaderBoardPage"; 
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JoinPage />} />
        <Route path="/contest/:contestId" element={<ContestPage />} />
        <Route path="/contest/:contestId/problem/:problemId" element={<ProblemPage />} />
        <Route path="/contest/:contestId/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </Router>
  );
}
