import React from 'react';

export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="rounded-xl p-6 w-full max-w-lg mx-4 border"
        style={{ background: '#1c1b1b', borderColor: '#3c4a3c' }}>
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
            {title}
          </h2>
          <button onClick={onClose} style={{ color: '#bbcbb8' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
