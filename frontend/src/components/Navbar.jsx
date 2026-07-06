import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🤖 <span>CodeSathi AI</span>
      </div>

      <div className="right">
        <button className="new-chat">+ New Chat</button>
      </div>
    </nav>
  );
}