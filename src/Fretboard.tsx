import React from "react";
import { Tonal, Interval } from "@tonaljs/modules";
import Fret from "./Fret";

interface FretboardProps {
  tuning: Tonal.Note[];
  fretLength: number;
}

function calcInlay(fretNumber: number): number {
  const single = [3, 5, 7, 9, 15, 17, 19];
  if (single.includes(fretNumber)) {
    return 1;
  } else if (fretNumber === 12) {
    return 2;
  } else {
    return 0;
  }
}

export default function Fretboard(props: FretboardProps) {
  const stringNotes: Tonal.Note[][] = props.tuning
    .map(openStringNote => {
      const notes = [];
      for (let i = 1; i < props.fretLength; i++) {
        notes.push(
          Tonal.note(
            Tonal.transpose(openStringNote.name, Interval.fromSemitones(i))
          ) as Tonal.Note
        );
      }
      return [openStringNote].concat(notes);
    })
    .slice()
    .reverse();

  const fretsRange = Array.from(Array(props.fretLength));

  return (
    <div style={{ display: "flex" }}>
      {fretsRange.map((f, i) => {
        return (
          <Fret
            key={i}
            width={i === 0 ? 48 : 128 - Math.log2(i + 1) * 17.817}
            inlayCount={calcInlay(i)}
          >
            <div style={{ textAlign: "center" }}>
              {verticalSlice(stringNotes, i).map(n => (
                <div
                  style={{
                    marginTop: 16,
                    marginBottom: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <div
                    style={{
                      border: "1px #ccc solid",
                      borderRadius: 32,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                      height: 32
                    }}
                  >
                    {n.pc}
                  </div>
                </div>
              ))}
              <div
                style={{ backgroundColor: "#fff", fontSize: 12, color: "#999" }}
              >
                {i}
              </div>
            </div>
          </Fret>
        );
      })}
    </div>
  );
}
function verticalSlice<T>(arr: T[][], i: number): T[] {
  return arr.map(arr2d => arr2d[i]);
}
