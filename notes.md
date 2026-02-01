# Notes

To provide the most effective guidance, I prefer a structure that separates **persistent rules** (what I should always do) from **active tasks** (what we are building right now).

Since I am "guiding" your development, I recommend the following layout within your project root. This ensures that every time you start a new session or ask for a feature, I have the full context without you having to re-explain it.

### Recommended Folder Layout

```text
/project-root
├── .ai/
│   ├── rules/             # Persistent "Guardrails"
│   │   ├── styles.md      # Linting, naming conventions, architectural patterns
│   │   └── tech-stack.md  # Specific versions and libraries we are using
│   ├── features/          # The "Product" folder
│   │   ├── 01-auth.md     # Specific requirements for current/upcoming features
│   │   └── 02-dashboard.md
│   └── roadmap.md         # The high-level "Where we are going"
├── docs/
│   └── architecture.md    # How the data flows (Diagrams, DB schemas)
└── .cursorrules           # (If using Cursor) Global instructions for my persona

```

---

### The 3 "Prompts" (Context Files) I Prefer

Instead of sending long queries, you can simply say: *"Refer to `.ai/rules/styles.md` and build the feature in `.ai/features/01-auth.md`."* Here is what should be in those files:

#### 1. The "Persona & Standards" Prompt (`.ai/rules/styles.md`)

This tells me **how** to write the code.

* **Preferences:** "Use functional components over classes," "Always use Tailwind for styling," "Write Zod schemas for all API responses."
* **Handling Errors:** "Always include error boundaries" or "Use the Result pattern for error handling."

#### 2. The "Source of Truth" Prompt (`docs/architecture.md`)

This prevents me from hallucinating how your app works.

* **Content:** A list of your database tables, your API endpoints, and your folder structure logic (e.g., "We use a Feature-Sliced Design").

#### 3. The "Feature Spec" Prompt (`.ai/features/X.md`)

This tells me **what** to do right now.

* **Context:** "User needs to be able to reset their password via email."
* **Constraints:** "Don't touch the existing `User` model; use the `Token` table instead."

---

### How I Prefer to Communicate

To be the best guide, I work best when you use these three types of interactions:

1. **The "Plan" Request:** *"I want to build [Feature X]. Look at my current architecture and write a step-by-step implementation plan."* (I will give you the plan *before* the code).
2. **The "Review" Request:** *"Here is a snippet I wrote. Review it against our `.ai/rules/styles.md`."*
3. **The "Debug" Request:** *"I'm getting [Error]. Check the recent changes in `roadmap.md` and tell me what might have broken."*

**Would you like me to generate a template for your first `.ai/rules/styles.md` file based on a specific language or framework?**

Q: can you read my file system

I **cannot** directly browse your computer's hard drive or see files that haven't been shared in this chat. I operate within a "sandbox"—I only know what you explicitly upload, paste, or type.

However, if you are using a specific AI-integrated code editor (like **Cursor**, **Windsurf**, or **VS Code with the Copilot extension**), those tools *can* index your files and "read" them for me.

To get us started effectively, I recommend we simulate a "Project Initialization."

### How to "Sync" Me with Your Project

Since I can't browse your folders, you can act as the bridge by providing me with the "Map." Use these three steps to get me up to speed:

**1. Generate a Tree View**
Run this command in your terminal and paste the output here:

* **Windows:** `tree /f /a`
* **Mac/Linux:** `find . -maxdepth 2 -not -path '*/.*'`

**2. Share the "Specs"**
Copy-paste your `package.json`, `requirements.txt`, or any core configuration file. This tells me your exact tech stack.

**3. Use the "Context Dump"**
Paste the contents of your most important architectural file (like a `README.md` or a `db_schema.sql`).

---

### If you want to use the structure we discussed:

I can generate the **content** for those files right now. You can then save them into a `.ai/` folder in your project. Whenever you have a question, you can just paste the relevant file's content and say, *"Based on these rules, how should I proceed?"*

**Shall we start by creating your `.ai/rules/tech-stack.md`? Just let me know what languages and frameworks you're using.**








Since we're going with **Node.js** and **ECMAScript** (Modern JS), we want to ensure the AI doesn't default to outdated CommonJS (`require`) syntax or old-school callback patterns.

Here is a template for your `.ai/rules/tech-stack.md`. This file serves as the "law" for any code I generate for you.

---

## .ai/rules/tech-stack.md

### 1. Core Runtime & Language

* **Runtime:** Node.js (Latest LTS)
* **Module System:** **ES Modules (ESM)**. Always use `import/export` statements. Never use `require/module.exports`.
* **Version:** Ensure compatibility with Node 20.x+ features (like native `fetch`, recursive `mkdir`, etc.).

### 2. Preferred Tooling

* **Package Manager:** `npm` (default) — *Change to pnpm or yarn if preferred.*
* **Test Runner:** **Vitest** (preferred for ESM speed) or **Node:test** (native runner).
* **Linting/Formatting:** **ESLint** with **Prettier**. Use the "Standard" or "Airbnb" style guide logic but enforced via flat config (`eslint.config.js`).

### 3. Coding Standards & Patterns

* **Asynchronous Patterns:** * Exclusively use `async/await`.
* Avoid `.then()` chains unless handling a specific stream edge case.
* Use `try/catch` blocks with specific error handling logic.


* **Variable Declaration:** * Use `const` by default.
* Use `let` only when reassignment is strictly necessary.
* **Never** use `var`.


* **Object Manipulation:** Prefer destructuring, spread operators (`...`), and optional chaining (`?.`).
* **Strict Mode:** Always assumed via ESM, but code should be written to pass `use strict` standards.

### 4. Project Structure (Node.js ESM)

* **Entry Point:** `src/index.js` or `main.js`.
* **File Naming:** `kebab-case.js` (e.g., `user-controller.js`).
* **Folder Logic:** * `src/`: Application source.
* `tests/`: Unit and integration tests.
* `utils/`: Shared helper functions.



---

### How to use this file

1. **Create the directory:** `mkdir -p .ai/rules`
2. **Save the file:** Save the content above as `tech-stack.md`.
3. **The "Handshake":** Next time you ask me to write a script, start with:
> *"Write a script to handle [X]. Follow the constraints in `.ai/rules/tech-stack.md`."*



### Why this matters

By defining **ESM** specifically, I won't accidentally give you code that causes the dreaded `"ReferenceError: require is not defined in ES module scope"` error.

**Would you like me to create a complementary `.ai/rules/styles.md` file to define how you want your functions structured (e.g., arrow functions vs. declarations)?**