import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, loading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="messages">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          text={msg.text}
        />
      ))}

      {loading && (
        <div className="typing">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}