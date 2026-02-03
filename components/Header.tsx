"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TOOLS } from "@/lib/types";

const nav = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/search", label: "Search" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-ink-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 sm:h-16">
        <Link
          href="/"
          className="font-display font-semibold text-lg text-ink-900 hover:text-accent transition-colors"
        >
          Prompt Master
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main">
          {nav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                pathname === href
                  ? "text-accent"
                  : "text-ink-600 hover:text-ink-900"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function ToolBadges({ toolIds }: { toolIds: string[] }) {
  const byId = Object.fromEntries(TOOLS.map((t) => [t.id, t]));
  return (
    <div className="flex flex-wrap gap-1.5">
      {toolIds.map((id) => {
        const t = byId[id as keyof typeof byId];
        if (!t) return null;
        return (
          <span
            key={id}
            className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium text-white ${t.color}`}
          >
            {t.shortName}
          </span>
        );
      })}
    </div>
  );
}
