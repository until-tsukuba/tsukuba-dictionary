import type { DictEntry } from "../types.ts";

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function exportMacPlist(entries: DictEntry[]): string {
  const lines: string[] = [];

  lines.push(
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">`,
    `<plist version="1.0">`,
    `<array>`,
  );

  for (const e of entries) {
    if (!e.reading || !e.word) continue;
    const phrase = xmlEscape(e.word);
    const shortcut = xmlEscape(e.reading);

    lines.push(
      `<dict>`,
      `  <key>phrase</key>`,
      `  <string>${phrase}</string>`,
      `  <key>shortcut</key>`,
      `  <string>${shortcut}</string>`,
      `</dict>`,
    );
  }

  lines.push(`</array>`, `</plist>`);

  return lines.join("\n") + "\n";
}
