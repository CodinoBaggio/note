import React, { useState } from 'react';
import './App.css';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';

type noteType = {
  id: number;
  title: string;
  content: string;
  modDate: number;
};

function App() {
  const [notes, setNotes] = useState<noteType[]>([]);
  const onAddNote = () => {
    const newNote: noteType = {
      id: 1,
      title: '新しいノート',
      content: '新しいノートの内容',
      modDate: Date.now(),
    };
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  return (
    <div className="App">
      <Sidebar onAddNote={onAddNote} notes={notes} />
      <Main />
    </div>
  );
}

export default App;
