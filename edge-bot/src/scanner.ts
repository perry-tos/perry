import * as fs from "fs";
import * as path from "path";
import * as glob from "@actions/glob";

export interface DiscoveredDeps {
  byName: Map<string, string[]>;
  manifestCount: number;
}

const DEP_KEYS = [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
] as const;

export async function discoverNpmPackages(
  pattern: string,
  cwd: string = process.cwd(),
): Promise<DiscoveredDeps> {
  const globber = await glob.create(pattern, {
    followSymbolicLinks: false,
    matchDirectories: false,
  });

  const byName = new Map<string, string[]>();
  let manifestCount = 0;

  for await (const file of globber.globGenerator()) {
    if (file.split(path.sep).includes("node_modules")) continue;

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(fs.readFileSync(file, "utf-8"));
    } catch {
      continue;
    }
    manifestCount += 1;

    const rel = path.relative(cwd, file) || path.basename(file);
    for (const key of DEP_KEYS) {
      const block = parsed[key];
      if (!block || typeof block !== "object") continue;
      for (const name of Object.keys(block as Record<string, unknown>)) {
        const lower = name.toLowerCase();
        const existing = byName.get(lower);
        if (existing) {
          if (!existing.includes(rel)) existing.push(rel);
        } else {
          byName.set(lower, [rel]);
        }
      }
    }
  }

  return { byName, manifestCount };
}
