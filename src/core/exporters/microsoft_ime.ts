import { DictEntry } from "../types.ts";

function mapPosMicrosoftIME(pos: string): string {
  switch (pos) {
    case "proper_noun":
    case "proper_noun_place":
      return "固有名詞";
    default:
      return "名詞";
  }
}

export function exportMicrosoftIME(entries: DictEntry[]): string {
  return entries.map((e) =>
    [
      e.reading,
      e.word,
      mapPosMicrosoftIME(e.pos),
    ].join("\t")
  ).join("\n") + "\n";
}
