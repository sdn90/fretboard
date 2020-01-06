import React, { useState } from "react";
import "./App.css";
import Fretboard from "./Fretboard";
import { Tonal, Scale } from "@tonaljs/modules";
import { prependOnceListener } from "cluster";

interface TuningPresets {
  [key: string]: Tonal.Note[];
}
const TUNING_PRESETS: TuningPresets = {
  EADG: ["E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[],
  BEADG: ["B1", "E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[]
};

export interface NoteFilter {
  name: string;
  fn: (note: Tonal.Note) => boolean;
}

export enum NoteDisplay {
  PitchClass = "Pitch Class",
  PitchNotation = "Pitch Notation"
}

const App: React.FC = () => {
  const [tuning, setTuning] = useState<Tonal.Note[]>(TUNING_PRESETS.EADG);
  const [fretCount, setFretCount] = useState(22);
  const [noteDisplay, setNoteDisplay] = useState(NoteDisplay.PitchNotation);
  const [noteFilters, setNoteFilters] = useState<NoteFilter[]>([
    {
      name: "C Major",
      fn: note => Scale.scale("C major").notes.includes(note.pc)
    }
  ]);

  function onTuningChange(name: string) {
    setTuning(TUNING_PRESETS[name]);
  }

  function removeNoteFilter(index: number) {
    setNoteFilters(noteFilters.filter((nf, i) => i !== index));
  }

  return (
    <div className="App">
      <Fretboard
        tuning={tuning}
        fretLength={fretCount}
        noteDisplay={noteDisplay}
        noteFilters={noteFilters}
      />

      <h5 style={{ padding: 8, margin: 0 }}>Display Settings</h5>
      <div style={{ display: "flex", padding: 8 }}>
        <div>
          <div>
            <label>Tuning</label>
          </div>
          <select onChange={e => onTuningChange(e.target.value)}>
            <option value="EADG">EADG</option>
            <option value="BEADG">BEADG</option>
          </select>
        </div>

        <div style={{ marginLeft: 16 }}>
          <label>Fret count</label>
          <div>
            <input
              type="number"
              value={fretCount}
              onChange={e => setFretCount(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div style={{ marginLeft: 16 }}>
          <label>Note Display</label>
          <div>
            <select
              onChange={e => setNoteDisplay(e.target.value as NoteDisplay)}
              defaultValue={noteDisplay}
            >
              <option value={NoteDisplay.PitchClass}>
                {NoteDisplay.PitchClass}
              </option>
              <option value={NoteDisplay.PitchNotation}>
                {NoteDisplay.PitchNotation}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 8 }}>
        <div>Active filters</div>
        <div style={{ marginBottom: 16 }}>
          {noteFilters.map((nf, index) => {
            return (
              <div>
                {nf.name}{" "}
                <button onClick={() => removeNoteFilter(index)}>X</button>
              </div>
            );
          })}
        </div>

        <div>Scales</div>
        <select>
          {["A", "B", "C", "D", "E", "F", "G"].map(letter => (
            <option value={letter}>{letter}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default App;
