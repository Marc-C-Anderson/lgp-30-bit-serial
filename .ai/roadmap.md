This is a fascinating project. The **LGP-30** (1956) is a masterpiece of minimalist engineering. Replicating a **bit-serial** architecture using modern **Node.js/ECMAScript** is an exercise in precise timing and bitwise logic.

Because the LGP-30 uses a magnetic drum, "memory access" isn't instantaneous like modern RAM; it’s dependent on the physical rotation of the drum. This means your emulator needs to track the **"phase" or "sector"** of the drum.

---

### Updated `.ai/roadmap.md` for LGP-30 Emulator

I have initialized your roadmap with the specific phases required for an emulator of this complexity.

```markdown
# LGP-30 Emulator Roadmap

### 1. Project Overview
* **Vision:** A cycle-accurate (or timing-aware) emulator of the Librascope LGP-30.
* **Core Tech:** Node.js (ESM), Bitwise operations, Terminal-based UI or Web-socket stream.

### 2. Implementation Progress
* **Phase 1: Serial Logic & Memory**
    * 🟡 Define Magnetic Drum (4096 words, 32-bits per word)
    * ⚪ Implement Bit-Serial Register Logic (Accumulator, Instruction Reg)
    * ⚪ Timing Engine (Tracking drum rotation/sectors)
* **Phase 2: Instruction Set (16 Ops)**
    * ⚪ Basic Arithmetic (Add, Subtract, Multiply)
    * ⚪ Logical/Transfer (Bring, Hold, Store)
    * ⚪ Control Flow (Branch, Test)
* **Phase 3: I/O & Interfacing**
    * ⚪ Flexowriter (Paper tape) input emulation
    * ⚪ Oscilloscope/Hex display output logic

### 3. Active Task
* **Goal:** Defining the Magnetic Drum structure and the Bit-Serial timing loop.

```

---

### Architectural Design: The Bit-Serial Loop

In a bit-serial machine, the computer processes one bit at a time. In Node.js, we simulate this using a main loop where each "tick" represents a bit-time or a word-time.

### 4. Immediate Next Step: `.ai/rules/emulator-logic.md`

We need a new rule file to handle the specific "quirks" of 1950s hardware. Copy this into your rules folder:

```markdown
# .ai/rules/emulator-logic.md

### 1. Word Structure
* Each word is 32 bits. 
* Bits 0-15: Address/Operand.
* Bits 16-19: Instruction Command.
* Bits 20-31: Spacing/Unused.
* **Note:** LGP-30 uses a unique "Hex-decimal" (not standard Hex) coding.

### 2. Timing Simulation
* The drum rotates at ~3700 RPM.
* There are 64 sectors per track.
* **Rule:** Any memory "Store" or "Read" must wait for the simulated drum sector to align with the read/write head. 

### 3. Bitwise Constraints
* Use BigInt if we need to handle 64-bit precision, though 32-bit signed integers (`Int32Array`) will handle the LGP-30's 31-bit + sign bit words perfectly.

```

---

### Let's start coding.

To begin, we need to create the **Magnetic Drum**. Because it's 4096 words, we should use a `Uint32Array` for performance and memory efficiency.

**Would you like me to generate the `src/hardware/drum.js` file that handles the sector-timing logic?**

Updating the Roadmap
Since we have the Drum and the start of the CPU:

Phase 1: 🟢 Define Magnetic Drum | 🟡 Implement CPU Logic.

Next Task: Implement the remaining Arithmetic Instructions (Add, Subtract) and the unique LGP-30 "Hex-decimal" character mapping.

Would you like me to implement the Addition (A) and Subtraction (S) logic, or should we work on the character set used for input/output?















The `roadmap.md` is the most "human" file in your `.ai/` folder. It acts as our shared memory. Without it, I might forget what we finished yesterday or what the high-priority bug is today.

Think of this as a **high-level checklist** that bridges the gap between your big ideas and the actual code.

---

## .ai/roadmap.md

### 1. Project Overview

