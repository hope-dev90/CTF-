import React, { useState, useEffect } from 'react';
import { learnApi } from '../services/api';
import PayloadCard from '../components/PayloadCard';
import Modal from '../components/Modal';

const EMPTY = { title: '', content: '', category: '', tags: '' };

export default function LearnPage({ search }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);

  const load = async () => {
    setLoading(true);
    try { setItems(await learnApi.getAll()); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setEditing(null); setForm(EMPTY); setShowModal(true); };
  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title, content: item.content, category: item.category || '', tags: (item.tags || []).join(', ') });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [] };
    try {
      editing ? await learnApi.update(editing.id, payload) : await learnApi.create(payload);
      setShowModal(false);
      load();
    } catch (e) { setError(e.message); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this entry?')) return;
    await learnApi.remove(id);
    load();
  };

  const filtered = items.filter(i =>
    !search || i.title?.toLowerCase().includes(search.toLowerCase()) ||
    i.content?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <header className="mb-12">
        <div className="flex items-end justify-between">
          <div>
            <nav className="flex items-center gap-2 mb-2 text-xs font-mono" style={{ color: '#bbcbb8' }}>
              <span>Library</span>
              <span className="material-symbols-outlined" style={{ fontSize: 14 }}>chevron_right</span>
              <span style={{ color: '#d7baff' }}>Learning Notes</span>
            </nav>
            <h2 className="text-3xl font-bold" style={{ color: '#e5e2e1', fontFamily: 'Hanken Grotesk' }}>
              Cybersecurity Knowledge Base
            </h2>
          </div>
          <button onClick={openCreate} className="px-6 py-2 rounded-lg font-bold flex items-center gap-2"
            style={{ background: '#d7baff', color: '#290055' }}>
            <span className="material-symbols-outlined">add</span>New Note
          </button>
        </div>
      </header>

      {error && <div className="mb-6 p-4 rounded-lg border text-sm font-mono"
        style={{ background: '#93000a22', borderColor: '#ffb4ab', color: '#ffb4ab' }}>{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="material-symbols-outlined animate-spin text-5xl" style={{ color: '#d7baff' }}>progress_activity</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
          {filtered.map(item => (
            <PayloadCard key={item.id} item={item} onEdit={openEdit} onDelete={handleDelete} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 flex flex-col items-center justify-center h-48 gap-3">
              <span className="material-symbols-outlined text-5xl" style={{ color: '#3c4a3c' }}>menu_book</span>
              <p className="font-mono text-sm" style={{ color: '#bbcbb8' }}>No learning notes yet. Add one!</p>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <Modal title={editing ? 'Edit Note' : 'New Learning Note'} onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Title *</label>
              <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Category (e.g. Web, Crypto)</label>
              <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Tags (comma separated)</label>
              <input value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))}
                placeholder="xss, web, bypass"
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div>
              <label className="block text-xs font-mono mb-1" style={{ color: '#bbcbb8' }}>Content *</label>
              <textarea value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))}
                required rows={5}
                className="w-full px-3 py-2 rounded-lg border text-sm outline-none resize-none"
                style={{ background: '#131313', borderColor: '#3c4a3c', color: '#e5e2e1' }} />
            </div>
            <div className="flex gap-3 justify-end mt-2">
              <button type="button" onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-mono border"
                style={{ borderColor: '#3c4a3c', color: '#bbcbb8' }}>Cancel</button>
              <button type="submit" className="px-6 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#d7baff', color: '#290055' }}>
                {editing ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
