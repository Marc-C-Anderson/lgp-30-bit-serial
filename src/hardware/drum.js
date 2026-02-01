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
      waitSectors,
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
    return 64 - this.currentSector + targetSector;
  }
}
