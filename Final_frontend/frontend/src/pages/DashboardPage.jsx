import React, { useState, useEffect } from 'react';
import { xssApi, sqlApi, learnApi, picoctfApi } from '../services/api';

function StatCard({ label, count, icon, color, onClick }) {
  return (
    <button onClick={onClick}
      className="payload-card p-6 rounded-xl flex items-center gap-4 w-full text-left"
      style={{ cursor: 'pointer' }}>
      <div className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{ background: `${color}1A`, border: `1px solid ${color}33` }}>
        <span className="material-symbols-outlined" style={{ color, fontSize: 24 }}>{icon}</span>
      </div>
      <div>
        <p className="text-3xl font-bold" style={{ color, fontFamily: 'Hanken Grotesk' }}>{count}</p>
        <p className="text-xs font-mono mt-1" style={{ color: '#bbcbb8' }}>{label}</p>
      </div>
    </button>
  );
}

export default function DashboardPage({ onNavigate }) {
  const [counts, setCounts] = useState({ xss: 0, sql: 0, learn: 0, picoctf: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([xssApi.getAll(), sqlApi.getAll(), learnApi.getAll(), picoctfApi.getAll()])
      .then(([xss, sql, learn, picoctf]) => setCounts({ xss: xss.length, sql: sql.length, learn: learn.length, picoctf: picoctf.length }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const total = counts.xss + counts.sql + counts.learn + counts.picoctf;

  return (
    <div>
      <header className="mb-12">
        <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
          Dashboard
        </h2>
        <p className="mt-2 text-sm font-mono" style={{ color: '#bbcbb8' }}>
          Your personal cybersecurity knowledge base
        </p>
      </header>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
        <StatCard label="XSS Payloads" count={counts.xss} icon="bug_report" color="#31e368" onClick={() => onNavigate('xss')} />
        <StatCard label="SQL Injections" count={counts.sql} icon="database" color="#75d4e8" onClick={() => onNavigate('sql')} />
        <StatCard label="Learn Notes" count={counts.learn} icon="menu_book" color="#d7baff" onClick={() => onNavigate('learn')} />
        <StatCard label="CTF Writeups" count={counts.picoctf} icon="emoji_events" color="#d7baff" onClick={() => onNavigate('picoctf')} />
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Activity chart */}
        <div className="md:col-span-2 p-6 rounded-xl border" style={{ background: '#201f1f', borderColor: '#3c4a3c' }}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>Weekly Activity</h3>
          </div>
          <div className="h-48 w-full flex items-end gap-2 px-2">
            {[40, 65, 30, 85, 50, 95, 75].map((h, i) => (
              <div key={i} className="flex-1 rounded-t transition-all"
                style={{ height: `${h}%`, background: i === 6 ? '#31e368' : 'rgba(49,227,104,0.2)' }} />
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-mono" style={{ color: '#bbcbb8' }}>
            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d}>{d}</span>)}
          </div>
        </div>

        {/* Total indicator */}
        <div className="p-6 rounded-xl border flex flex-col justify-between" style={{ background: '#201f1f', borderColor: '#3c4a3c' }}>
          <div>
            <h3 className="text-xl font-semibold mb-1" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>Knowledge Base</h3>
            <p className="text-xs font-mono uppercase tracking-widest" style={{ color: '#bbcbb8' }}>Total entries</p>
          </div>
          <div className="flex items-center justify-center py-8">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ping" style={{ background: 'rgba(49,227,104,0.2)' }} />
              <div className="relative w-24 h-24 rounded-full border-4 flex items-center justify-center"
                style={{ borderColor: '#31e368', background: 'rgba(49,227,104,0.1)' }}>
                <span className="text-3xl font-bold" style={{ color: '#31e368' }}>
                  {loading ? '...' : total}
                </span>
              </div>
            </div>
          </div>
          <button onClick={() => onNavigate('chat')}
            className="w-full py-2 rounded-lg border font-bold text-sm transition-colors"
            style={{ borderColor: '#3c4a3c', color: '#e5e2e1', background: '#353534' }}>
            Ask Asha AI
          </button>
        </div>

        {/* Quick access modules */}
        {[
          { page: 'xss', icon: 'bug_report', label: 'XSS Payloads', color: '#31e368', desc: 'XSS techniques and bypass payloads' },
          { page: 'sql', icon: 'database', label: 'SQL Injection', color: '#75d4e8', desc: 'SQL injection payloads and notes' },
          { page: 'learn', icon: 'menu_book', label: 'Learn Notes', color: '#d7baff', desc: 'Cybersecurity learning references' },
        ].map(m => (
          <div key={m.page} className="payload-card p-5 rounded-xl flex flex-col gap-3 cursor-pointer"
            onClick={() => onNavigate(m.page)}>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined" style={{ color: m.color }}>{m.icon}</span>
              <h4 className="font-semibold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>{m.label}</h4>
            </div>
            <p className="text-sm" style={{ color: '#bbcbb8' }}>{m.desc}</p>
            <div className="flex justify-between items-center mt-auto pt-3 border-t" style={{ borderColor: 'rgba(60,74,60,0.3)' }}>
              <span className="text-xs font-mono" style={{ color: m.color }}>→ Open</span>
              <span className="text-xs font-mono" style={{ color: '#bbcbb8' }}>
                {counts[m.page]} entries
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
