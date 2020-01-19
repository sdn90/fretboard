import { ScaleDictionary, Tonal } from "@tonaljs/modules";

export interface Scale extends ScaleDictionary.ScaleType {
  tonic: string | null;
  type: string;
  notes: Tonal.NoteName[];
}

export function noteIndexToRoman(index: number) {
  return ["I", "II", "III", "IV", "V", "VI", "VII"][index];
}
