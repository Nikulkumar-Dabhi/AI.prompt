import Link from "next/link";
import { ToolBadges } from "./Header";
import type { Prompt } from "@/lib/types";

export function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <article className="group rounded-xl border border-ink-200 bg-white p-5 shadow-sm transition-all hover:border-accent/30 hover:shadow-md">
      <Link href={`/prompt/${prompt.id}`} className="flex flex-col gap-3 block">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display font-semibold text-ink-900 group-hover:text-accent transition-colors line-clamp-2">
            {prompt.title}
          </h2>
          <span className="shrink-0 text-xs font-medium text-ink-400 bg-ink-100 px-2 py-1 rounded">
            {prompt.category}
          </span>
        </div>
        <p className="text-sm text-ink-600 line-clamp-2">{prompt.description}</p>
        <ToolBadges toolIds={prompt.tools} />
        <span className="text-sm font-medium text-accent group-hover:text-accent-dark transition-colors mt-1">
          Use this prompt →
        </span>
      </Link>
    </article>
  );
}
