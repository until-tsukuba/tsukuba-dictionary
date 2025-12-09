import { parseCsv } from "../core/load_csv.ts";
import { DictEntry } from "../core/types.ts";

const DATA_DIR = new URL("../../data/", import.meta.url);

export async function loadEntries(
  kindsFilter?: string[],
): Promise<DictEntry[]> {
  const entries: DictEntry[] = [];
  const kindSet = kindsFilter ? new Set(kindsFilter) : undefined;

  for await (const dir of Deno.readDir(DATA_DIR)) {
    if (!dir.isDirectory) {
      continue;
    }

    const kind = dir.name;
    if (kindSet && !kindSet.has(kind)) {
      continue;
    }

    const kindDir = new URL(`${kind}/`, DATA_DIR);

    for await (const file of Deno.readDir(kindDir)) {
      if (!file.isFile || !file.name.endsWith(".csv")) {
        continue;
      }

      const path = new URL(file.name, kindDir);
      const text = await Deno.readTextFile(path);
      const fileEntries = parseCsv(
        text,
        kind,
        path.toString(),
      );

      entries.push(...fileEntries);
    }
  }

  return entries;
}
