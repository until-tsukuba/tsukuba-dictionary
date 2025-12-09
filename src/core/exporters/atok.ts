import type { DictEntry } from "../types.ts";

function mapPosAtok(pos: string): string {
  if (pos === "proper_noun" || pos === "proper_noun_place") {
    return "固有名詞";
  }
  return "名詞";
}

export function exportAtok(entries: DictEntry[]): string {
  const body = entries
    .map((e) =>
      [
        e.reading,
        e.word,
        mapPosAtok(e.pos),
      ].join("\t")
    )
    .join("\n");

  return "!!ATOK_TANGO_TEXT_HEADER_1\n" + body + "\n";
}
