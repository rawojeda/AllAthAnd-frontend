import { useState, useEffect } from "react";
import { Entry, CreateEntryDTO } from "@/types/entry";
import { TagBadge } from "@/components/TagBadge";
import { X, Save } from "lucide-react";

interface EntryFormProps {
  entry?: Entry | null;
  onSave: (data: CreateEntryDTO) => void;
  onCancel: () => void;
}

const LANGUAGES = [
  "plaintext", "typescript", "javascript", "java", "python", "sql",
  "bash", "dockerfile", "yaml", "json", "html", "css", "go", "rust", "c", "cpp",
];

export function EntryForm({ entry, onSave, onCancel }: EntryFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [language, setLanguage] = useState("plaintext");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setDescription(entry.description);
      setCodeSnippet(entry.codeSnippet);
      setLanguage(entry.language);
      setTags(entry.tags);
    }
  }, [entry]);

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setTagInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ title, description, codeSnippet, language, tags });
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
        <h2 className="text-sm font-medium text-foreground">
          {entry ? "Edit Entry" : "New Entry"}
        </h2>
        <div className="flex items-center gap-1">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 max-w-3xl space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix: CORS error in Spring Boot"
            className="w-full px-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            autoFocus
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's the context? What was the problem and solution?"
            rows={5}
            className="w-full px-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
          />
        </div>

        {/* Language */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border focus:outline-none focus:ring-1 focus:ring-primary/50"
          >
            {LANGUAGES.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>

        {/* Code Snippet */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Code Snippet</label>
          <textarea
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            placeholder="Paste your code here..."
            rows={8}
            className="w-full px-3 py-2 bg-code-bg text-code-fg text-sm font-mono rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 resize-y"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1.5">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTag();
                }
              }}
              placeholder="Add a tag and press Enter"
              className="flex-1 px-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-secondary text-foreground text-sm rounded-md border border-border hover:bg-accent transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <TagBadge key={tag} tag={tag} removable onRemove={() => setTags(tags.filter((t) => t !== tag))} />
            ))}
          </div>
        </div>
      </div>
    </form>
  );
}
