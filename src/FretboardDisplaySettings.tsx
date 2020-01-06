import React from "react";
import { NoteDisplay } from "./App";
import { Tonal } from "@tonaljs/modules";

export interface FretboardDisplaySettings {
  tuning: Tonal.Note[];
  noteDisplay: NoteDisplay;
  fretCount: number;
}

interface TuningPresets {
  [key: string]: Tonal.Note[];
}

export const TUNING_PRESETS: TuningPresets = {
  EADG: ["E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[],
  BEADG: ["B1", "E2", "A2", "D3", "G3"].map(Tonal.note) as Tonal.Note[]
};

export interface FretboardDisplaySettingsFormProps {
  displaySettings: FretboardDisplaySettings;
  onChange: (settings: FretboardDisplaySettings) => void;
}

export default function FretboardDisplaySettingsForm(
  props: FretboardDisplaySettingsFormProps
) {
  function onTuningChange(name: string) {
    props.onChange({ ...props.displaySettings, tuning: TUNING_PRESETS[name] });
  }

  return (
    <div
      style={{
        marginRight: 8
      }}
    >
      <div style={{ display: "flex" }}>
        <div>
          <div>
            <label htmlFor="display-settings-tuning">
              <small>Tuning</small>
            </label>
          </div>
          <select
            id="display-settings-tuning"
            style={{ padding: 4 }}
            onChange={e => onTuningChange(e.target.value)}
          >
            <option disabled>Bass</option>
            <option value="EADG">EADG</option>
            <option value="BEADG">BEADG</option>
            <option disabled>Guitar</option>
            <option value="EADG">EADGBE</option>
            <option value="DADGBE">DADGBE</option>
          </select>
        </div>

        <div style={{ marginLeft: 16 }}>
          <label>
            <small>Fret count</small>
          </label>
          <div>
            <input
              size={4}
              type="number"
              value={props.displaySettings.fretCount}
              onChange={e =>
                props.onChange({
                  ...props.displaySettings,
                  fretCount: parseInt(e.target.value)
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
