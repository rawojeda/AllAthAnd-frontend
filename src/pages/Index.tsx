import { useState, useEffect, useCallback } from "react";
import { Entry, EntryFilter } from "@/types/entry";
import { entryApi } from "@/services/api";
import { useDebounce } from "@/hooks/use-debounce";
import { AppSidebar } from "@/components/AppSidebar";
import { EntryList } from "@/components/EntryList";
import { EntryDetail } from "@/components/EntryDetail";
import { EntryForm } from "@/components/EntryForm";
import { FileCode } from "lucide-react";

type View = "detail" | "create" | "edit";

const Index = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<View>("detail");
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const debouncedSearch = useDebounce(search, 300);

  const fetchEntries = useCallback(async () => {
    const filter: EntryFilter = {};
    if (debouncedSearch) filter.search = debouncedSearch;
    if (selectedTags.length > 0) filter.tags = selectedTags;

    const data = await entryApi.getAll(filter);
    setEntries(data);
    setLoading(false);
  }, [debouncedSearch, selectedTags]);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const selectedEntry = entries.find((e) => e.id === selectedId) ?? null;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setView("detail");
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCreate = async (data: any) => {
    const created = await entryApi.create(data);
    await fetchEntries();
    setSelectedId(created.id);
    setView("detail");
  };

  const handleUpdate = async (data: any) => {
    if (!selectedId) return;
    await entryApi.update(selectedId, data);
    await fetchEntries();
    setView("detail");
  };

  const handleDelete = async () => {
    if (!selectedId) return;
    await entryApi.delete(selectedId);
    setSelectedId(null);
    setView("detail");
    await fetchEntries();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        search={search}
        onSearchChange={setSearch}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
        onNewEntry={() => {
          setSelectedId(null);
          setView("create");
        }}
      />

      {/* Entry List Panel */}
      <div className="w-80 shrink-0 flex flex-col border-r border-border bg-background">
        <div className="px-4 py-3 border-b border-border">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Entries · {entries.length}
          </span>
        </div>
        <EntryList
          entries={entries}
          selectedId={selectedId}
          onSelect={handleSelect}
          loading={loading}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {view === "create" && (
          <EntryForm
            onSave={handleCreate}
            onCancel={() => setView("detail")}
          />
        )}
        {view === "edit" && selectedEntry && (
          <EntryForm
            entry={selectedEntry}
            onSave={handleUpdate}
            onCancel={() => setView("detail")}
          />
        )}
        {view === "detail" && selectedEntry && (
          <EntryDetail
            entry={selectedEntry}
            onEdit={() => setView("edit")}
            onDelete={handleDelete}
          />
        )}
        {view === "detail" && !selectedEntry && (
          <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-3">
            <FileCode className="h-16 w-16 opacity-20" />
            <p className="text-sm">Select an entry or create a new one</p>
            <span className="text-xs opacity-60">Your coding knowledge, all at hand</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
