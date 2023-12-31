import { FC } from 'react';
import './Sidebar.css';

type Props = {
  onAddNote: () => void;
  notes: { id: string; title: string; content: string; modDate: number }[];
  onDeleteNote: (id: string) => void;
  activeNote: string;
  setACtiveNote: (activeNote: string) => void;
};

export const Sidebar: FC<Props> = ({
  onAddNote,
  notes,
  onDeleteNote,
  activeNote,
  setACtiveNote,
}) => {
  const sortedNotes = notes.sort((a, b) => b.modDate - a.modDate);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1>ノート</h1>
        <button onClick={onAddNote}>追加</button>
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map((note) => (
          <div
            className={`app-sidebar-note ${note.id === activeNote && 'active'}`}
            key={note.id}
            onClick={() => setACtiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button
                onClick={() => {
                  onDeleteNote(note.id);
                }}
              >
                削除
              </button>
            </div>
            <p>{note.content}</p>
            <small>
              最後の修正日：
              {new Date(note.modDate).toLocaleDateString('ja-JP', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};
