import React from "react";
import { MessageCircle } from "lucide-react";

function ChatWidget({ isOpen, setIsOpen }) {
  // If the chat is open, we don't render the FAB at all 
  // because the "X" is handled in the header/App.js
  if (isOpen) return null;

  return (
    <>
      <style>{`
        /* ── FAB button ── */
        .cw-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 1070;
          width: 62px;
          height: 62px;
          border-radius: 22px;
          background: linear-gradient(145deg, #7A3AED 0%, #9B6DF5 60%, #B89AF8 100%);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 8px 32px rgba(122, 58, 237, 0.55),
            0 2px 8px rgba(122, 58, 237, 0.25),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.25s ease;
          outline: none;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }

        .cw-fab:hover {
          transform: scale(1.08) translateY(-3px);
          box-shadow:
            0 16px 44px rgba(122, 58, 237, 0.65),
            0 4px 14px rgba(122, 58, 237, 0.3);
        }

        .cw-fab:active { transform: scale(0.93); }

        /* ── Pulse rings ── */
        .cw-pulse {
          position: absolute;
          inset: -4px;
          border-radius: 26px;
          border: 2.5px solid rgba(122, 58, 237, 0.4);
          animation: cw-pulse-ring 2.2s ease-out infinite;
          pointer-events: none;
        }

        .cw-pulse-2 {
          position: absolute;
          inset: -4px;
          border-radius: 26px;
          border: 2px solid rgba(184, 154, 248, 0.22);
          animation: cw-pulse-ring 2.2s ease-out infinite 0.75s;
          pointer-events: none;
        }

        @keyframes cw-pulse-ring {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.65); opacity: 0;  }
        }

        /* ── Notification badge ── */
        .cw-badge {
          position: absolute;
          top: -7px; right: -7px;
          width: 21px; height: 21px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ff8fab, #ff4d7a);
          border: 2.5px solid white;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Times New Roman', Times, serif; /* Updated Font */
          font-size: 10px; font-weight: 700; color: white;
          box-shadow: 0 2px 10px rgba(255, 77, 122, 0.5);
          animation: cw-badge-pop 0.45s cubic-bezier(.34,1.56,.64,1) both;
        }

        @keyframes cw-badge-pop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }

        @media (max-width: 576px) {
          .cw-fab { bottom: 18px; right: 18px; width: 56px; height: 56px; }
        }
      `}</style>

      <button
        className="cw-fab"
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <span className="cw-pulse" />
        <span className="cw-pulse-2" />
        <span className="cw-badge">1</span>
        <MessageCircle size={27} color="white" fill="rgba(255,255,255,0.18)" />
      </button>
    </>
  );
}

export default ChatWidget;