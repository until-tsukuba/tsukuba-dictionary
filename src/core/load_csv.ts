import { parse } from "@std/csv/parse";
import type { DictEntry } from "./types.ts";

export function parseCsv(
  text: string,
  kind: string,
  source: string,
): DictEntry[] {
  const rows = parse(text, {
    skipFirstRow: true,
    comment: "#",
  });

  const entries: DictEntry[] = [];

  for (const row of rows) {
    if (!row.reading || !row.word) {
      continue;
    }

    const pos = (row.pos ?? "noun").trim();
    const comment = (row.comment ?? "").trim();

    entries.push({
      reading: row.reading.trim(),
      word: row.word.trim(),
      pos,
      comment,
      kind,
      source,
    });
  }

  return entries;
}
