This is a fantastic project. Building a bit-serial emulator is a masterclass in understanding how hardware actually "thinks." Most modern emulators cheat by using random access memory, but by respecting the **rotational latency** of the magnetic drum, you're capturing the soul of the LGP-30.

I've refined your specification and drafted the core logic for the CPU-Drum handshake.

---

## 1. Physical Architecture Overview

The LGP-30 is essentially a collection of **recirculating shift registers**. The Accumulator, the Instruction Counter, and even the Drum tracks are just loops of bits.

### Memory Layout & Addressing

As you noted, the address is 12 bits: `TTTTTT SSSSSS`.

* **Track (T):** Selects which physical read/write head is active.
* **Sector (S):** Determines *when* the data is available during the drum's rotation.

---

## 2. Core Implementation: `lgp30.js`

To maintain "Serial" authenticity without sacrificing performance, we can use a **State Machine** approach. The CPU will enter a `WAITING` state until the `MagneticDrum.currentSector` matches the instruction's operand.

```javascript
class LGP30 {
    constructor() {
        this.drum = new MagneticDrum();
        this.acc = 0;      // Accumulator (32-bit)
        this.ic = 0;       // Instruction Counter (12-bit)
        this.ir = 0;       // Instruction Register
        this.state = 'FETCH'; // FETCH, WAIT, EXECUTE
    }

    // The "Heartbeat" of the machine
    tick() {
        this.drum.tick(); // Drum spins every clock cycle

        switch (this.state) {
            case 'FETCH':
                if (this.drum.isSectorReady(this.ic)) {
                    this.ir = this.drum.read(this.ic);
                    this.state = 'EXECUTE';
                }
                break;

            case 'EXECUTE':
                this.executeInstruction();
                break;
        }
    }

    executeInstruction() {
        const opcode = (this.ir >> 16) & 0x0F; // Simplified 4-bit opcode
        const address = this.ir & 0x0FFF;      // 12-bit address

        // For instructions requiring memory access (e.g., 'B' or 'A')
        if (this.needsMemory(opcode)) {
            if (this.drum.isSectorReady(address)) {
                this.performOp(opcode, address);
                this.ic = (this.ic + 1) & 0x0FFF;
                this.state = 'FETCH';
            }
            // If not ready, we simply return and wait for the next tick()
        } else {
            // Immediate instructions
            this.performOp(opcode, address);
            this.ic = (this.ic + 1) & 0x0FFF;
            this.state = 'FETCH';
        }
    }
}

```

---

## 3. Visualization: The HTML5 Canvas Drum

Since the drum spins at roughly **3700 RPM** (roughly 1 sector every 0.26ms), a real-time visualization is quite satisfying. You can map the `currentSector` to a rotating cylinder or a 64x64 grid where a "playhead" moves across the columns.

| Component | Visual Representation |
| --- | --- |
| **The Drum** | A 64x64 grid; cells glow when written to. |
| **The Heads** | A vertical bar highlighting the `currentSector`. |
| **Flexowriter** | A `<pre>` tag styled like a typewriter. |

---

## 4. Correcting the "No BigInt" Constraint

You mentioned avoiding `BigInt`, which is fine for 32-bit operations since JavaScript bitwise operators (`|`, `&`, `<<`) treat operands as **signed 32-bit integers**.

> **Peer Note:** In JS, `(0xFFFFFFFF | 0)` results in `-1`. This actually works in your favor for the LGP-30's two's complement-ish behavior, but be careful with the **Sign-Magnitude** format. The LGP-30 uses the leftmost bit as a sign, but it doesn't always behave like standard modern integers. You may need to mask the sign bit before doing math: `val & 0x7FFFFFFF`.

---

## 5. Next Steps

The logic is sound, but the "Flexowriter" needs a character mapping (it used a specific Baudot-like encoding).

**Would you like me to generate the `disassembler.js` utility to map those hex opcodes (like `B`, `A`, `S`, `M`) to their LGP-30 mnemonics?**