"use client";

import { useParams } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";
import { getPromptById } from "@/lib/prompts";
import { ToolBadges } from "@/components/Header";
import { CopyButton } from "@/components/CopyButton";

function substituteVariables(body: string, values: Record<string, string>): string {
  let out = body;
  for (const [key, value] of Object.entries(values)) {
    out = out.replace(new RegExp(`\\{\\{${key}\\}\\}`, "g"), value);
  }
  return out;
}

export default function PromptDetailPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";
  const prompt = id ? getPromptById(id) : undefined;

  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const handleChange = useCallback((key: string, value: string) => {
    setVariableValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const hasVariables = (prompt?.variables?.length ?? 0) > 0;
  const resolvedBody = prompt
    ? (hasVariables
        ? substituteVariables(prompt.body, variableValues)
        : prompt.body)
    : "";

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(resolvedBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback or toast
    }
  }, [resolvedBody]);

  if (!prompt) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 text-center">
        <h1 className="font-display font-bold text-xl text-ink-900 mb-2">Prompt not found</h1>
        <p className="text-ink-600 mb-4">We couldn’t find a prompt with that ID.</p>
        <Link href="/browse" className="text-accent hover:text-accent-dark font-medium">
          Browse prompts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <nav className="mb-6 text-sm text-ink-500">
        <Link href="/browse" className="hover:text-accent">Browse</Link>
        <span className="mx-2">/</span>
        <span className="text-ink-700">{prompt.title}</span>
      </nav>

      <header className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-2">
          {prompt.title}
        </h1>
        <p className="text-ink-600 mb-4">{prompt.description}</p>
        <div className="flex flex-wrap items-center gap-3">
          <ToolBadges toolIds={prompt.tools} />
          <span className="text-xs font-medium text-ink-400 bg-ink-100 px-2 py-1 rounded">
            {prompt.category}
          </span>
          {prompt.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {prompt.tags.map((tag) => (
                <span key={tag} className="text-xs text-ink-500">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {hasVariables && (
        <section className="mb-8 rounded-xl border border-ink-200 bg-ink-50/50 p-5">
          <h2 className="font-display font-semibold text-ink-900 mb-3">Customize</h2>
          <p className="text-sm text-ink-600 mb-4">
            Fill in the placeholders below. They’ll be inserted into the prompt when you copy.
          </p>
          <div className="space-y-4">
            {prompt.variables!.map((v) => (
              <div key={v.key}>
                <label htmlFor={`var-${v.key}`} className="block text-sm font-medium text-ink-700 mb-1">
                  {v.label}
                  {v.description && (
                    <span className="font-normal text-ink-500 ml-1">— {v.description}</span>
                  )}
                </label>
                <input
                  id={`var-${v.key}`}
                  type="text"
                  value={variableValues[v.key] ?? ""}
                  onChange={(e) => handleChange(v.key, e.target.value)}
                  placeholder={v.placeholder}
                  className="w-full rounded-lg border border-ink-300 bg-white px-3 py-2 text-ink-900 placeholder:text-ink-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 font-body text-sm"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <h2 className="font-display font-semibold text-ink-900">Prompt text</h2>
          <CopyButton onClick={handleCopy} copied={copied} />
        </div>
        <div className="rounded-xl border border-ink-200 bg-ink-950 p-4 sm:p-5 overflow-x-auto">
          <pre className="prose-prompt font-mono text-sm text-ink-200 whitespace-pre-wrap break-words m-0">
            {resolvedBody}
          </pre>
        </div>
      </section>

      <section>
        <h2 className="font-display font-semibold text-ink-900 mb-3">How to use</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-ink-600">
          {hasVariables && (
            <li>Fill in the customization fields above.</li>
          )}
          <li>Click “Copy prompt” to copy the full text.</li>
          <li>Paste into ChatGPT, Cursor, Claude, Copilot, or your preferred AI.</li>
          <li>Send and adjust the reply as needed.</li>
        </ol>
      </section>
    </div>
  );
}
