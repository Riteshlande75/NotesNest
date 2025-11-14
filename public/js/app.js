const api = '/api/notes';
const notesList = document.getElementById('notesList');
const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const noteTags = document.getElementById('noteTags');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const newNoteBtn = document.getElementById('newNoteBtn');
const preview = document.getElementById('preview');
const searchInput = document.getElementById('searchInput');
const seedBtn = document.getElementById('seedBtn');

let notes = [];
let editingId = null;

async function fetchNotes(q='') {
  const url = q ? `${api}?q=${encodeURIComponent(q)}` : api;
  const res = await fetch(url);
  notes = await res.json();
  renderNotesList();
}

function renderNotesList() {
  notesList.innerHTML = '';
  if (!notes.length) {
    notesList.innerHTML = '<li class="empty">No notes yet</li>';
    preview.innerHTML = '<p class="empty">Select a note to preview/edit</p>';
    return;
  }
  notes.forEach(n => {
    const li = document.createElement('li');
    li.dataset.id = n._id;
    li.innerHTML = `
      <div>
        <div class="note-title">${escapeHtml(n.title)}</div>
        <div class="meta">${n.tags?.slice(0,3).join(', ') || ''} • ${new Date(n.updatedAt).toLocaleString()}</div>
      </div>
      <div class="note-actions">
        <button class="openBtn">Open</button>
      </div>
    `;
    notesList.appendChild(li);
    li.querySelector('.openBtn').addEventListener('click', () => openNote(n._id));
  });
}

function renderPreview(note) {
  preview.innerHTML = `
    <h2 class="preview-title">${escapeHtml(note.title)}</h2>
    <div class="preview-meta">${note.tags?.join(', ') || ''} • ${new Date(note.updatedAt).toLocaleString()}</div>
    <div class="preview-content">${escapeHtml(note.content)}</div>
    <div style="margin-top:12px;">
      <button id="editBtn">Edit</button>
      <button id="deleteBtn" class="btn-danger">Delete</button>
    </div>
  `;
  document.getElementById('editBtn').addEventListener('click', () => loadIntoForm(note));
  document.getElementById('deleteBtn').addEventListener('click', () => deleteNote(note._id));
}

function escapeHtml(s='') {
  return String(s)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'", '&#039;');
}

async function openNote(id) {
  const res = await fetch(`${api}/${id}`);
  const note = await res.json();
  renderPreview(note);
}

function loadIntoForm(note) {
  editingId = note._id;
  noteTitle.value = note.title;
  noteContent.value = note.content;
  noteTags.value = (note.tags || []).join(', ');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

async function deleteNote(id) {
  if (!confirm('Delete this note?')) return;
  const res = await fetch(`${api}/${id}`, { method: 'DELETE' });
  if (res.ok) {
    notes = notes.filter(n => n._id !== id);
    renderNotesList();
    preview.innerHTML = '<p class="empty">Note deleted</p>';
  } else {
    alert('Failed to delete note');
  }
}

noteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    title: noteTitle.value.trim(),
    content: noteContent.value,
    tags: noteTags.value.split(',').map(t => t.trim()).filter(Boolean)
  };
  if (!payload.title) { alert('Title required'); return; }

  if (editingId) {
    const res = await fetch(`${api}/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const updated = await res.json();
      // update local list
      notes = notes.map(n => n._id === updated._id ? updated : n);
      renderNotesList();
      renderPreview(updated);
      editingId = null;
      noteForm.reset();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to update');
    }
  } else {
    const res = await fetch(api, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      const created = await res.json();
      notes.unshift(created);
      renderNotesList();
      renderPreview(created);
      noteForm.reset();
    } else {
      const err = await res.json();
      alert(err.error || 'Failed to save');
    }
  }
});

clearBtn.addEventListener('click', () => {
  editingId = null;
  noteForm.reset();
});

newNoteBtn.addEventListener('click', () => {
  editingId = null;
  noteForm.reset();
  noteTitle.focus();
});

searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim();
  fetchNotes(q);
});

seedBtn.addEventListener('click', async () => {
  if (!confirm('Seed demo notes? This will add demo notes to your DB.')) return;
  try {
    await fetch('/seed', { method: 'POST' });
    await fetchNotes();
    alert('Seeded demo notes.');
  } catch (err) {
    alert('Seed failed');
  }
});

// Initial load
fetchNotes();
