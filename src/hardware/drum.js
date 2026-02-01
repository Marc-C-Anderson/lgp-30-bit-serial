// To implement the drum memory, we have to account for the fact that the LGP-30 doesn't have "random access" in the modern sense. It has **latency**. The computer must wait for the drum to rotate until the desired sector is under the read/write head.

// ### The Logic

// We will use a `Uint32Array` to represent the **4,096 words** (64 tracks × 64 sectors). To simulate the bit-serial nature, we'll track a `currentSector` that increments to simulate the drum's rotation.

// ---

// ### `src/hardware/drum.js`

// ```javascript
/**
 * LGP-30 Magnetic Drum Memory
 * 64 Tracks, 64 Sectors per track = 4096 Words.
 * Drum rotates at ~3700 RPM.
 */
export class MagneticDrum {
  constructor() {
    // 4096 words, each 32 bits
    this.memory = new Uint32Array(4096);
    this.currentSector = 0; // 0 to 63
  }

  /**
   * Simulates one "word-time" rotation of the drum.
   */
  tick() {
    this.currentSector = (this.currentSector + 1) % 64;
  }

  /**
   * Reads a word from a specific address.
   * In a bit-serial machine, this would "block" until 
   * the sector is reached.
   */
  read(track, sector) {
    const address = (track << 6) | sector;
    const waitSectors = this.calculateLatency(sector);
    
    return {
      data: this.memory[address],
      waitSectors
    };
  }

  write(track, sector, value) {
    const address = (track << 6) | sector;
    const waitSectors = this.calculateLatency(sector);
    
    this.memory[address] = value;
    return waitSectors;
  }

  /**
   * Calculates how many sectors must pass before the target 
   * sector reaches the head.
   */
  calculateLatency(targetSector) {
    if (targetSector >= this.currentSector) {
      return targetSector - this.currentSector;
    }
    return (64 - this.currentSector) + targetSector;
  }
}

// ```

// ---

// ### Why this structure?

// 1. **Bitwise Address:** The LGP-30 address is effectively 12 bits. Bits 0-5 are the sector, bits 6-11 are the track. Using `(track << 6) | sector` perfectly maps this.
// 2. **Latency Tracking:** In your main emulator loop, you'll need to "pause" execution for the number of `waitSectors` returned. This is the key to a **timing-accurate** emulator.
// 3. **ESM Compliance:** Note the `export class` and lack of `require`, strictly following your `.ai/rules/tech-stack.md`.

// ### Integration with Styles

// I've used **PascalCase** for the class and **camelCase** for methods, as per our `.ai/rules/styles.md`. I also used **JSDoc** to explain the "why" behind the drum timing.

// **Would you like me to create the `src/hardware/cpu.js` next, specifically focusing on the Accumulator and the basic Fetch-Execute cycle?**