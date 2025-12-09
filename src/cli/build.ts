import { exportAtok } from "../core/exporters/atok.ts";
import { exportGoogleIME } from "../core/exporters/google_ime.ts";
import { exportMacPlist } from "../core/exporters/macos_plist.ts";
import { exportMacText } from "../core/exporters/macos_txt.ts";
import { exportMicrosoftIME } from "../core/exporters/microsoft_ime.ts";
import { loadEntries } from "./load.ts";

const OUT_DIR = new URL("../../build/", import.meta.url);

async function ensureDir(url: URL) {
  try {
    await Deno.mkdir(url, { recursive: true });
  } catch (err) {
    if (err instanceof Deno.errors.AlreadyExists) return;
    throw err;
  }
}

async function build() {
  const kindsFilter = Deno.args.length ? Deno.args : undefined;

  await ensureDir(OUT_DIR);

  const entries = await loadEntries(kindsFilter);

  await Deno.writeTextFile(
    new URL("tsukuba_GoogleIME.txt", OUT_DIR),
    exportGoogleIME(entries),
  );

  await Deno.writeTextFile(
    new URL("tsukuba_Windows.txt", OUT_DIR),
    exportMicrosoftIME(entries),
  );

  await Deno.writeTextFile(
    new URL("tsukuba_ATOK.txt", OUT_DIR),
    exportAtok(entries),
  );

  await Deno.writeTextFile(
    new URL("tsukuba_macOS.txt", OUT_DIR),
    exportMacText(entries),
  );

  await Deno.writeTextFile(
    new URL("tsukuba_macOS.plist", OUT_DIR),
    exportMacPlist(entries),
  );
}

if (import.meta.main) {
  build();
}
