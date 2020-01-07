import React from "react";
import { Tonal } from "@tonaljs/modules";
import "./FretNote.css";
import { NoteDisplay } from "./App";

interface FretNoteProps {
  note: Tonal.Note;
  display: NoteDisplay;
  color: string;
  backgroundColor: string;
  romanNumeral?: string;
}

export default function FretNote(props: FretNoteProps) {
  let display;
  switch (props.display) {
    case NoteDisplay.PitchClass:
      display = props.note.pc;
      break;
    case NoteDisplay.ScaleDegree:
      display = props.romanNumeral ? props.romanNumeral : props.note.name;
      break;
    default:
      display = props.note.name;
      break;
  }
  return (
    <div className="fret-note-container">
      <div
        className="fret-note-circle"
        style={{ color: props.color, backgroundColor: props.backgroundColor }}
      >
        <div>{display}</div>
      </div>
    </div>
  );
}
