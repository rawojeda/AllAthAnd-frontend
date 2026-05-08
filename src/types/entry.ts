export interface Entry {
  id: string;
  title: string;
  description: string;
  codeSnippet: string;
  language: string;
  tags: string[];
  imageUrl: string | null;
  logFile: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEntryDTO {
  title: string;
  description: string;
  codeSnippet?: string;
  language?: string;
  tags?: string[];
  imageUrl?: string | null;
  logFile?: string | null;
}

export type UpdateEntryDTO = Partial<CreateEntryDTO>;

export interface EntryFilter {
  search?: string;
  tags?: string[];
}
