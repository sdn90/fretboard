import React from "react";
import { Tonal, Interval } from "@tonaljs/modules";
import Fret from "./Fret";
import FretNote from "./FretNote";
import { NoteDisplay } from "./App";
import { Scale, noteIndexToRoman } from "./Scale";

interface FretboardProps {
  tuning: Tonal.Note[];
  fretLength: number;
  noteDisplay: NoteDisplay;
  selectedScale: Scale;
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
      for (let i = 1; i < props.fretLength + 1; i++) {
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

  const fretsRange = Array.from(Array(props.fretLength + 1));

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "scroll",
        WebkitOverflowScrolling: "touch",
        padding: 8,
        userSelect: "none",
        WebkitUserSelect: "none"
      }}
    >
      <div
        style={{
          display: "flex"
        }}
      >
        {fretsRange.map((f, i) => {
          return (
            <Fret
              key={i}
              width={i === 0 ? 48 : 128 - Math.log2(i) * 17.817}
              inlayCount={calcInlay(i)}
            >
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                {verticalSlice(stringNotes, i).map(n => {
                  let bgColor = "#ccc";
                  let color = "#fff";
                  const scaleDegreeIndex = props.selectedScale.notes
                    .map(scaleNote => Tonal.note(scaleNote)?.chroma as number)
                    .indexOf(n.chroma);
                  if (scaleDegreeIndex > -1 && scaleDegreeIndex < 7) {
                    bgColor = hsla([220, 0.8, 0.55, 1]);
                  }
                  return (
                    <FretNote
                      display={props.noteDisplay}
                      note={n}
                      romanNumeral={noteIndexToRoman(scaleDegreeIndex)}
                      backgroundColor={bgColor}
                      color={color}
                    />
                  );
                })}
              </div>

              <div
                style={{
                  backgroundColor: "#fff",
                  fontSize: 12,
                  padding: 8,
                  textAlign: "center",
                  color: "#999"
                }}
              >
                {i}
              </div>
            </Fret>
          );
        })}
      </div>
    </div>
  );
}
function verticalSlice<T>(arr: T[][], i: number): T[] {
  return arr.map(arr2d => arr2d[i]);
}

function rgba(x: [number, number, number, number]): string {
  return `rgba(${x.join(",")})`;
}

function hsla(x: [number, number, number, number]): string {
  return `hsla(${x[0]}, ${x[1] * 100}%, ${x[2] * 100}%, ${x[3]})`;
}
