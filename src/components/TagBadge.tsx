import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface TagBadgeProps {
  tag: string;
  active?: boolean;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function TagBadge({ tag, active, removable, onClick, onRemove, className }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono transition-colors",
        active
          ? "bg-primary/20 text-primary border border-primary/30"
          : "bg-secondary text-muted-foreground border border-transparent hover:text-foreground",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {tag}
      {removable && onRemove && (
        <X
          className="h-3 w-3 cursor-pointer hover:text-destructive"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
        />
      )}
    </span>
  );
}
