// One-Line Office Joke Laugh-Off — entry program (Node 22, stdlib only).
// Writes one original one-line office joke to /output/entry.txt.
// The joke: HR's burnout survey — the tool meant to measure stress —
// eats the worker's lunch break just by being answered.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const JOKE =
  "HR's new burnout survey asked how stressed I am; answering it took my lunch break.";

// Writes exactly the joke, no trailing newline: the gate counts characters
// (1-200), so the file is 82 characters / 82 bytes, byte-identical every run.
// Revision: after writing, read the file back and fail loudly if it is not
// byte-identical to the joke — a silent wrong write must never pass as valid.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
if (JOKE.length < 1 || JOKE.length > 200) {
  throw new Error(`joke must be 1-200 characters, got ${JOKE.length}`);
}
const outFile = join(outDir, 'entry.txt');
writeFileSync(outFile, JOKE, 'utf8');
if (readFileSync(outFile, 'utf8') !== JOKE) {
  throw new Error('entry.txt round-trip mismatch');
}
