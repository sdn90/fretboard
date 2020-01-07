import React, { useState, SyntheticEvent, useEffect } from "react";
import { Scale } from "@tonaljs/modules";
import { Scale as IScale } from "./App";

interface NoteFilterFormProps {
  initialValue: {
    tonic: string;
    octave: string;
    name: string;
  };
  onChange: (scale: IScale) => void;
}

export default function NoteFilterForm(props: NoteFilterFormProps) {
  const [selectedTonic, setSelectedTonic] = useState(props.initialValue.tonic);
  const [selectedOctave, setSelectedOctave] = useState(
    props.initialValue.octave
  );
  const [selectedScaleName, setSelectedScaleName] = useState(
    props.initialValue.name
  );

  useEffect(() => {
    const s = Scale.scale(
      `${selectedTonic}${selectedOctave} ${selectedScaleName}`
    );
    props.onChange(s);
  }, [selectedTonic, selectedOctave, selectedScaleName, props.onChange]);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div>
          <h3>Tonic</h3>
          {[
            "Ab",
            "A",
            "Bb",
            "B",
            "C",
            "Db",
            "D",
            "Eb",
            "E",
            "F",
            "Gb",
            "G"
          ].map(tonic => (
            <button
              style={{
                display: "inline-block",
                marginRight: 16,
                fontSize: 32,
                fontWeight: 700,
                background: "none",
                border: 0,
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
          <h3>Name</h3>
          <div>Major / Ionian</div>
          <div>Minor</div>
        </div>
      </div>
    </div>
  );
}
