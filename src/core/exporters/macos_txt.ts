import type { DictEntry } from "../types.ts";

export function exportMacText(entries: DictEntry[]): string {
  return entries
    .map((e) =>
      [
        e.reading,
        e.word,
        e.pos || "noun",
      ].join(",")
    )
    .join("\n") + "\n";
}
