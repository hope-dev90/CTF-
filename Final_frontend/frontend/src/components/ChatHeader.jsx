import React from "react";
import { Bot, Moon, Sun, X } from "lucide-react"; 

function ChatHeader({ isDark, setIsDark, setIsOpen }) {
  return (
    <header 
      /* Added flex-shrink-0 via Bootstrap class for extra safety */
      className="d-flex justify-content-between align-items-center px-3 shrink-0" 
      style={{ 
        height: "60px", 
        backgroundColor: isDark ? "#505770" : "#EBE8FC",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
        /* flexShrink: 0 ensures the header never gets squashed by the body */
        flexShrink: 0, 
        zIndex: 10 // Keeps it layered above the scrolling messages
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <div className="p-1 bg-white shadow-sm rounded-3">
          <Bot size={20} style={{ color: "#6c63ed" }} />
        </div>
        <h1 className="m-0 fw-bold fs-6" style={{ color: isDark ? "white" : "#6C63F0" }}>
          Asha
        </h1>
      </div>

      <div className="d-flex gap-1">
        <button onClick={() => setIsDark(!isDark)} className="btn btn-sm border-0 shadow-none">
          {isDark ? <Sun size={18} color="white" /> : <Moon size={18} />}
        </button>
        {/* The Close Button */}
        <button onClick={() => setIsOpen(false)} className="btn btn-sm border-0 shadow-none">
          <X size={18} color={isDark ? "white" : "black"} />
        </button>
      </div>
    </header>
  );
}

export default ChatHeader;