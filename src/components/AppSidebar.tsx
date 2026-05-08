import { useState, useEffect } from "react";
import { Search, Plus, Tag, BookOpen } from "lucide-react";
import { entryApi } from "@/services/api";
import { useDebounce } from "@/hooks/use-debounce";
import { TagBadge } from "@/components/TagBadge";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  search: string;
  onSearchChange: (val: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onNewEntry: () => void;
}

export function AppSidebar({
  search,
  onSearchChange,
  selectedTags,
  onTagToggle,
  onNewEntry,
}: AppSidebarProps) {
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    entryApi.getAllTags().then(setAllTags);
  }, []);

  // Refresh tags periodically (simple approach for mock)
  useEffect(() => {
    const interval = setInterval(() => {
      entryApi.getAllTags().then(setAllTags);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-64 shrink-0 h-screen flex flex-col border-r border-border bg-[hsl(var(--sidebar-bg))]">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="h-5 w-5 text-primary" />
          <h1 className="text-sm font-semibold text-foreground tracking-wide">AllAtHand</h1>
        </div>
        <button
          onClick={onNewEntry}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Entry
        </button>
      </div>

      {/* Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entries..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 bg-secondary text-foreground text-sm rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex-1 overflow-y-auto px-3 pb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Tag className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tags</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              active={selectedTags.includes(tag)}
              onClick={() => onTagToggle(tag)}
            />
          ))}
          {allTags.length === 0 && (
            <span className="text-xs text-muted-foreground">No tags yet</span>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          Mock API · Ready for backend
        </span>
      </div>
    </aside>
  );
}
