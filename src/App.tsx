import React, { useState } from "react";
import "./App.css";
import Fretboard from "./Fretboard";
import { Tonal, Scale } from "@tonaljs/modules";
import FretboardDisplaySettingsForm, {
  FretboardDisplaySettings,
  TUNING_PRESETS
} from "./FretboardDisplaySettings";
import NoteFilterForm from "./NoteFilterForm";

enum VisualState {
  Hidden,
  Dimmed
}

export interface NoteFilter {
  name: string;
  fn: (note: Tonal.Note) => boolean;
}

export enum NoteDisplay {
  PitchClass = "Pitch Class",
  PitchNotation = "Pitch Notation"
}

const App: React.FC = () => {
  const [fretboardDisplaySettings, setFretboardDisplaySettings] = useState<
    FretboardDisplaySettings
  >({
    noteDisplay: NoteDisplay.PitchNotation,
    fretCount: 22,
    tuning: TUNING_PRESETS.EADG
  });

  const [noteFilters, setNoteFilters] = useState<NoteFilter[]>([
    {
      name: "C3 Major",
      fn: note => Scale.scale("C3 major").notes.includes(note.name)
    }
  ]);
  function removeNoteFilter(index: number) {
    setNoteFilters(noteFilters.filter((nf, i) => i !== index));
  }

  function addNoteFilter(noteFilter: NoteFilter) {
    setNoteFilters(noteFilters.concat(noteFilter));
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1 style={{ paddingLeft: 8, fontSize: 96, margin: 0, color: "#333" }}>
          Fretboard
        </h1>
        <FretboardDisplaySettingsForm
          displaySettings={fretboardDisplaySettings}
          onChange={setFretboardDisplaySettings}
        />
      </div>
      <Fretboard
        tuning={fretboardDisplaySettings.tuning}
        fretLength={fretboardDisplaySettings.fretCount}
        noteDisplay={fretboardDisplaySettings.noteDisplay}
        noteFilters={noteFilters}
      />

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
      </div>

      <div style={{ marginTop: 16, padding: 8 }}>
        <NoteFilterForm addFilter={nf => noteFilters.concat(nf)} />
      </div>
    </div>
  );
};

export default App;
