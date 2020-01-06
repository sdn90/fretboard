import React, { useState, SyntheticEvent } from "react";
import "./App.css";
import Fretboard from "./Fretboard";
import { Tonal } from "@tonaljs/modules";

interface TuningPresets {
  [key: string]: Tonal.Note[];
}
const TUNING_PRESETS: TuningPresets = {
  EADG: ["E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[],
  BEADG: ["B1", "E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[]
};
const App: React.FC = () => {
  const [tuning, setTuning] = useState<Tonal.Note[]>(TUNING_PRESETS.EADG);
  const [fretCount, setFretCount] = useState(22);

  function onTuningChange(name: string) {
    setTuning(TUNING_PRESETS[name]);
  }

  return (
    <div className="App">
      <Fretboard tuning={tuning} fretLength={fretCount} />
      <div style={{ display: "flex", marginTop: 16 }}>
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
          <label>Frets</label>
          <div>
            <input
              type="number"
              value={fretCount}
              onChange={e => setFretCount(parseInt(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
