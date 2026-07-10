import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ChatLayout from "./components/ChatLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Main AI */}
        <Route
          path="/chat"
          element={
            <>
              <Navbar />
              <ChatLayout />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}