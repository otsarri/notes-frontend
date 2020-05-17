import React from "react";

const Note = ({ note, toggleImportance }) => {
  console.log("NOTE COMPONENT: ", note);
  const label = note.important ? "Make not important" : "Make important";

  return (
    <li className="note">
      {note.content}
      <br />
      <button onClick={toggleImportance}>{label}</button>
    </li>
  );
};

export default Note;
