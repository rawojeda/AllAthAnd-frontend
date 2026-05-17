import { Entry, CreateEntryDTO, UpdateEntryDTO, EntryFilter } from "@/types/entry";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

type ServerTag = string | { id: string; name: string };

type ServerEntry = Omit<Entry, "tags"> & { tags: ServerTag[] };

type PageResponse<T> = {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

function normalizeTags(tags: ServerTag[] | undefined): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.map((tag) => {
    if (typeof tag === "string") return tag;
    return tag?.name ?? String(tag);
  });
}

function normalizeEntry(entry: ServerEntry): Entry {
  return {
    ...entry,
    tags: normalizeTags(entry.tags),
  };
}

function buildQuery(filter?: EntryFilter): string {
  if (!filter) return "";
  const params = new URLSearchParams();
  if (filter.search) params.set("search", filter.search);
  filter.tags?.forEach((tag) => params.append("tags", tag));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export const entryApi = {
  async getAll(filter?: EntryFilter): Promise<Entry[]> {
    const page = await request<PageResponse<ServerEntry>>(
      `/api/entries${buildQuery(filter)}`
    );
    return page.content.map(normalizeEntry);
  },

  async getById(id: string): Promise<Entry | null> {
    try {
      const entry = await request<ServerEntry>(`/api/entries/${id}`);
      return normalizeEntry(entry);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.startsWith("404")) return null;
      throw err;
    }
  },

  async create(dto: CreateEntryDTO): Promise<Entry> {
    const entry = await request<ServerEntry>("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    return normalizeEntry(entry);
  },

  async update(id: string, dto: UpdateEntryDTO): Promise<Entry> {
    const entry = await request<ServerEntry>(`/api/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
    return normalizeEntry(entry);
  },

  async delete(id: string): Promise<void> {
    return request<void>(`/api/entries/${id}`, { method: "DELETE" });
  },

  async getAllTags(): Promise<string[]> {
    return request<string[]>("/api/entries/tags");
  },

  async getTrendingTags(limit = 10): Promise<string[]> {
    return request<string[]>(`/api/entries/tags/trending?limit=${limit}`);
  },
};
