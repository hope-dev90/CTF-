import React, { useState, useEffect } from 'react';
import { sqlApi } from '../services/api';
import PayloadCard from '../components/PayloadCard';
import Modal from '../components/Modal';

const EMPTY = { title: '', payload: '', dbType: '', notes: '' };

export default function SqlPage({ search }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setItems(await sqlApi.getAll()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, payload: item.payload, dbType: item.dbType || '', notes: item.notes || '' });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      editing ? await sqlApi.update(editing.id, form) : await sqlApi.create(form);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await sqlApi.remove(id);
    load();
  };

  const filtered = items.filter(i =>
    !search || i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.payload?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="mb-12">
        <div className="flex items-end justify-between">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs font-mono" style={{ color: '#bbcbb8' }}>
              <span>Library</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              <span style={{ color: '#75d4e8' }}>SQL Injection</span>
            </nav>
            <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
              SQL Injection Database
            </h2>
          </div>
          <button onClick={openCreate} className="px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition-all"
            style={{ background: '#75d4e8', color: '#00363e' }}>
            <span className="material-symbols-outlined">add</span>New Injection
          </button>
        </div>
      </header>

      {error && <div className="mb-6 p-4 rounded-lg border text-sm font-mono"
        style={{ background: '#93000a22', borderColor: '#ffb4ab', color: '#ffb4ab' }}>{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-5xl" style={{ color: '#75d4e8' }}>progress_activity</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filtered.map(item => (
            <PayloadCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center h-48 gap-3">
              <span className="material-symbols-outlined text-5xl" style={{ color: '#3c4a3c' }}>database</span>
              <p className="font-mono text-sm" style={{ color: '#bbcbb8' }}>No SQL payloads yet. Add one!</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit SQL Payload' : 'New SQL Payload'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>DB Type (e.g. MySQL, PostgreSQL)</label>
              <input value={form.dbType} onChange={e => setForm(p => ({ ...p, dbType: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Payload *</label>
              <textarea value={form.payload} onChange={e => setForm(p => ({ ...p, payload: e.target.value }))}
                required rows={3}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none font-mono resize-none"
                style={{ background: '#000', borderColor: '#3c4a3c', color: '#75d4e8' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Notes</label>
              <textarea value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-mono border"
                style={{ borderColor: '#3c4a3c', color: '#bbcbb8' }}>Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#75d4e8', color: '#00363e' }}>
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
