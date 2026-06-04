import React, { useState } from 'react';

export default function TopBar({ search, onSearch }) {
  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16"
      style={{ background: '#131313', borderBottom: '1px solid #3c4a3c' }}>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined" style={{ color: '#31e368' }}>terminal</span>
        <h1 className="font-bold tracking-tight text-2xl" style={{ color: '#31e368', fontFamily: 'Hanken Grotesk' }}>
          Payload Hub
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center px-4 py-2 rounded-lg border"
          style={{ background: '#1c1b1b', borderColor: '#3c4a3c' }}>
          <span className="material-symbols-outlined mr-2" style={{ color: '#bbcbb8', fontSize: 18 }}>search</span>
          <input
            className="bg-transparent border-none outline-none text-sm w-64"
            style={{ color: '#e5e2e1' }}
            placeholder="Search payloads..."
            value={search}
            onChange={e => onSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex flex-col items-end">
            <span className="text-xs font-mono" style={{ color: '#e5e2e1' }}>Root_User</span>
            <span className="flex items-center gap-1" style={{ fontSize: 10, color: '#31e368' }}>
              <span className="w-1.5 h-1.5 rounded-full pulse-active inline-block" style={{ background: '#31e368' }} />
              Online
            </span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border" style={{ borderColor: 'rgba(49,227,104,0.3)' }}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6heKkaVktO3wQ_NtS-9Xhc85REZcduFxiUg0Pv9DwozXk90co8cS3NJugk73yYlxlW3cr3Dbwrmn4iN_nw8eunIzb91a1Pp3fLxJ7qVW_bAiLr4wYYtYRX1xjK5Qg5AXmisZ0xWJaErWGvK6MG2xw2BNo7BOtSV2CnWRaWo-7hKKBuBo00gKvo1KaeDCyibGyBLs9V2Z8GsZFNPndY1fFW6hGjy5YSgjtv-1a4Qb-UxZLhJFbbd5QJ7J4_O-0sL95BrytvHepFPs"
              alt="User"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
