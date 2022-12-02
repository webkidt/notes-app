import { useEffect, useState } from 'react';
import Editor from './components/Editor';
import Sidebar from './components/Sidebar';
import Split from 'react-split';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState((notes[0] && notes[0].id) || '');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes(prevNotes => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    // Put recently modified note at the top
    setNotes(oldNotes => {
      let newArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        let oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newArray.unshift({ ...oldNote, body: text });
        } else {
          newArray.push(oldNote);
        }
      }
      return newArray;
    });
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes(oldNotes => {
      return oldNotes.filter(note => {
        return note.id !== noteId;
      });
    });
  }

  function findCurrentNote() {
    return (
      notes.find(note => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction='horizontal' className='split'>
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className='no-notes'>
          <h1>You have no notes</h1>
          <button className='first-note' onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
