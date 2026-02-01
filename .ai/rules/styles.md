## .ai/rules/styles.md

### 1. Functional Philosophy

- **Function Types:** Prefer **Arrow Functions** (`const name = () => {}`) for anonymous callbacks and simple utilities. Use **Function Declarations** (`export function name() {}`) for top-level exported components or services to take advantage of hoisting and clarity.
- **Naming Conventions:**
- **Variables/Functions:** `camelCase` (e.g., `getUserData`).
- **Classes/Constructors:** `PascalCase` (e.g., `UserSession`).
- **Constants:** `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`).

- **Pure Functions:** Aim for functional purity. Avoid mutating inputs; return new objects/arrays using the spread operator (`...`).

### 2. Error Handling & Logic

- **Early Returns:** Use the "Bouncer Pattern." Check for invalid conditions at the start of the function and return early to avoid deeply nested `if/else` statements.
- **Error Messages:** Provide descriptive strings in `new Error()`.
- **Logic Density:** Favor readability over "clever" one-liners. If a ternary operator is longer than 80 characters, expand it into a standard `if/else`.

### 3. Formatting & Documentation

- **Comments:** _ Use **JSDoc** (`/\*\* ... _/`) for complex functions to define `@param`and`@returns`.
- Use inline comments (`//`) only to explain **why** something is done, not **what** is being done.

- **Spacing:** \* Use 2 spaces for indentation.
- Maintain a single empty line between logical blocks (e.g., between imports and the first function).

- **Strings:** Use **Template Literals** (backticks) if any variables are involved. Use single quotes for static strings.

### 4. ESM Specifics

- **File Extensions:** Always include the `.js` extension in your `import` statements (e.g., `import { helper } from './utils.js'`). This is required for native Node.js ESM support.
- **Named Exports:** Prefer **Named Exports** (`export const x = ...`) over Default Exports. It makes refactoring and IDE auto-imports much more reliable.
