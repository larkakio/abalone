// Game types for Abalone

export type Player = 'black' | 'white';

export interface Position {
  q: number;
  r: number;
  s: number;
}

export interface Marble {
  id: string;
  position: Position;
  player: Player;
}

export interface BoardState {
  marbles: Marble[];
  currentPlayer: Player;
  blackCaptured: number;
  whiteCaptured: number;
  moveHistory: Move[];
  gameStatus: 'playing' | 'black-won' | 'white-won' | 'draw';
}

export interface Move {
  marbles: Position[];
  direction: Direction;
  timestamp: number;
  captured?: Marble;
}

export enum Direction {
  EAST = 0,      // +q, -s
  NORTHEAST = 1, // +q, -r
  NORTHWEST = 2, // -s, +r
  WEST = 3,      // -q, +s
  SOUTHWEST = 4, // -q, +r
  SOUTHEAST = 5, // +s, -r
}

export interface MoveValidation {
  valid: boolean;
  reason?: string;
  isInlineMove?: boolean;
  capturedMarble?: Marble;
}
