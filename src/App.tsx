import React, { useState } from 'react';
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
  const [notes, setNotes] = useState<noteType[]>([]);
  const [activeNote, setACtiveNote] = useState<string>('');

  const onAddNote = () => {
    const newNote: noteType = {
      id: uuid(),
      title: '新しいノート',
      content: '新しいノートの内容',
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
