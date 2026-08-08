import { readFileSync } from "fs";
import { join } from "path";

const BANNED_WORDS = readFileSync(
  join(import.meta.dir, "../data/badwords.en.txt"),
  "utf-8",
)
  .split("\n")
  .map((w) => w.trim().toLowerCase())
  .filter(Boolean);

const LEET_CLASSES: Record<string, string> = {
  a: "a4@",
  b: "b8",
  c: "c",
  d: "d",
  e: "e3",
  f: "f",
  g: "g9",
  h: "h",
  i: "i1!|",
  k: "k",
  l: "l1",
  n: "n",
  o: "o0",
  r: "r",
  s: "s5$",
  t: "t7",
  u: "uv",
  v: "vu",
  w: "w",
  x: "x",
  y: "y",
  z: "z2",
};

function escapeForCharClass(chars: string) {
  return chars.replace(/[\]\\^-]/g, "\\$&");
}

function escapeLiteral(char: string) {
  return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const SEPARATOR = "[\\W_]{0,2}";

function buildWordRegex(entry: string): RegExp {
  const letters = entry.replace(/\s+/g, "").split("");

  const pattern = letters
    .map((char) => {
      const classChars = LEET_CLASSES[char];
      return classChars
        ? `[${escapeForCharClass(classChars)}]`
        : escapeLiteral(char);
    })
    .join(SEPARATOR);

  return new RegExp(`(?<![a-z0-9])${pattern}(?![a-z0-9])`, "iu");
}

const compiledPatterns = BANNED_WORDS.map((word) => ({
  word,
  regex: buildWordRegex(word),
}));

function normalize(text: string): string {
  return text.normalize("NFKD").replace(/[\u0300-\u036f]/g, "");
}

export function containsBannedWord(text: string): boolean {
  const normalized = normalize(text);
  return compiledPatterns.some(({ regex }) => regex.test(normalized));
}

export function findBannedWords(text: string): string[] {
  const normalized = normalize(text);
  return compiledPatterns
    .filter(({ regex }) => regex.test(normalized))
    .map(({ word }) => word);
}
