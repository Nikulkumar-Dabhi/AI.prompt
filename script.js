(function () {
  "use strict";

  var TOOLS = [
    { id: "chatgpt", name: "ChatGPT" },
    { id: "cursor", name: "Cursor" },
    { id: "claude", name: "Claude" },
    { id: "gemini", name: "Gemini" },
    { id: "copilot", name: "Copilot" },
    { id: "general", name: "Any AI" },
  ];

  var OPEN_URLS = {
    chatgpt: { url: "https://chat.openai.com/", label: "ChatGPT" },
    claude: { url: "https://claude.ai/", label: "Claude" },
    gemini: { url: "https://gemini.google.com/", label: "Gemini" },
  };

  var openTabWindows = { chatgpt: null, claude: null, gemini: null };

  var prompts = [
    {
      id: "code-review",
      title: "Thorough Code Review",
      description: "Get a structured, actionable code review with security and performance notes.",
      body: "Review this code thoroughly. For each section:\n1. Correctness: any bugs or edge cases?\n2. Readability: naming, structure, comments.\n3. Performance: unnecessary work, better algorithms?\n4. Security: injection, validation, secrets?\n5. Suggest concrete improvements with code snippets where helpful.\n\nCode:\n```\n{{code}}\n```",
      tools: ["chatgpt", "cursor", "claude", "copilot", "general"],
      category: "Coding",
      tags: ["review", "quality", "security"],
      variables: [{ key: "code", label: "Your code", placeholder: "Paste code here" }],
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
        { key: "level", label: "My level", placeholder: "e.g. a junior dev" },
        { key: "code", label: "Code", placeholder: "Paste code" },
      ],
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
    },
    {
      id: "medium-post",
      title: "Write a Medium Post",
      description: "Full Medium article with Clear/Koe/Naval style, formatting, image placeholder, caption, hashtags, and draft instructions.",
      body: "Write a Medium post on this topic: \"{{topic}}\", using proper formatting and a style inspired by James Clear, Dan Koe, or Naval Ravikant. Use Medium's formatting tools: headings (H2/H3), blockquotes, bullet/numbered lists, and emphasis (bold/italic).\n\nStructure: catchy title, hook in the first paragraph, 3–5 clear sections with subheadings, short paragraphs (2–4 sentences). End with a concrete takeaway or call-to-action.\n\nInclude a placeholder where a landscape image should go. Write a one-sentence caption for the image (below it, following Medium's guidelines). The image should be generated with Gemini (latest models), relevant to the topic, landscape orientation, saved to desktop, then embedded in the post with this caption.\n\nAdd exactly five relevant hashtags at the end of the post.\n\nRemind the reader to save the post as a draft in Medium before publishing.",
      tools: ["chatgpt", "claude", "general"],
      category: "Writing",
      tags: ["medium", "blog", "article", "james-clear", "formatting"],
      variables: [
        { key: "topic", label: "Topic", placeholder: "e.g. Why I switched from REST to GraphQL" },
      ],
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
    },
    {
      id: "ghibli-image",
      title: "Ghibli-Style Image",
      description: "Generate an image in Studio Ghibli style. Enter a short topic (5–10 words).",
      body: "Generate an image in Studio Ghibli style. Topic: {{topic}}.\n\nStyle: hand-drawn anime aesthetic like My Neighbor Totoro or Spirited Away — soft colors, detailed backgrounds, whimsical and warm atmosphere, gentle lighting. No text or text overlays in the image. One clear subject or scene.",
      tools: ["chatgpt", "claude", "gemini", "general"],
      category: "Creative",
      tags: ["ghibli", "image", "art", "illustration"],
      variables: [{ key: "topic", label: "Topic (5–10 words)", placeholder: "e.g. cat on a flying bicycle over the sea" }],
    },
    {
      id: "youtube-summary",
      title: "YouTube Video Summary",
      description: "Summarize any YouTube video. Paste the link and choose output format, length, and style from the dropdowns.",
      body: "Summarize this YouTube video for me.\n\nVideo URL: {{link}}\n\nOutput format: {{output_format}}\nLength: {{length}}\nStyle: {{style}}\n\nIf you cannot access the video directly, ask me to paste the transcript or use a tool to fetch the transcript, then produce the summary in the requested format and style.",
      tools: ["chatgpt", "claude", "gemini", "general"],
      category: "Productivity",
      tags: ["youtube", "summary", "video", "bullet-points", "extract"],
      variables: [
        { key: "link", label: "YouTube video link", placeholder: "https://www.youtube.com/watch?v=..." },
        {
          key: "output_format",
          label: "Output format",
          type: "select",
          options: [
            { value: "10–12 key bullet points", label: "10–12 key bullet points" },
            { value: "2 paragraph summary", label: "2 paragraph summary" },
            { value: "1 page extract", label: "1 page extract" },
          ],
        },
        {
          key: "length",
          label: "Length",
          type: "select",
          options: [
            { value: "concise (brief)", label: "Concise (brief)" },
            { value: "medium", label: "Medium" },
            { value: "detailed (in-depth)", label: "Detailed (in-depth)" },
          ],
        },
        {
          key: "style",
          label: "Style",
          type: "select",
          options: [
            { value: "formal", label: "Formal" },
            { value: "casual", label: "Casual" },
            { value: "technical", label: "Technical" },
            { value: "conversational", label: "Conversational" },
          ],
        },
      ],
    },
  ];

  function substitute(body, values) {
    var out = body;
    Object.keys(values || {}).forEach(function (key) {
      var re = new RegExp("\\{\\{" + key + "\\}\\}", "g");
      out = out.replace(re, values[key] || "{{" + key + "}}");
    });
    return out;
  }

  function filterPrompts() {
    var toolFilter = (document.getElementById("tool-filter") || {}).value;
    var searchQuery = ((document.getElementById("search") || {}).value || "").toLowerCase().trim();

    return prompts.filter(function (p) {
      var matchTool = !toolFilter || p.tools.indexOf(toolFilter) !== -1;
      if (!matchTool) return false;
      if (!searchQuery) return true;
      var text = (p.title + " " + p.description + " " + p.category + " " + (p.tags || []).join(" ") + " " + p.body).toLowerCase();
      return text.indexOf(searchQuery) !== -1;
    });
  }

  function renderPrompt(p, values, isOpen, copiedId) {
    values = values || {};
    var resolvedBody = (p.variables && p.variables.length) ? substitute(p.body, normalizedValues(values)) : p.body;
    var toolLabels = (p.tools || [])
      .map(function (t) {
        var tool = TOOLS.find(function (x) { return x.id === t; });
        return tool ? tool.name : t;
      })
      .filter(Boolean);

    var varsHtml = "";
    if (p.variables && p.variables.length) {
      varsHtml =
        '<div class="prompt-vars">' +
        p.variables
          .map(
            function (v) {
              if (v.type === "select" && v.options && v.options.length) {
                var current = values[v.key] || (v.options[0] && v.options[0].value) || "";
                var opts = v.options.map(function (opt) {
                  var val = (opt.value != null ? opt.value : opt);
                  var lab = (opt.label != null ? opt.label : opt);
                  return '<option value="' + escapeAttr(String(val)) + '"' + (current === val ? ' selected' : '') + '>' + escapeHtml(lab) + "</option>";
                }).join("");
                var labelHtml = (v.label ? '<label class="prompt-var-label">' + escapeHtml(v.label) + '</label>' : '');
                return labelHtml + '<select data-prompt-id="' + escapeAttr(p.id) + '" data-var="' + escapeAttr(v.key) + '" class="prompt-var-select">' + opts + "</select>";
              }
              var labelHtml = (v.label ? '<label class="prompt-var-label">' + escapeHtml(v.label) + '</label>' : '');
              return (
                labelHtml +
                '<input type="text" spellcheck="true" autocapitalize="on" autocomplete="off" data-prompt-id="' +
                escapeAttr(p.id) +
                '" data-var="' +
                escapeAttr(v.key) +
                '" placeholder="' +
                escapeAttr(v.placeholder || "") +
                '" value="' +
                escapeAttr(values[v.key] || "") +
                '">'
              );
            }
          )
          .join("") +
        "</div>";
    }

    return (
      '<li class="prompt-card" data-id="' +
      escapeAttr(p.id) +
      '" data-open="' +
      (isOpen ? "true" : "false") +
      '">' +
      '<button type="button" class="prompt-toggle" aria-expanded="' +
      isOpen +
      '" data-prompt-id="' +
      escapeAttr(p.id) +
      '">' +
      '<span>' +
      escapeHtml(p.title) +
      "</span>" +
      '<span class="expand-icon" aria-hidden="true">+</span>' +
      "</button>" +
      '<div class="prompt-body">' +
      '<p class="prompt-description">' +
      escapeHtml(p.description) +
      "</p>" +
      (toolLabels.length ? '<div class="tool-tags">' + toolLabels.map(function (l) { return '<span class="tool-tag">' + escapeHtml(l) + "</span>"; }).join("") + "</div>" : "") +
      varsHtml +
      '<pre class="prompt-preview" data-prompt-id="' + escapeAttr(p.id) + '" role="button" tabindex="0" aria-label="Click to copy prompt and open in ChatGPT, Claude, or Gemini">' +
      escapeHtml(resolvedBody) +
      "</pre>" +
      '<div class="prompt-actions">' +
      '<button type="button" class="btn btn-primary copy-btn" data-prompt-id="' +
      escapeAttr(p.id) +
      '" data-body="' +
      escapeAttr(p.body) +
      '" data-has-vars="' +
      (p.variables && p.variables.length ? "1" : "0") +
      '">' +
      (copiedId === p.id ? "Copied" : "Copy") +
      "</button>" +
      '<button type="button" class="btn btn-outline open-chatgpt-btn" data-prompt-id="' + escapeAttr(p.id) + '" data-body="' + escapeAttr(p.body) + '" data-has-vars="' + (p.variables && p.variables.length ? "1" : "0") + '">Open in ChatGPT</button>' +
      '<button type="button" class="btn btn-outline open-claude-btn" data-prompt-id="' + escapeAttr(p.id) + '" data-body="' + escapeAttr(p.body) + '" data-has-vars="' + (p.variables && p.variables.length ? "1" : "0") + '">Open in Claude</button>' +
      '<button type="button" class="btn btn-outline open-gemini-btn" data-prompt-id="' + escapeAttr(p.id) + '" data-body="' + escapeAttr(p.body) + '" data-has-vars="' + (p.variables && p.variables.length ? "1" : "0") + '">Open in Gemini</button>' +
      "</div>" +
      "</div>" +
      "</li>"
    );
  }

  function escapeHtml(s) {
    var div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function escapeAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function normalizeInputValue(str) {
    if (str == null || typeof str !== "string") return "";
    return str
      .trim()
      .replace(/\s+/g, " ");
  }

  function normalizedValues(obj) {
    var out = {};
    for (var k in obj) out[k] = normalizeInputValue(obj[k]);
    return out;
  }

  function getValuesFromForm() {
    var values = {};
    document.querySelectorAll(".prompt-vars input[data-prompt-id][data-var], .prompt-vars select[data-prompt-id][data-var]").forEach(function (el) {
      var id = el.getAttribute("data-prompt-id");
      var key = el.getAttribute("data-var");
      if (!id || !key) return;
      if (!values[id]) values[id] = {};
      values[id][key] = el.value;
    });
    return values;
  }

  function render(listEl, openId, copiedId) {
    var filtered = filterPrompts();
    var values = getValuesFromForm();

    if (filtered.length === 0) {
      listEl.innerHTML = '<li class="empty-state"><p>No prompts match the current filter or search.</p></li>';
      return;
    }

    var focused = document.activeElement;
    var savePromptId, saveVarKey, saveStart, saveEnd;
    if (focused && listEl.contains(focused) && focused.matches && focused.matches(".prompt-vars input")) {
      savePromptId = focused.getAttribute("data-prompt-id");
      saveVarKey = focused.getAttribute("data-var");
      saveStart = focused.selectionStart;
      saveEnd = focused.selectionEnd;
    }

    listEl.innerHTML = filtered
      .map(function (p) {
        return renderPrompt(p, values[p.id], openId === p.id, copiedId);
      })
      .join("");

    if (savePromptId && saveVarKey) {
      listEl.querySelectorAll(".prompt-vars input").forEach(function (input) {
        if (input.getAttribute("data-prompt-id") === savePromptId && input.getAttribute("data-var") === saveVarKey) {
          input.focus();
          var len = input.value.length;
          input.setSelectionRange(Math.min(saveStart, len), Math.min(saveEnd, len));
        }
      });
    }

    listEl.querySelectorAll(".prompt-vars input").forEach(function (input) {
      input.addEventListener("input", function () {
        debouncedRender();
      });
    });
    listEl.querySelectorAll(".prompt-vars select").forEach(function (sel) {
      sel.addEventListener("change", function () {
        debouncedRender();
      });
    });

    function getResolvedText(btn) {
      var promptId = btn.getAttribute("data-prompt-id");
      var body = btn.getAttribute("data-body");
      var hasVars = btn.getAttribute("data-has-vars") === "1";
      var valuesAgain = getValuesFromForm();
      var p = prompts.find(function (x) { return x.id === promptId; });
      return hasVars && p && p.variables ? substitute(body, normalizedValues(valuesAgain[p.id] || {})) : body;
    }

    listEl.querySelectorAll(".copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = getResolvedText(btn);
        navigator.clipboard
          .writeText(text)
          .then(function () {
            btn.textContent = "Copied";
            btn.classList.add("btn-copied");
            btn.classList.remove("btn-primary");
            setTimeout(function () {
              btn.textContent = "Copy";
              btn.classList.remove("btn-copied");
              btn.classList.add("btn-primary");
              render(listEl, openId, null);
            }, 2000);
          })
          .catch(function () {});
      });
    });

    function openModelTab(url, label, modelId) {
      var win;
      if (modelId && openTabWindows[modelId] && !openTabWindows[modelId].closed) {
        openTabWindows[modelId].focus();
        win = openTabWindows[modelId];
      } else {
        var targetName = modelId ? "pm-" + modelId : "_blank";
        win = window.open(url, targetName, "noopener,noreferrer");
        if (modelId && win) openTabWindows[modelId] = win;
      }
      if (!win || win.closed) {
        showToast("Popup blocked. Allow popups for this site in browser settings.");
      }
    }

    function showToast(message) {
      var existing = document.getElementById("prompt-master-toast");
      if (existing) existing.remove();
      var toast = document.createElement("div");
      toast.id = "prompt-master-toast";
      toast.setAttribute("role", "alert");
      toast.className = "prompt-master-toast";
      toast.textContent = message;
      document.body.appendChild(toast);
      requestAnimationFrame(function () {
        toast.classList.add("prompt-master-toast-visible");
      });
      setTimeout(function () {
        toast.classList.remove("prompt-master-toast-visible");
        setTimeout(function () {
          if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
      }, 4000);
    }

    listEl.querySelectorAll(".open-chatgpt-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { openModelTab(OPEN_URLS.chatgpt.url, OPEN_URLS.chatgpt.label, "chatgpt"); });
    });
    listEl.querySelectorAll(".open-claude-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { openModelTab(OPEN_URLS.claude.url, OPEN_URLS.claude.label, "claude"); });
    });
    listEl.querySelectorAll(".open-gemini-btn").forEach(function (btn) {
      btn.addEventListener("click", function () { openModelTab(OPEN_URLS.gemini.url, OPEN_URLS.gemini.label, "gemini"); });
    });

    function getUrlAndLabelForPrompt(p) {
      if (!p || !p.tools || !p.tools.length) return { url: OPEN_URLS.chatgpt.url, label: OPEN_URLS.chatgpt.label, modelId: "chatgpt" };
      var i, t, info;
      for (i = 0; i < p.tools.length; i++) {
        t = p.tools[i];
        if (OPEN_URLS[t]) {
          info = OPEN_URLS[t];
          return { url: info.url, label: info.label, modelId: t };
        }
      }
      info = OPEN_URLS.chatgpt;
      return { url: info.url, label: info.label, modelId: "chatgpt" };
    }

    listEl.querySelectorAll(".prompt-preview").forEach(function (pre) {
      function handlePreviewClick() {
        var promptId = pre.getAttribute("data-prompt-id");
        var p = prompts.find(function (x) { return x.id === promptId; });
        if (!p) return;
        var target = getUrlAndLabelForPrompt(p);
        openModelTab(target.url, target.label, target.modelId);
      }
      pre.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        handlePreviewClick();
      });
      pre.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handlePreviewClick();
        }
      });
    });
  }

  var debounceTimer;
  function debouncedRender() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      render(listEl, openId, copiedId);
    }, 150);
  }

  var listEl = document.getElementById("prompt-list");
  var openId = null;
  var copiedId = null;

  document.getElementById("tool-filter").addEventListener("change", function () {
    render(listEl, openId, copiedId);
  });

  document.getElementById("search").addEventListener("input", function () {
    debouncedRender();
  });

  listEl.addEventListener("click", function (e) {
    var card = e.target.closest(".prompt-card");
    if (!card) return;
    var id = card.getAttribute("data-id");
    if (e.target.closest(".prompt-toggle")) {
      openId = card.getAttribute("data-open") === "true" ? null : id;
      render(listEl, openId, copiedId);
    }
  });

  render(listEl, openId, copiedId);
})();
