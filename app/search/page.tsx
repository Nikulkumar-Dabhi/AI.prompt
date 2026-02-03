"use client";

import { useState, useMemo } from "react";
import { PromptCard } from "@/components/PromptCard";
import { searchPrompts } from "@/lib/prompts";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchPrompts(query), [query]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display font-bold text-2xl sm:text-3xl text-ink-900 mb-2">
        Search prompts
      </h1>
      <p className="text-ink-600 mb-8">
        Search by title, description, category, tags, or prompt text.
      </p>

      <div className="mb-8">
        <label htmlFor="search-input" className="sr-only">
          Search prompts
        </label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. code review, refactor, blog outline..."
          className="w-full max-w-xl rounded-lg border border-ink-300 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 font-body"
          aria-describedby="search-hint"
        />
        <p id="search-hint" className="mt-2 text-sm text-ink-500">
          {query ? `${results.length} result${results.length !== 1 ? "s" : ""}` : "Type to search"}
        </p>
      </div>

      {query && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
      {query && results.length === 0 && (
        <p className="text-ink-500 py-8">No prompts match “{query}”. Try different words.</p>
      )}
    </div>
  );
}
