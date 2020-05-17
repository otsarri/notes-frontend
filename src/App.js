import React, { useState, useEffect } from "react";
// import axios from "axios";

import Note from "./components/Note";
import noteService from "./services/notes";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>The Note App.</em>
    </div>
  );
};

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   console.log("Enter useEffect");
  //   noteService.getAllNotes().then((response) => {
  //     console.log("After Response from Promise");
  //     setNotes(response.data);
  //   });
  // }, []);
  const hook = () => {
    console.log("Enter useEffect");
    noteService.getNotes().then((initialNotes) => {
      console.log("After Response from Promise");
      setNotes(initialNotes);
    });
  };
  useEffect(hook, []);
  console.log("Render", notes.length, "notes:");

  const toggleImportanceOf = (id) => {
    console.log(`Importance of ${id} needs to be toggled`);
    const note = notes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .updateNote(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `The note '${note.content}' was already removed from server.`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((note) => note.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    console.log("Button Clicked", event.target);
    const noteObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };
    noteService.createNote(noteObject).then((returnedNote) => {
      console.log("POST response: ", returnedNote);
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div>
      <h1>Notes (Object in Note.js)</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">Save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
