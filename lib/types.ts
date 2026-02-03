export type ToolId = "chatgpt" | "cursor" | "claude" | "copilot" | "general";

export interface Tool {
  id: ToolId;
  name: string;
  shortName: string;
  color: string;
}

export interface PromptVariable {
  key: string;
  label: string;
  placeholder: string;
  description?: string;
}

export interface Prompt {
  id: string;
  title: string;
  description: string;
  body: string;
  tools: ToolId[];
  category: string;
  tags: string[];
  variables?: PromptVariable[];
  author?: string;
  createdAt: string;
}

export const TOOLS: Tool[] = [
  { id: "chatgpt", name: "ChatGPT", shortName: "GPT", color: "bg-emerald-600" },
  { id: "cursor", name: "Cursor", shortName: "Cursor", color: "bg-violet-600" },
  { id: "claude", name: "Claude", shortName: "Claude", color: "bg-amber-700" },
  { id: "copilot", name: "Copilot", shortName: "Copilot", color: "bg-blue-600" },
  { id: "general", name: "Any AI", shortName: "Any", color: "bg-ink-500" },
];

export const CATEGORIES = [
  "Coding",
  "Writing",
  "Analysis",
  "Productivity",
  "Learning",
  "Creative",
  "Debugging",
  "Refactoring",
] as const;
