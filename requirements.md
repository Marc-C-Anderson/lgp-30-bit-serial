Project Specification: LGP-30 Bit-Serial Emulator
1. Overview
Goal: Create a cycle-accurate (or near-accurate) emulation of the LGP-30 computer.

Context: A "vanilla" JavaScript implementation that runs in the browser without external dependencies or build tools.

2. Tech Stack & Standards
Language: Vanilla ES6+ JavaScript.

Architecture: Bit-serial logic (processing 1 bit at a time within a 32-bit word).

UI: HTML5 Canvas for the drum visualization and a simple DOM-based "Flexowriter" output.

3. Functional Requirements
[ ] The Drum: Implement a 4096-word memory (64 tracks × 64 words).

[ ] The Register: Simulate the Accumulator (A) and Instruction Counter (IC).

[ ] Instruction Set: Support the 16 basic commands (e.g., B for bring, A for add, U for unconditional transfer).

[ ] Timing: Simulate the 120-millisecond rotation speed and the bit-by-bit shift process.

4. Technical Constraints
Word Format: 32 bits per word. Bit 0 (leftmost) is the sign bit; bits 1-15 are the value/instruction; bits 16-31 are the address.

No BigInt: Use standard Number types but handle bitwise logic manually to ensure 31-bit precision + sign bit.

Data Flow: Logic should follow the "Serial" flow, meaning we treat words as shift registers.

5. Output Format
File Structure: * index.html: The UI/Display.

lgp30.js: The core CPU and Drum logic.

disassembler.js: Utility to convert drum hex/binary to readable code.

A Note on the "Serial" Logic
In the LGP-30, the computer doesn't "know" the whole number at once. It sees the bits one at a time as the drum rotates. In your JS code, we should represent the Accumulator like this:

JavaScript

```javascript
// A simple way to represent the 32-bit serial register
class Register {
    constructor() {
        this.bits = new Uint8Array(32); 
    }
    tick(inputBit) {
        // Shift bits and take the new bit at the end
        const outputBit = this.bits[0];
        for(let i = 0; i < 31; i++) this.bits[i] = this.bits[i+1];
        this.bits[31] = inputBit;
        return outputBit;
    }
}
```
