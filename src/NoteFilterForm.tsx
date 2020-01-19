import React, { useState, useEffect } from "react";
import { Scale } from "@tonaljs/modules";
import { Scale as IScale } from "./Scale";
import { ReactComponent as FlatSVG } from "./Flat.svg";

interface NoteFilterFormProps {
  initialValue: {
    tonic: string;
    octave: string;
    name: string;
  };
  onChange: (scale: IScale) => void;
}

enum Accidental {
  Natural = "",
  Flat = "b",
  Sharp = "#"
}

export default function NoteFilterForm(props: NoteFilterFormProps) {
  const [selectedTonic, setSelectedTonic] = useState(props.initialValue.tonic);
  const [selectedAccidental, setSelectedAccidental] = useState<Accidental>(
    Accidental.Natural
  );
  const [selectedOctave, setSelectedOctave] = useState(
    props.initialValue.octave
  );
  const [selectedScaleName, setSelectedScaleName] = useState(
    props.initialValue.name
  );

  useEffect(() => {
    const s = Scale.scale(
      `${selectedTonic}${selectedAccidental}${selectedOctave} ${selectedScaleName}`
    );
    props.onChange(s);
  }, [
    selectedTonic,
    selectedOctave,
    selectedAccidental,
    selectedScaleName,
    props.onChange
  ]);

  return (
    <div>
      <div>
        <div>
          <h4 style={{ margin: 0, color: "#ccc" }}>Tonic</h4>
          {["A", "B", "C", "D", "E", "F", "G"].map(tonic => (
            <button
              style={{
                display: "inline-block",
                marginRight: 64,
                fontSize: 32,
                fontWeight: 700,
                background: "none",
                border: 0,
                padding: 0,
                cursor: "pointer",
                color: tonic === selectedTonic ? "rgb(120, 116, 255)" : "#222"
              }}
              onClick={() => setSelectedTonic(tonic)}
            >
              {tonic}
            </button>
          ))}
        </div>
        <div>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600 }}>
            {[Accidental.Natural, Accidental.Flat, Accidental.Sharp].map(a => {
              return (
                <div
                  style={{
                    marginRight: 32,
                    color: selectedAccidental === a ? "purple" : "#111"
                  }}
                  onClick={() => setSelectedAccidental(a)}
                >
                  {accidentalName(a)}
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={{ color: "#ccc" }}>Name</h3>
          <select
            onChange={e => setSelectedScaleName(e.target.value)}
            defaultValue={selectedScaleName}
          >
            <option value="major">Major</option>
            <option value="minor">Minor</option>
            <option value="dorian">Dorian</option>
            <option value="major pentatonic">Major Pentatonic</option>
          </select>
        </div>
      </div>
    </div>
  );
}

function accidentalName(accidental: Accidental): string {
  switch (accidental) {
    case Accidental.Flat:
      return "Flat";
    case Accidental.Sharp:
      return "Sharp";
    case Accidental.Natural:
      return "Natural";
  }
}

