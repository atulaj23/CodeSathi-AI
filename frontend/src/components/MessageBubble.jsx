import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function MessageBubble({ role, text }) {
  return (
    <div className={`message ${role}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children }) {
            const match = /language-(\w+)/.exec(className || "");

            if (!inline && match) {
              const code = String(children).replace(/\n$/, "");

              return (
                <div className="code-block">
                  <div className="code-header">
                    <span>{match[1]}</span>

                    <button
                      className="copy-btn"
                      onClick={() => {
                        navigator.clipboard.writeText(code);
                      }}
                    >
                      Copy
                    </button>
                  </div>

                  <SyntaxHighlighter
                    language={match[1]}
                    style={oneDark}
                    PreTag="div"
                  >
                    {code}
                  </SyntaxHighlighter>
                </div>
              );
            }

            return (
              <code className="inline-code">
                {children}
              </code>
            );
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}