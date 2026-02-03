import type { Prompt } from "./types";

export const prompts: Prompt[] = [
  {
    id: "code-review",
    title: "Thorough Code Review",
    description: "Get a structured, actionable code review with security and performance notes.",
    body: "Review this code thoroughly. For each section:\n1. Correctness: any bugs or edge cases?\n2. Readability: naming, structure, comments.\n3. Performance: unnecessary work, better algorithms?\n4. Security: injection, validation, secrets?\n5. Suggest concrete improvements with code snippets where helpful.\n\nCode:\n```\n{{code}}\n```",
    tools: ["chatgpt", "cursor", "claude", "copilot", "general"],
    category: "Coding",
    tags: ["review", "quality", "security"],
    variables: [
      { key: "code", label: "Your code", placeholder: "Paste code here", description: "The code block to review" },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: "explain-code",
    title: "Explain This Code",
    description: "Get a clear, level-appropriate explanation of what code does.",
    body: "Explain this code as if I'm {{level}}. Cover: what it does step-by-step, why key decisions were made, and any gotchas.\n\n```\n{{code}}\n```",
    tools: ["chatgpt", "cursor", "claude", "copilot", "general"],
    category: "Learning",
    tags: ["explanation", "learning"],
    variables: [
      { key: "level", label: "My level", placeholder: "e.g. a junior dev", description: "Your experience level" },
      { key: "code", label: "Code", placeholder: "Paste code" },
    ],
    createdAt: "2024-01-16",
  },
  {
    id: "refactor-clean",
    title: "Refactor for Clarity",
    description: "Refactor code to be cleaner and more maintainable without changing behavior.",
    body: "Refactor this code for clarity and maintainability. Keep behavior identical. Prefer: clear names, small functions, minimal nesting. Explain the main changes in a short list.\n\n```\n{{code}}\n```",
    tools: ["cursor", "claude", "copilot", "general"],
    category: "Refactoring",
    tags: ["refactor", "clean-code"],
    variables: [{ key: "code", label: "Code to refactor", placeholder: "Paste code" }],
    createdAt: "2024-01-17",
  },
  {
    id: "debug-error",
    title: "Debug Error Message",
    description: "Get help diagnosing and fixing an error from message and context.",
    body: "I'm seeing this error:\n\n{{error}}\n\nContext: {{context}}\n\nHelp me: 1) What likely caused it? 2) How to fix it step-by-step? 3) How to avoid it in the future?",
    tools: ["chatgpt", "cursor", "claude", "copilot", "general"],
    category: "Debugging",
    tags: ["debug", "error"],
    variables: [
      { key: "error", label: "Error message", placeholder: "Paste full error" },
      { key: "context", label: "Context", placeholder: "Language, framework, what you were doing" },
    ],
    createdAt: "2024-01-18",
  },
  {
    id: "write-tests",
    title: "Write Unit Tests",
    description: "Generate focused unit tests for a function or module.",
    body: "Write unit tests for this code. Use {{framework}}. Cover happy path, edge cases, and obvious error cases. Keep tests readable and isolated.\n\n```\n{{code}}\n```",
    tools: ["cursor", "claude", "copilot", "general"],
    category: "Coding",
    tags: ["testing", "unit-tests"],
    variables: [
      { key: "framework", label: "Test framework", placeholder: "e.g. Jest, pytest, Vitest" },
      { key: "code", label: "Code to test", placeholder: "Paste code" },
    ],
    createdAt: "2024-01-19",
  },
  {
    id: "blog-outline",
    title: "Blog Post Outline",
    description: "Generate a structured outline for a blog post on any topic.",
    body: "Create a detailed outline for a blog post about \"{{topic}}\". Audience: {{audience}}. Tone: {{tone}}. Include: intro hook, 3–5 main sections with subpoints, conclusion with CTA, and a suggested title.",
    tools: ["chatgpt", "claude", "general"],
    category: "Writing",
    tags: ["blog", "outline", "content"],
    variables: [
      { key: "topic", label: "Topic", placeholder: "e.g. Getting started with TypeScript" },
      { key: "audience", label: "Audience", placeholder: "e.g. junior developers" },
      { key: "tone", label: "Tone", placeholder: "e.g. friendly, technical, casual" },
    ],
    createdAt: "2024-01-20",
  },
  {
    id: "meeting-notes",
    title: "Meeting Notes to Action Items",
    description: "Turn raw meeting notes into clear action items and summaries.",
    body: "Convert these meeting notes into:\n1. A 2–3 sentence summary.\n2. A bullet list of decisions made.\n3. Action items with owner and due date where obvious.\n\nNotes:\n{{notes}}",
    tools: ["chatgpt", "claude", "copilot", "general"],
    category: "Productivity",
    tags: ["meetings", "actions", "summary"],
    variables: [{ key: "notes", label: "Meeting notes", placeholder: "Paste raw notes" }],
    createdAt: "2024-01-21",
  },
  {
    id: "compare-options",
    title: "Compare Options",
    description: "Get a balanced comparison of options with pros, cons, and recommendation.",
    body: "Compare these options for {{context}}: {{options}}. For each: pros, cons, best use case. End with a clear recommendation and why.",
    tools: ["chatgpt", "claude", "general"],
    category: "Analysis",
    tags: ["comparison", "decision"],
    variables: [
      { key: "context", label: "Context", placeholder: "e.g. choosing a database" },
      { key: "options", label: "Options", placeholder: "e.g. PostgreSQL, MongoDB, Redis" },
    ],
    createdAt: "2024-01-22",
  },
  {
    id: "cursor-context",
    title: "Cursor: Add Context for This Task",
    description: "Tell Cursor exactly what context to use for a coding task.",
    body: "I'm working on: {{task}}. Relevant code/files: {{files}}. Constraints: {{constraints}}. When I ask for changes, use this context and keep my style and architecture.",
    tools: ["cursor"],
    category: "Coding",
    tags: ["cursor", "context"],
    variables: [
      { key: "task", label: "Current task", placeholder: "e.g. adding auth to the API" },
      { key: "files", label: "Relevant files", placeholder: "e.g. api/routes.ts, lib/auth.ts" },
      { key: "constraints", label: "Constraints", placeholder: "e.g. use existing patterns, no new deps" },
    ],
    createdAt: "2024-01-23",
  },
  {
    id: "sql-from-natural",
    title: "SQL from Natural Language",
    description: "Generate SQL from a plain-English description of the query.",
    body: "Write a {{dialect}} query for: \"{{description}}\". Tables/schema: {{schema}}. Return only the SQL and a one-line explanation.",
    tools: ["chatgpt", "claude", "copilot", "general"],
    category: "Coding",
    tags: ["sql", "database"],
    variables: [
      { key: "dialect", label: "SQL dialect", placeholder: "e.g. PostgreSQL, MySQL" },
      { key: "description", label: "What you want", placeholder: "e.g. users who signed up last week" },
      { key: "schema", label: "Schema", placeholder: "Table names and key columns" },
    ],
    createdAt: "2024-01-24",
  },
  {
    id: "rewrite-tone",
    title: "Rewrite in Different Tone",
    description: "Rewrite text to match a new tone or style.",
    body: "Rewrite this in a {{tone}} tone. Keep the same meaning and key facts. Length: roughly {{length}}.\n\nOriginal:\n{{text}}",
    tools: ["chatgpt", "claude", "general"],
    category: "Writing",
    tags: ["rewrite", "tone", "style"],
    variables: [
      { key: "tone", label: "Target tone", placeholder: "e.g. professional, casual, formal" },
      { key: "length", label: "Length", placeholder: "e.g. same, shorter, 2 paragraphs" },
      { key: "text", label: "Original text", placeholder: "Paste text" },
    ],
    createdAt: "2024-01-25",
  },
  {
    id: "user-story",
    title: "User Story from Idea",
    description: "Turn a product idea into clear user stories and acceptance criteria.",
    body: "Turn this into user stories with acceptance criteria:\n\n\"{{idea}}\"\n\nFormat: As a [user], I want [goal] so that [benefit]. Acceptance criteria: Given/When/Then. Keep 3–7 stories.",
    tools: ["chatgpt", "claude", "general"],
    category: "Productivity",
    tags: ["product", "user-stories", "agile"],
    variables: [{ key: "idea", label: "Product idea", placeholder: "Describe the feature or product" }],
    createdAt: "2024-01-26",
  },
];

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((p) => p.id === id);
}

export function getPromptsByTool(toolId: string): Prompt[] {
  return prompts.filter((p) => p.tools.includes(toolId as Prompt["tools"][number]));
}

export function getPromptsByCategory(category: string): Prompt[] {
  return prompts.filter((p) => p.category === category);
}

export function searchPrompts(query: string): Prompt[] {
  const q = query.toLowerCase().trim();
  if (!q) return prompts;
  return prompts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.body.toLowerCase().includes(q)
  );
}
