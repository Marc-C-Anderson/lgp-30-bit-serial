// In the LGP-30, the CPU is extremely minimalist. It doesn't have a broad set of registers; it relies on the **Accumulator (A)** and the **Instruction Register (IR)**.

// Because it's a bit-serial machine, the CPU actually processes the instruction as the bits flow off the drum. For our emulator, we will represent the **Instruction Counter (IC)**—which modern devs call the Program Counter—and the **Accumulator**.

// ---

// ### `src/hardware/cpu.js`

// ```javascript

/**
 * LGP-30 CPU Logic
 * Implements the Fetch-Execute cycle for a bit-serial architecture.
 */
export class CPU {
  constructor(drum) {
    this.drum = drum;
    
    // Registers (32-bit signed integers)
    this.accumulator = 0; 
    this.instructionCounter = 0; // The 'Counter' register
    
    this.isHalted = false;
    this.totalCycles = 0;
  }

  /**
   * Main Step Function
   * Simulates the 2-phase operation: Fetch and Execute.
   */
  async step() {
    if (this.isHalted) return;

    // 1. FETCH
    // Address is stored in the Instruction Counter
    const track = (this.instructionCounter >> 6) & 0x3F;
    const sector = this.instructionCounter & 0x3F;
    
    const { data: instruction, waitSectors: fetchWait } = this.drum.read(track, sector);
    this.syncClock(fetchWait + 1); // +1 for the word-time spent reading

    // 2. DECODE
    // LGP-30 Instruction Format: 
    // Bits 16-19: Command code (4 bits)
    // Bits 2-15: Operand Address (12 bits)
    const command = (instruction >> 16) & 0x0F;
    const operandAddress = (instruction >> 2) & 0x0FFF;

    // 3. EXECUTE
    await this.execute(command, operandAddress);

    // Increment counter (this usually happens during execute in serial logic)
    this.instructionCounter = (this.instructionCounter + 1) % 4096;
  }

  /**
   * Dispatches the 16 basic commands of the LGP-30
   */
  async execute(command, address) {
    const track = (address >> 6) & 0x3F;
    const sector = address & 0x3F;

    switch (command) {
      case 0x01: // 'B' (Bring): Load accumulator from memory
        const { data: bData, waitSectors: bWait } = this.drum.read(track, sector);
        this.accumulator = bData;
        this.syncClock(bWait);
        break;

      case 0x0E: // 'H' (Hold): Store accumulator and keep in A
        const hWait = this.drum.write(track, sector, this.accumulator);
        this.syncClock(hWait);
        break;

      case 0x0F: // 'Z' (Stop): Halt the machine
        this.isHalted = true;
        break;

      // Other instructions (A, S, M, D, U, T, etc.) will go here
      default:
        console.warn(`Instruction ${command.toString(16)} not yet implemented.`);
    }
  }

  /**
   * Advances the drum and global clock to keep timing accurate.
   */
  syncClock(ticks) {
    for (let i = 0; i < ticks; i++) {
      this.drum.tick();
      this.totalCycles++;
    }
  }
}

// ```

// ---

// ### Key Architectural Decisions

// 1. **The `syncClock` Method:** In a bit-serial machine, the CPU and Drum are physically locked to the same clock. When the CPU "waits" for a sector, the drum *must* keep spinning. This method ensures our timing remains cycle-accurate.
// 2. **Instruction Decoding:** Note the bit-shifting logic: `(instruction >> 16) & 0x0F`. The LGP-30's 16 instructions are mapped to specific 4-bit codes. I've started with **B (Bring)**, **H (Hold)**, and **Z (Stop)**.
// 3. **Signed 32-bit Logic:** While JS numbers are 64-bit floats, bitwise operators in JavaScript (like `>>` and `&`) convert the operand to a **32-bit signed integer**. This is perfect for simulating the LGP-30's 31-bit + sign bit words.

// ### Updating the Roadmap

// Since we have the Drum and the start of the CPU:

// * **Phase 1:** 🟢 Define Magnetic Drum | 🟡 Implement CPU Logic.
// * **Next Task:** Implement the remaining Arithmetic Instructions (Add, Subtract) and the unique LGP-30 "Hex-decimal" character mapping.

// **Would you like me to implement the Addition (`A`) and Subtraction (`S`) logic, or should we work on the character set used for input/output?**