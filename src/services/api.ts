/**
 * Mock API service layer.
 * Mirrors the shape of a real REST API (Spring Boot backend).
 * Replace fetch calls here when the real backend is ready.
 */

import { Entry, CreateEntryDTO, UpdateEntryDTO, EntryFilter } from "@/types/entry";

// Simulate network delay
const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms));

let entries: Entry[] = [
  {
    id: "1",
    title: "Fix: Docker container exits immediately",
    description:
      "When running a Spring Boot app in Docker, the container exits with code 0. The issue was the `CMD` in the Dockerfile — it was missing the `exec` form.",
    codeSnippet: `# Wrong\nCMD java -jar app.jar\n\n# Correct\nCMD ["java", "-jar", "app.jar"]`,
    language: "dockerfile",
    tags: ["docker", "spring-boot", "devops"],
    imageUrl: null,
    logFile: null,
    createdAt: "2026-04-01T10:00:00Z",
    updatedAt: "2026-04-01T10:00:00Z",
  },
  {
    id: "2",
    title: "PostgreSQL: Reset sequence after bulk delete",
    description:
      "After deleting rows manually, the auto-increment sequence can get out of sync. Use `setval` to fix it.",
    codeSnippet: `SELECT setval(\n  pg_get_serial_sequence('entries', 'id'),\n  COALESCE(MAX(id), 1)\n) FROM entries;`,
    language: "sql",
    tags: ["postgresql", "database", "sql"],
    imageUrl: null,
    logFile: null,
    createdAt: "2026-04-02T14:30:00Z",
    updatedAt: "2026-04-02T14:30:00Z",
  },
  {
    id: "3",
    title: "React: Debounced search input hook",
    description: "A reusable hook for debouncing search input to avoid excessive re-renders and API calls.",
    codeSnippet: `import { useState, useEffect } from 'react';\n\nexport function useDebounce<T>(value: T, delay = 300): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const timer = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(timer);\n  }, [value, delay]);\n  return debounced;\n}`,
    language: "typescript",
    tags: ["react", "hooks", "typescript", "performance"],
    imageUrl: null,
    logFile: null,
    createdAt: "2026-04-03T09:15:00Z",
    updatedAt: "2026-04-03T09:15:00Z",
  },
  {
    id: "4",
    title: "Git: Undo last commit keeping changes",
    description: "Soft reset to undo the last commit while keeping staged changes.",
    codeSnippet: `git reset --soft HEAD~1`,
    language: "bash",
    tags: ["git", "version-control"],
    imageUrl: null,
    logFile: null,
    createdAt: "2026-04-05T16:00:00Z",
    updatedAt: "2026-04-05T16:00:00Z",
  },
];

let nextId = 5;

function matchesFilter(entry: Entry, filter: EntryFilter): boolean {
  if (filter.search) {
    const q = filter.search.toLowerCase();
    const inTitle = entry.title.toLowerCase().includes(q);
    const inDesc = entry.description.toLowerCase().includes(q);
    const inCode = entry.codeSnippet.toLowerCase().includes(q);
    const inTags = entry.tags.some((t) => t.toLowerCase().includes(q));
    if (!inTitle && !inDesc && !inCode && !inTags) return false;
  }
  if (filter.tags && filter.tags.length > 0) {
    if (!filter.tags.some((t) => entry.tags.includes(t))) return false;
  }
  return true;
}

export const entryApi = {
  async getAll(filter?: EntryFilter): Promise<Entry[]> {
    await delay();
    let result = [...entries];
    if (filter) result = result.filter((e) => matchesFilter(e, filter));
    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  },

  async getById(id: string): Promise<Entry | null> {
    await delay();
    return entries.find((e) => e.id === id) ?? null;
  },

  async create(dto: CreateEntryDTO): Promise<Entry> {
    await delay(200);
    const now = new Date().toISOString();
    const entry: Entry = {
      id: String(nextId++),
      title: dto.title,
      description: dto.description || "",
      codeSnippet: dto.codeSnippet || "",
      language: dto.language || "plaintext",
      tags: dto.tags || [],
      imageUrl: dto.imageUrl ?? null,
      logFile: dto.logFile ?? null,
      createdAt: now,
      updatedAt: now,
    };
    entries.push(entry);
    return entry;
  },

  async update(id: string, dto: UpdateEntryDTO): Promise<Entry> {
    await delay(200);
    const idx = entries.findIndex((e) => e.id === id);
    if (idx === -1) throw new Error("Entry not found");
    entries[idx] = {
      ...entries[idx],
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    return entries[idx];
  },

  async delete(id: string): Promise<void> {
    await delay(200);
    entries = entries.filter((e) => e.id !== id);
  },

  async getAllTags(): Promise<string[]> {
    await delay(100);
    const tagSet = new Set<string>();
    entries.forEach((e) => e.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  },
};
