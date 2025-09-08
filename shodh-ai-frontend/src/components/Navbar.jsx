import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-3 flex justify-between">
      <Link to="/" className="font-bold">Contest Platform</Link>
      <div className="space-x-4">
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
}
