import crypto from 'crypto';
import { PlayingCard, CaseDropItem, SkinItem } from '../types';
import { PlayingCard, CaseDropItem, RobloxItem } from '../types';
export class ProvablyFair {
  static generateServerSeed(): string {
    return crypto.randomBytes(32).toString('hex');
  }
  static hashServerSeed(serverSeed: string): string {
    return crypto.createHash('sha256').update(serverSeed).digest('hex');
  }
  static generateClientSeed(): string {
    return crypto.randomBytes(16).toString('hex');
  }
  /**
   * Generates a deterministic float between [0, 1) from seed pair + nonce
   */
  static generateOutcomeFloat(serverSeed: string, clientSeed: string, nonce: number, subIndex: number = 0): number {
    const hmac = crypto.createHmac('sha256', serverSeed);
    hmac.update(`${clientSeed}:${nonce}:${subIndex}`);
    const hex = hmac.digest('hex');
    
    // Take first 8 chars (32 bits)
    const intVal = parseInt(hex.substring(0, 8), 16);
    return intVal / 0x100000000;
  }
  /**
   * Resolves an item drop from a case using cumulative odds
   */
  static resolveCaseDrop(
    caseItems: CaseDropItem[],
    serverSeed: string,
    clientSeed: string,
    nonce: number,
    subIndex: number = 0
  ): { item: SkinItem; rollNumber: number } {
  ): { item: RobloxItem; rollNumber: number } {
    const roll = this.generateOutcomeFloat(serverSeed, clientSeed, nonce, subIndex);
