import { Entry, CreateEntryDTO, UpdateEntryDTO, EntryFilter } from "@/types/entry";

const BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, init);
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
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
    return request<Entry[]>(`/api/entries${buildQuery(filter)}`);
  },

  async getById(id: string): Promise<Entry | null> {
    try {
      return await request<Entry>(`/api/entries/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error && err.message.startsWith("404")) return null;
      throw err;
    }
  },

  async create(dto: CreateEntryDTO): Promise<Entry> {
    return request<Entry>("/api/entries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  },

  async update(id: string, dto: UpdateEntryDTO): Promise<Entry> {
    return request<Entry>(`/api/entries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    });
  },

  async delete(id: string): Promise<void> {
    return request<void>(`/api/entries/${id}`, { method: "DELETE" });
  },

  async getAllTags(): Promise<string[]> {
    return request<string[]>("/api/entries/tags");
  },
};
