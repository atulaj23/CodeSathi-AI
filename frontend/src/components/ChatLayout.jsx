import { useState } from "react";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";

import { sendMessage as sendMessageAPI } from "../services/api";

export default function ChatLayout() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! Main CodeSathi AI hu. Kya banana hai aaj? 🚀",
    },
  ]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = message;

    // Show user message
    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      // AI response
      const data = await sendMessageAPI(userMessage);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: data.reply,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Backend se connect nahi ho pa raha.",
        },
      ]);
    } finally {
      // Success ya Error dono case me loading band
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <Sidebar />

      <div className="chat-area">
        <ChatWindow
          messages={messages}
          loading={loading}
        />

        <InputBox
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}