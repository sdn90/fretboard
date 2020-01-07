import React, { useState } from "react";
import "./App.css";
import Fretboard from "./Fretboard";
import { Tonal, Scale, ScaleDictionary } from "@tonaljs/modules";
import FretboardDisplaySettingsForm, {
  FretboardDisplaySettings,
  TUNING_PRESETS
} from "./FretboardDisplaySettings";
import NoteFilterForm from "./NoteFilterForm";

export enum NoteDisplay {
  PitchClass = "Pitch Class",
  PitchNotation = "Pitch Notation",
  ScaleDegree = "Scale Degree"
}
export interface Scale extends ScaleDictionary.ScaleType {
  tonic: string | null;
  type: string;
  notes: Tonal.NoteName[];
}
const App: React.FC = () => {
  const [fretboardDisplaySettings, setFretboardDisplaySettings] = useState<
    FretboardDisplaySettings
  >({
    noteDisplay: NoteDisplay.PitchNotation,
    fretCount: 22,
    tuning: TUNING_PRESETS.EADG
  });

  const c3major = Scale.scale("C3 major");
  const [selectedScale, setSelectedScale] = useState<Scale>(c3major);

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
        selectedScale={selectedScale}
      />

      <div style={{ marginTop: 16, padding: 8 }}>
        <NoteFilterForm
          initialValue={{ tonic: "C", name: "major", octave: "3" }}
          onChange={setSelectedScale}
        />
      </div>
    </div>
  );
};

export default App;
