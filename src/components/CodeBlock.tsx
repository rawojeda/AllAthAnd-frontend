import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "plaintext", className }: CodeBlockProps) {
  if (!code.trim()) return null;

  return (
    <div className={cn("rounded-md overflow-hidden border border-border", className)}>
      <div className="flex items-center justify-between px-3 py-1.5 bg-secondary/50 border-b border-border">
        <span className="text-xs font-mono text-muted-foreground">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto bg-code-bg text-code-fg text-sm leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
