import React, { useState } from 'react';
import TopBar from './components/layout/TopBar';
import Sidebar from './components/layout/Sidebar';
import DashboardPage from './pages/DashboardPage';
import XssPage from './pages/XssPage';
import SqlPage from './pages/SqlPage';
import LearnPage from './pages/LearnPage';
import PicoctfPage from './pages/PicoctfPage';
import ChatPage from './pages/ChatPage';

const PAGES = {
  dashboard: DashboardPage,
  xss: XssPage,
  sql: SqlPage,
  learn: LearnPage,
  picoctf: PicoctfPage,
  chat: ChatPage,
};

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [search, setSearch] = useState('');

  const Page = PAGES[activePage] || DashboardPage;

  const handleNavigate = (page) => {
    setActivePage(page);
    setSearch('');
  };

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
      <TopBar search={search} onSearch={setSearch} />
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <main className="pt-16 overflow-y-auto" style={{ marginLeft: '18rem', minHeight: '100vh' }}>
        <div className="p-6">
          <Page search={search} onNavigate={handleNavigate} />
          <div className="h-20" />
        </div>
      </main>
    </div>
  );
}
