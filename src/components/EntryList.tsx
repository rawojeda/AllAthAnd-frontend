import { Entry } from "@/types/entry";
import { TagBadge } from "@/components/TagBadge";
import { Clock, FileCode } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface EntryListProps {
  entries: Entry[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading?: boolean;
}

export function EntryList({ entries, selectedId, onSelect, loading }: EntryListProps) {
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm">
        Loading...
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground gap-2 p-8">
        <FileCode className="h-10 w-10 opacity-40" />
        <p className="text-sm">No entries found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {entries.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelect(entry.id)}
          className={cn(
            "w-full text-left px-4 py-3 border-b border-border transition-colors hover:bg-accent/50",
            selectedId === entry.id && "bg-accent border-l-2 border-l-primary"
          )}
        >
          <h3 className="text-sm font-medium text-foreground truncate mb-1">{entry.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
            {entry.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-wrap">
              {entry.tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} className="text-[10px] px-1.5 py-0" />
              ))}
              {entry.tags.length > 3 && (
                <span className="text-[10px] text-muted-foreground">+{entry.tags.length - 3}</span>
              )}
            </div>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock className="h-2.5 w-2.5" />
              {formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
