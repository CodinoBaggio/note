import { FC } from 'react';
import './Main.css';

export const Main: FC<{ activeNote: any; onUpdatedNote: any }> = ({
  activeNote,
  onUpdatedNote,
}) => {
  if (!activeNote) {
    return <div className="no-active-note">ノートを選択してください</div>;
  } else {
    console.log(activeNote);
  }

  const onEditNote = (key: string, value: string) => {
    onUpdatedNote({
      ...activeNote,
      [key]: value,
      modDate: Date.now(),
    });
  };

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input
          id="title"
          type="text"
          value={activeNote.title}
          onChange={(e) => onEditNote('title', e.target.value)}
        />
        <textarea
          id="content"
          placeholder="ノート内容を記入"
          value={activeNote.content}
          onChange={(e) => onEditNote('content', e.target.value)}
        ></textarea>
      </div>
      <div className="app-main-note-preview">
        <h1 className="preview-title">{activeNote.title}</h1>
        <div className="markdown-preview">{activeNote.content}</div>
      </div>
    </div>
  );
};
