import React, { useEffect, useState } from 'react';
import './App.css';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';
import uuid from 'react-uuid';

type noteType = {
  id: string;
  title: string;
  content: string;
  modDate: number;
};

function App() {
  const [notes, setNotes] = useState<noteType[]>(
    localStorage.getItem('notes')
      ? JSON.parse(localStorage.getItem('notes') as string)
      : []
  );
  const [activeNote, setACtiveNote] = useState<string>('');

  useEffect(() => {
    // ローカルストレージにノートを保存する
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (notes.length === 0) return;
    setACtiveNote(notes[0].id);
  }, []);

  const onAddNote = () => {
    const newNote: noteType = {
      id: uuid(),
      title: '新しいノート',
      content: '',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  const onDeleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const onUpdatedNote = (updatedNote: any) => {
    // 修正された新しいノートの配列を返す
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      <Sidebar
        onAddNote={onAddNote}
        notes={notes}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setACtiveNote={setACtiveNote}
      />
      <Main activeNote={getActiveNote()} onUpdatedNote={onUpdatedNote} />
    </div>
  );
}

export default App;
