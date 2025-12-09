import { DictEntry } from "../types.ts";

function mapPosGoogleIME(pos: string): string {
  switch (pos) {
    case "proper_noun":
    case "proper_noun_place":
      return "名詞";
    default:
      return "名詞";
  }
}

export function exportGoogleIME(entries: DictEntry[]): string {
  return entries.map((e) =>
    [
      e.reading,
      e.word,
      mapPosGoogleIME(e.pos),
      e.comment ?? "",
    ].join("\t")
  ).join("\n") + "\n";
}
