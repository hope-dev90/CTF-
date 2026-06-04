import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../services/api';
import { Bot, User, Send, Mic, MicOff } from 'lucide-react';

const USER_ID = 'root_user_1';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const bodyRef = useRef(null);

  // Load history on mount
  useEffect(() => {
    chatApi.history(USER_ID)
      .then(history => {
        const msgs = history.flatMap(m => [
          { from: 'user', text: m.userMessage },
          { from: 'ai', text: m.botReply },
        ]);
        if (msgs.length === 0) {
          setMessages([{ from: 'ai', text: "Hi there! 💜 I'm Asha, your personal career mentor. How can I help you today?" }]);
        } else {
          setMessages(msgs);
        }
      })
      .catch(() => {
        setMessages([{ from: 'ai', text: "Hi there! 💜 I'm Asha, your personal career mentor. How can I help you today?" }]);
      });
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    setMessages(p => [...p, { from: 'user', text }]);
    setIsTyping(true);
    setError('');
    try {
      const saved = await chatApi.send(USER_ID, text);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(p => [...p, { from: 'ai', text: saved.botReply }]);
      }, 800);
    } catch (e) {
      setIsTyping(false);
      setError(e.message);
      setMessages(p => [...p, { from: 'ai', text: "I'm having trouble right now. Please try again." }]);
    }
  };

  const startListening = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return alert('Voice not supported in this browser');
    const r = new SR();
    r.lang = 'en-US';
    r.onstart = () => setIsListening(true);
    r.onresult = (e) => setInput(e.results[0][0].transcript);
    r.onerror = () => setIsListening(false);
    r.onend = () => setIsListening(false);
    r.start();
  };

  return (
    <div>
      <header className="mb-8">
        <nav className="flex items-center gap-2 mb-2 text-xs font-mono" style={{ color: '#bbcbb8' }}>
          <span>AI Assistant</span>
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
          <span style={{ color: '#d7baff' }}>Asha</span>
        </nav>
        <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
          Asha Career Mentor
        </h2>
        <p className="mt-2 text-sm font-mono" style={{ color: '#bbcbb8' }}>
          Your AI-powered career guidance assistant by Her Access
        </p>
      </header>

      <div className="rounded-xl border overflow-hidden flex flex-col" style={{ height: '70vh', background: '#141414', borderColor: '#3c4a3c' }}>
        {/* Messages */}
        <div ref={bodyRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 message ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: msg.from === 'ai' ? '#1A0B2E' : '#7A3AED',
                  border: '1px solid rgba(122,58,237,0.3)'
                }}>
                {msg.from === 'ai'
                  ? <Bot size={18} color="#7A3AED" />
                  : <User size={18} color="white" />}
              </div>
              <div className="max-w-[75%]">
                <div className="p-3 rounded-2xl text-sm" style={{
                  background: msg.from === 'ai' ? '#201f1f' : '#7A3AED',
                  color: msg.from === 'ai' ? '#e5e2e1' : 'white',
                  border: msg.from === 'ai' ? '1px solid #3c4a3c' : 'none',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-line'
                }}>
                  {msg.text}
                </div>
                <span className="text-xs mt-1 block font-mono" style={{ color: '#bbcbb8', textAlign: msg.from === 'user' ? 'right' : 'left' }}>
                  {msg.from === 'ai' ? 'Asha' : 'You'}
                </span>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: '#1A0B2E', border: '1px solid rgba(122,58,237,0.3)' }}>
                <Bot size={18} color="#7A3AED" />
              </div>
              <div className="p-3 rounded-2xl flex items-center gap-1"
                style={{ background: '#201f1f', border: '1px solid #3c4a3c', minWidth: 55 }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t flex items-center gap-3" style={{ borderColor: '#3c4a3c', background: '#0e0e0e' }}>
          {error && <p className="text-xs font-mono" style={{ color: '#ffb4ab' }}>{error}</p>}
          <button onClick={startListening}
            className="p-2 rounded-lg transition-colors"
            style={{ color: isListening ? '#ffb4ab' : '#bbcbb8', background: 'transparent' }}>
            {isListening ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={isListening ? 'Listening...' : 'Ask Asha anything...'}
            className="flex-1 px-4 py-2 rounded-lg border outline-none text-sm"
            style={{ background: '#201f1f', borderColor: '#3c4a3c', color: '#e5e2e1' }}
          />
          <button onClick={handleSend}
            className="p-2 rounded-xl transition-all active:scale-90"
            style={{ background: '#7A3AED', color: 'white' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
