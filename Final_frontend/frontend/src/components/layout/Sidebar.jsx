import React from 'react';

const navItems = [
  { label: 'Dashboard', icon: 'dashboard', page: 'dashboard' },
  { label: 'XSS Payloads', icon: 'bug_report', page: 'xss' },
  { label: 'SQL Injection', icon: 'database', page: 'sql' },
  { label: 'Learn Notes', icon: 'menu_book', page: 'learn' },
  { label: 'PicoCTF', icon: 'emoji_events', page: 'picoctf' },
  { label: 'Asha AI', icon: 'smart_toy', page: 'chat' },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <nav className="fixed left-0 top-0 h-full w-72 z-40 flex flex-col p-4 pt-20"
      style={{ background: '#201f1f', borderRight: '1px solid #3c4a3c' }}>

      {/* User card */}
      <div className="mb-8 px-2">
        <div className="flex items-center gap-3 p-3 rounded-xl border"
          style={{ background: '#2a2a2a', borderColor: '#3c4a3c' }}>
          <div className="flex-1">
            <p className="font-bold text-sm" style={{ color: '#e5e2e1' }}>Root_User</p>
            <p className="text-xs font-mono" style={{ color: '#bbcbb8' }}>Level 4 Operator</p>
          </div>
          <span className="material-symbols-outlined" style={{ color: '#31e368', fontVariationSettings: "'FILL' 1" }}>security</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="space-y-1 flex-1">
        {navItems.map(item => {
          const active = activePage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all"
              style={{
                background: active ? '#008092' : 'transparent',
                color: active ? '#f8fdff' : '#bbcbb8',
                fontWeight: active ? 700 : 400,
                fontSize: 12,
                fontFamily: 'JetBrains Mono',
                transform: active ? 'translateX(4px)' : 'none',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20, fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Server load */}
      <div className="mt-auto border-t pt-4 px-2" style={{ borderColor: '#3c4a3c' }}>
        <div className="p-4 rounded-xl border" style={{ background: '#0e0e0e', borderColor: 'rgba(60,74,60,0.3)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: '#bbcbb8' }}>Server Load</span>
            <span className="text-xs font-mono" style={{ color: '#31e368' }}>12%</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: '#353534' }}>
            <div className="h-full rounded-full" style={{ width: '12%', background: '#31e368' }} />
          </div>
        </div>
      </div>
    </nav>
  );
}
