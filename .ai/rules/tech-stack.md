## .ai/rules/tech-stack.md

### 1. Core Runtime & Language

* **Runtime:** Node.js (Latest LTS)
* **Module System:** **ES Modules (ESM)**. Always use `import/export` statements. Never use `require/module.exports`.
* **Version:** Ensure compatibility with Node 20.x+ features (like native `fetch`, recursive `mkdir`, etc.).

### 2. Preferred Tooling

* **Package Manager:** `pnpm` (default) — *Change to pnpm or yarn if preferred.*
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
