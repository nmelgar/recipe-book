import { loadHeaderFooter } from './utils.mjs';

const notesListContainer = document.querySelector('.notes-list');
const saveNoteButton = document.getElementById('save-note');
const heroNameInput = document.getElementById('hero-name');
const noteContentInput = document.getElementById('note-content');

// load notes from local storage
function loadNotes() {
    return JSON.parse(localStorage.getItem('superheroNotes')) || [];
}

// save notes to local storage
function saveNotes(notes) {
    localStorage.setItem('superheroNotes', JSON.stringify(notes));
}

// func to render notes
function renderNotes(notes) {
    notesListContainer.innerHTML = notes.map(note => `
        <li>
            <strong>${note.heroName}</strong>: ${note.content}
        </li>
    `).join('');
}

// func to handle note saving
function handleSaveNote() {
    const heroName = heroNameInput.value.trim();
    const noteContent = noteContentInput.value.trim();

    if (!heroName || !noteContent) {
        alert('Please enter both a superhero name and a note.');
        return;
    }

    const notes = loadNotes();
    notes.push({ heroName, content: noteContent });
    saveNotes(notes);
    renderNotes(notes); 
    heroNameInput.value = ''; 
    noteContentInput.value = '';
}

// initialize the notes page
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    const notes = loadNotes();
    renderNotes(notes);

    saveNoteButton.addEventListener('click', handleSaveNote);
});
