import React, { useState, SyntheticEvent } from "react";
import { Tonal, Scale } from "@tonaljs/modules";
import { NoteFilter } from "./App";

interface NoteFilterFormProps {
  addFilter: (NoteFilter: NoteFilter) => void;
}

export default function NoteFilterForm(props: NoteFilterFormProps) {
  const [scaleInputValue, setScaleInputValue] = useState("");
  const [isError, setIsError] = useState(false);

  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const s = Scale.scale(scaleInputValue);
    console.log(s);
  }

  return (
    <div>
      <h3>Scale</h3>
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
            <div
              style={{
                display: "inline-block",
                marginRight: 16,
                fontSize: 32,
                fontWeight: 700
              }}
            >
              {tonic}
            </div>
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
