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
    const track = (this.instructionCounter >> 6) & 0x3f;
    const sector = this.instructionCounter & 0x3f;

    const { data: instruction, waitSectors: fetchWait } = this.drum.read(
      track,
      sector,
    );
    this.syncClock(fetchWait + 1); // +1 for the word-time spent reading

    // 2. DECODE
    // LGP-30 Instruction Format:
    // Bits 16-19: Command code (4 bits)
    // Bits 2-15: Operand Address (12 bits)
    const command = (instruction >> 16) & 0x0f;
    const operandAddress = (instruction >> 2) & 0x0fff;

    // 3. EXECUTE
    await this.execute(command, operandAddress);

    // Increment counter (this usually happens during execute in serial logic)
    this.instructionCounter = (this.instructionCounter + 1) % 4096;
  }

  /**
   * Dispatches the 16 basic commands of the LGP-30
   */
  async execute(command, address) {
    const track = (address >> 6) & 0x3f;
    const sector = address & 0x3f;

    switch (command) {
      case 0x01: // 'B' (Bring): Load accumulator from memory
        const { data: bData, waitSectors: bWait } = this.drum.read(
          track,
          sector,
        );
        this.accumulator = bData;
        this.syncClock(bWait);
        break;

      case 0x0e: // 'H' (Hold): Store accumulator and keep in A
        const hWait = this.drum.write(track, sector, this.accumulator);
        this.syncClock(hWait);
        break;

      case 0x0f: // 'Z' (Stop): Halt the machine
        this.isHalted = true;
        break;

      // Other instructions (A, S, M, D, U, T, etc.) will go here
      default:
        console.warn(
          `Instruction ${command.toString(16)} not yet implemented.`,
        );
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
