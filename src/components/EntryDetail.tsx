import { Entry } from "@/types/entry";
import { CodeBlock } from "@/components/CodeBlock";
import { TagBadge } from "@/components/TagBadge";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { format } from "date-fns";

interface EntryDetailProps {
  entry: Entry;
  onEdit: () => void;
  onDelete: () => void;
}

export function EntryDetail({ entry, onEdit, onDelete }: EntryDetailProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          <span>Created {format(new Date(entry.createdAt), "MMM d, yyyy")}</span>
          <span>·</span>
          <span>Updated {format(new Date(entry.updatedAt), "MMM d, yyyy")}</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onEdit}
            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-3xl">
        <h1 className="text-xl font-semibold text-foreground mb-3">{entry.title}</h1>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {entry.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mb-6 whitespace-pre-wrap">
          {entry.description}
        </p>

        {entry.codeSnippet && (
          <CodeBlock code={entry.codeSnippet} language={entry.language} className="mb-6" />
        )}

        {entry.imageUrl && (
          <div className="mb-6">
            <p className="text-xs text-muted-foreground mb-2">Screenshot</p>
            <img
              src={entry.imageUrl}
              alt="Entry screenshot"
              className="rounded-md border border-border max-w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
