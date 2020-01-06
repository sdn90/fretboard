import React from "react";
import { Tonal, Interval } from "@tonaljs/modules";
import Fret from "./Fret";
import FretNote from "./FretNote";
import { NoteDisplay, NoteFilter } from "./App";

interface FretboardProps {
  tuning: Tonal.Note[];
  fretLength: number;
  noteDisplay: NoteDisplay;
  noteFilters: NoteFilter[];
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
                {verticalSlice(stringNotes, i).map(n => (
                  <FretNote
                    display={props.noteDisplay}
                    note={n}
                    filtered={
                      props.noteFilters.length
                        ? props.noteFilters.some(filter => filter.fn(n))
                        : false
                    }
                  />
                ))}
                <div
                  style={{
                    backgroundColor: "#fff",
                    fontSize: 12,
                    padding: 8,
                    color: "#999"
                  }}
                >
                  {i}
                </div>
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
