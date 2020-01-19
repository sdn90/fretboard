import React, { useState } from "react";
import "./App.css";
import Fretboard from "./Fretboard";
import { Scale } from "@tonaljs/modules";
import { romanNumeral } from "@tonaljs/roman-numeral";
import FretboardDisplaySettingsForm, {
  FretboardDisplaySettings,
  TUNING_PRESETS
} from "./FretboardDisplaySettings";
import NoteFilterForm from "./NoteFilterForm";
import { Scale as IScale, noteIndexToRoman } from "./Scale";
import { interval } from "@tonaljs/tonal";
export enum NoteDisplay {
  PitchClass = "Pitch Class",
  PitchNotation = "Pitch Notation",
  ScaleDegree = "Scale Degree"
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
  const [selectedScale, setSelectedScale] = useState<IScale>(c3major);

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

      <div>
        <div
          style={{
            padding: 8,
            display: "flex",
            alignItems: "center",
            backgroundColor: "#222",
            color: "#fff"
          }}
        >
          <h1 style={{ margin: 0, fontSize: 64 }}>{selectedScale.name}</h1>
          {/* <small>{selectedScale.aliases.map(capitalize).join(", ")}</small> */}
          <div style={{ display: "flex", marginLeft: 64 }}>
            {selectedScale.notes.map((note, index) => {
              return (
                <div
                  style={{
                    marginRight: 32,
                    textAlign: "center"
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 600 }}>{note}</div>
                  <div
                    style={{
                      fontSize: 16,
                      fontFamily: "Times New Roman"
                    }}
                  >
                    {replaceAccidentalUnicode(
                      romanNumeral(interval(selectedScale.intervals[index]))
                        .name
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ padding: 8 }}>
          <NoteFilterForm
            initialValue={{ tonic: "C", name: "major", octave: "3" }}
            onChange={setSelectedScale}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
const FLAT = "♭";
const SHARP = "♯";

function replaceAccidentalUnicode(romanStr: string): string {
  const firstLetter = romanStr[0];
  if (firstLetter === "b") {
    return FLAT + romanStr.slice(1);
  } else if (firstLetter === "#") {
    return SHARP + romanStr.slice(1);
  } else {
    return romanStr;
  }
}

function capitalize(str: string): string {
  return str[0].toUpperCase() + str.slice(1);
}
