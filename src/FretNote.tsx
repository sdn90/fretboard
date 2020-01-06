import React from "react";
import { Tonal } from "@tonaljs/modules";
import "./FretNote.css";
import { NoteDisplay } from "./App";

interface FretNoteProps {
  note: Tonal.Note;
  display: NoteDisplay;
  filtered: boolean;
}

export default function FretNote(props: FretNoteProps) {
  let display;
  switch (props.display) {
    case NoteDisplay.PitchClass:
      display = props.note.pc;
      break;
    default:
      display = props.note.name;
      break;
  }
  return (
    <div className="fret-note-container">
      <div
        className={`fret-note-circle${
          props.filtered ? " fret-note-filtered" : ""
        }`}
        style={{ opacity: props.filtered ? 1 : 0.2 }}
      >
        {display}
      </div>
    </div>
  );
}
