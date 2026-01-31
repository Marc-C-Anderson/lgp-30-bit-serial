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

Memory: Magnetic Drum
Total Capacity: 4,096 words.

Geometry: 64 Tracks (0–63) by 64 Sectors (0–63).

Word Size: 32 bits per sector (word).

Addressing: 12-bit address space where the high 6 bits indicate the Track and the low 6 bits indicate the Sector.

Serial Access: Simulate a "read head" position that increments per clock tick; a word is only accessible when the drum rotation matches the requested sector.

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

The "Vanilla JS" Implementation Logic
When we translate this to code, we shouldn't just use a flat array of 4,096 elements if we want true bit-serial emulation. We need to account for the interleave and the rotation delay.

Here is how I would structure that "Drum" in your lgp30.js file:

JavaScript

```javascript
class MagneticDrum {
    constructor() {
        // 64 tracks * 64 sectors = 4096 words
        // Using Int32Array to represent 32-bit words cleanly
        this.storage = new Int32Array(4096);
        
        this.currentSector = 0; // The sector currently under the read head
        this.totalSectors = 64;
    }

    // Simulate the physical rotation of the drum
    tick() {
        this.currentSector = (this.currentSector + 1) % this.totalSectors;
    }

    // In a bit-serial machine, you wait for the drum to reach the right spot
    isSectorReady(address) {
        const targetSector = address & 0x3F; // Low 6 bits
        return this.currentSector === targetSector;
    }
}
```

Why specify it this way?
Bit-Serial Timing: By defining the 64 sectors, we can simulate the "latency." The CPU has to wait for the drum to spin to the correct sector before it can read the 32 bits.

Addressing: Using the 64x64 split allows us to implement the Track (physical location) and Sector (timing/offset) logic exactly like the 1956 hardware.

Would you like me to write the Clock logic that synchronizes this Drum rotation with the CPU's instruction cycle?