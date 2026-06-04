import React from "react";
import { Bot, User } from "lucide-react";

function ChatBody({ messages, isTyping, mainRef }) {
  return (
    <main
      ref={mainRef}
      className="grow overflow-y-auto w-100 px-4 py-4"
      style={{ 
        minHeight: "0", 
        scrollbarWidth: "thin",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div className="container-fluid p-0">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`d-flex mb-4 ${msg.from === "user" ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar Icon */}
            <div 
              className="d-flex align-items-center justify-content-center shrink-0 shadow-sm"
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "12px",
                /* Using variables for a uniform look */
                backgroundColor: msg.from === "ai" ? "var(--primary-ghost)" : "var(--pink)",
                border: msg.from === "ai" ? "1px solid rgba(122, 58, 237, 0.2)" : "none",
                marginLeft: msg.from === "user" ? "12px" : "0",
                marginRight: msg.from === "ai" ? "12px" : "0",
                transition: "background-color 0.3s ease"
              }}
            >
              {msg.from === "ai" 
                ? <Bot size={18} color="var(--primary)" /> 
                : <User size={18} color="white" />
              }
            </div>

            {/* Message Bubble Container */}
            <div style={{ maxWidth: "78%", display: "flex", flexDirection: "column" }}>
              <div 
                className="p-3 shadow-sm"
                style={{ 
                  borderRadius: "20px",
                  /* Uniform surfaces: AI uses the background variable, User uses primary purple */
                  backgroundColor: msg.from === "ai" ? "var(--white)" : "var(--primary)", 
                  color: msg.from === "ai" ? "var(--text-dark)" : "#ffffff",
                  /* Subtle border helps clarity in Dark Mode */
                  border: msg.from === "ai" ? "1px solid rgba(122, 58, 237, 0.12)" : "none",
                  wordBreak: "break-word",
                  transition: "all 0.3s ease"
                }}
              >
                <div style={{ whiteSpace: "pre-line", fontSize: "0.92rem", lineHeight: "1.5" }}>
                  {msg.text}
                </div>
              </div>
              
              {/* Labels for extra layout clarity */}
              <span style={{ 
                fontSize: "10px", 
                marginTop: "4px", 
                color: "var(--text-soft)",
                textAlign: msg.from === "user" ? "right" : "left",
                fontWeight: "500",
                opacity: 0.8
              }}>
                {msg.from === "ai" ? "Assistant" : "You"}
              </span>
            </div>
          </div>
        ))}

        {/* 💜 UNIFORM TYPING INDICATOR 💜 */}
        {isTyping && (
          <div className="d-flex align-items-center gap-2 mb-4">
            <div 
              className="d-flex align-items-center justify-content-center shrink-0"
              style={{ 
                width: "36px", 
                height: "36px", 
                borderRadius: "12px", 
                backgroundColor: "var(--primary-ghost)",
                border: "1px solid rgba(122, 58, 237, 0.2)"
              }}
            >
              <Bot size={18} color="var(--primary)" />
            </div>

            <div 
              className="p-3 shadow-sm d-flex align-items-center justify-content-center gap-1" 
              style={{ 
                borderRadius: "20px", 
                minWidth: "55px", 
                height: "40px",
                backgroundColor: "var(--white)",
                border: "1px solid rgba(122, 58, 237, 0.12)"
              }}
            >
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
            </div>
          </div>
        )}

        <style>{`
          .typing-dot {
            width: 6px;
            height: 6px;
            background-color: var(--primary);
            border-radius: 50%;
            animation: typing-bounce 1.4s infinite ease-in-out both;
          }

          .typing-dot:nth-child(1) { animation-delay: -0.32s; }
          .typing-dot:nth-child(2) { animation-delay: -0.16s; }

          @keyframes typing-bounce {
            0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
            40% { transform: scale(1.0); opacity: 1; }
          }

          /* Clear scrollbar for high-end look */
          main::-webkit-scrollbar {
            width: 4px;
          }
          main::-webkit-scrollbar-thumb {
            background: var(--primary-light);
            border-radius: 10px;
          }
        `}</style>
      </div>
    </main>
  );
}

export default ChatBody;