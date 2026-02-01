## .ai/roadmap.md

### 1. Project Overview

- **Vision:** A cycle-accurate (or timing-aware) emulator of the Librascope LGP-30.
- **Core Tech:** Node.js (ESM), Bitwise operations, Terminal-based UI or Web-socket stream.

### 2. Implementation Progress

- **Phase 1: Serial Logic & Memory**
  - 🟡 Define Magnetic Drum (4096 words, 32-bits per word)
  - ⚪ Implement Bit-Serial Register Logic (Accumulator, Instruction Reg)
  - ⚪ Timing Engine (Tracking drum rotation/sectors)
- **Phase 2: Instruction Set (16 Ops)**
  - ⚪ Basic Arithmetic (Add, Subtract, Multiply)
  - ⚪ Logical/Transfer (Bring, Hold, Store)
  - ⚪ Control Flow (Branch, Test)
- **Phase 3: I/O & Interfacing**
  - ⚪ Flexowriter (Paper tape) input emulation
  - ⚪ Oscilloscope/Hex display output logic

### 3. Active Task

- **Goal:** Defining the Magnetic Drum structure and the Bit-Serial timing loop.

### Architectural Design: The Bit-Serial Loop

In a bit-serial machine, the computer processes one bit at a time. In Node.js, we simulate this using a main loop where each "tick" represents a bit-time or a word-time.

### 4. Immediate Next Step: `.ai/rules/emulator-logic.md`

We need a new rule file to handle the specific "quirks" of 1950s hardware. Copy this into your rules folder:

```markdown
# .ai/rules/emulator-logic.md

### 1. Word Structure

- Each word is 32 bits.
- Bits 0-15: Address/Operand.
- Bits 16-19: Instruction Command.
- Bits 20-31: Spacing/Unused.
- **Note:** LGP-30 uses a unique "Hex-decimal" (not standard Hex) coding.

### 2. Timing Simulation

- The drum rotates at ~3700 RPM.
- There are 64 sectors per track.
- **Rule:** Any memory "Store" or "Read" must wait for the simulated drum sector to align with the read/write head.

### 3. Bitwise Constraints

- Use BigInt if we need to handle 64-bit precision, though 32-bit signed integers (`Int32Array`) will handle the LGP-30's 31-bit + sign bit words perfectly.
```
