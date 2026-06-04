import React, { useState } from "react";
import { Send, Mic, MicOff } from "lucide-react";

function ChatInput({ input, setInput, handleSend }) {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Try Chrome or Safari!");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false; // Stops after user finishes a sentence

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript); // Puts the spoken words into the input box
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <div className="p-3 bg-white flex-shrink-0" style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}>
      <div className="d-flex align-items-center gap-2 bg-light px-3 py-2" style={{ borderRadius: "1.5rem" }}>
        
        {/* Voice Recognition Button */}
        <button 
          onClick={startListening}
          className={`btn p-0 border-0 shadow-none ${isListening ? "text-danger" : "text-muted"}`}
        >
          {isListening ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
        </button>

        <input
          type="text"
          className="form-control border-0 bg-transparent shadow-none"
          placeholder={isListening ? "Listening..." : "Talk to Asha..."}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />

        <button 
          onClick={handleSend}
          className="btn d-flex align-items-center justify-content-center p-2 shadow-sm"
          style={{ 
            backgroundColor: "#f78ca2", 
            borderRadius: "12px", 
            color: "white",
            transition: "transform 0.2s"
          }}
          onMouseDown={(e) => e.currentTarget.style.transform = "scale(0.9)"}
          onMouseUp={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <Send size={18} />
        </button>
      </div>

      <style>{`
        .animate-pulse {
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default ChatInput;