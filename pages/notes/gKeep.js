import React, { useEffect, useState } from 'react';

const API_BASE_URL = 'https://keep.googleapis.com/v1';

const GoogleKeepApp = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async () => {
    const newNote = {
      title: 'New Note',
      content: 'This is a new note created via the API.',
    };

    try {
      const response = await fetch(`${API_BASE_URL}/notes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (response.ok) {
        fetchNotes();
      } else {
        console.error('Failed to create note:', response.status);
      }
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${noteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchNotes();
      } else {
        console.error('Failed to delete note:', response.status);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div>
      <h1>Google Keep Notes</h1>
      <button onClick={createNote}>Create Note</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleKeepApp;