* **Vision:** (Briefly describe the end goal of this project).
* **Current Phase:** `[Planning | Initial Setup | MVP Development | Scaling]`

### 2. Implementation Progress

*Legend: 🟢 Completed | 🟡 In Progress | ⚪ To-Do | 🔴 Blocked*

* **Phase 1: Foundation**
* 🟢 Initialize Node.js ESM Project
* 🟢 Configure `.ai/` rules and folder structure
* 🟡 Setup core utility library (`src/utils/`)


* **Phase 2: Core Logic**
* ⚪ Feature A implementation
* ⚪ Feature B implementation


* **Phase 3: Testing & Refinement**
* ⚪ Unit test coverage (>80%)
* ⚪ Performance audit



### 3. Current Sprint / Active Task

* **Goal:** (Describe exactly what we are working on *right now*)
* **Blockers:** (List any technical hurdles or missing information)

### 4. Technical Debt / Icebox

* (Ideas to implement later so we don't get distracted now)
* (Refactors that aren't urgent but are necessary)

---

### How to use this effectively with me

1. **The "Update" Command:** Every time we finish a feature, tell me: *"Update the roadmap, mark Task X as complete, and move Task Y to In Progress."*
2. **The "Status Check":** If you've been away from the project for a few days, ask me: *"Read the roadmap and tell me what our next priority is."*
3. **The "Context Load":** When starting a new chat session, paste this file first. It immediately tells me where we are in the development lifecycle.

### The "Golden Triangle" Complete

You now have the full AI-Guidance stack:

* **`tech-stack.md`**: What tools we use.
* **`styles.md`**: How the code should look.
* **`roadmap.md`**: What we are actually doing.

**Would you like to start on a real task now? If so, tell me what you're building, and I'll help you fill out the "Project Overview" and first "Sprints" in this roadmap!**




The `roadmap.md` is the most "human" file in your `.ai/` folder. It acts as our shared memory. Without it, I might forget what we finished yesterday or what the high-priority bug is today.

Think of this as a **high-level checklist** that bridges the gap between your big ideas and the actual code.

---

## .ai/roadmap.md

### 1. Project Overview

* **Vision:** (Briefly describe the end goal of this project).
* **Current Phase:** `[Planning | Initial Setup | MVP Development | Scaling]`

### 2. Implementation Progress

*Legend: 🟢 Completed | 🟡 In Progress | ⚪ To-Do | 🔴 Blocked*

* **Phase 1: Foundation**
* 🟢 Initialize Node.js ESM Project
* 🟢 Configure `.ai/` rules and folder structure
* 🟡 Setup core utility library (`src/utils/`)


* **Phase 2: Core Logic**
* ⚪ Feature A implementation
* ⚪ Feature B implementation


* **Phase 3: Testing & Refinement**
* ⚪ Unit test coverage (>80%)
* ⚪ Performance audit



### 3. Current Sprint / Active Task

* **Goal:** (Describe exactly what we are working on *right now*)
* **Blockers:** (List any technical hurdles or missing information)

### 4. Technical Debt / Icebox

* (Ideas to implement later so we don't get distracted now)
* (Refactors that aren't urgent but are necessary)

---

### How to use this effectively with me

1. **The "Update" Command:** Every time we finish a feature, tell me: *"Update the roadmap, mark Task X as complete, and move Task Y to In Progress."*
2. **The "Status Check":** If you've been away from the project for a few days, ask me: *"Read the roadmap and tell me what our next priority is."*
3. **The "Context Load":** When starting a new chat session, paste this file first. It immediately tells me where we are in the development lifecycle.

### The "Golden Triangle" Complete

You now have the full AI-Guidance stack:

* **`tech-stack.md`**: What tools we use.
* **`styles.md`**: How the code should look.
* **`roadmap.md`**: What we are actually doing.

**Would you like to start on a real task now? If so, tell me what you're building, and I'll help you fill out the "Project Overview" and first "Sprints" in this roadmap!**

