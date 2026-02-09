// Hexagonal board utilities using cube coordinates

import { Position, Marble, Player } from './types';
import { BOARD_SIZE, DIRECTION_VECTORS } from './constants';

/**
 * Check if two positions are equal
 */
export function positionsEqual(pos1: Position, pos2: Position): boolean {
  return pos1.q === pos2.q && pos1.r === pos2.r && pos1.s === pos2.s;
}

/**
 * Calculate distance between two positions
 */
export function distance(pos1: Position, pos2: Position): number {
  return Math.max(
    Math.abs(pos1.q - pos2.q),
    Math.abs(pos1.r - pos2.r),
    Math.abs(pos1.s - pos2.s)
  );
}

/**
 * Get neighbor position in a specific direction
 */
export function getNeighbor(pos: Position, directionIndex: number): Position {
  const dir = DIRECTION_VECTORS[directionIndex];
  return {
    q: pos.q + dir.q,
    r: pos.r + dir.r,
    s: pos.s + dir.s,
  };
}

/**
 * Check if position is within board boundaries
 */
export function isOnBoard(pos: Position): boolean {
  // Hexagonal board constraint: max coordinate value is BOARD_SIZE - 1
  return (
    Math.abs(pos.q) < BOARD_SIZE &&
    Math.abs(pos.r) < BOARD_SIZE &&
    Math.abs(pos.s) < BOARD_SIZE &&
    pos.q + pos.r + pos.s === 0 // Cube coordinate constraint
  );
}

/**
 * Find marble at specific position
 */
export function findMarbleAt(
  marbles: Marble[],
  position: Position
): Marble | undefined {
  return marbles.find((m) => positionsEqual(m.position, position));
}

/**
 * Check if marbles form a straight line
 */
export function isInLine(positions: Position[]): boolean {
  if (positions.length <= 1) return true;
  if (positions.length > 3) return false;

  // Check if all marbles are in same direction from first marble
  const first = positions[0];
  
  // Try each direction
  for (let dir = 0; dir < 6; dir++) {
    let allInLine = true;
    
    for (let i = 1; i < positions.length; i++) {
      const expected = getNeighbor(positions[i - 1], dir);
      if (!positionsEqual(expected, positions[i])) {
        allInLine = false;
        break;
      }
    }
    
    if (allInLine) return true;
  }
  
  return false;
}

/**
 * Check if all marbles are the same color
 */
export function allSameColor(
  positions: Position[],
  marbles: Marble[]
): boolean {
  if (positions.length === 0) return false;
  
  const firstMarble = findMarbleAt(marbles, positions[0]);
  if (!firstMarble) return false;
  
  return positions.every((pos) => {
    const marble = findMarbleAt(marbles, pos);
    return marble && marble.player === firstMarble.player;
  });
}

/**
 * Determine if move is parallel to marble line (in-line) or perpendicular (broadside)
 */
export function isParallelMove(
  marbles: Position[],
  directionIndex: number
): boolean {
  if (marbles.length === 1) return true;
  
  // Get direction of marble line
  const lineDir = getLineDirection(marbles);
  if (lineDir === -1) return false;
  
  // Check if move direction is same or opposite of line direction
  return directionIndex === lineDir || directionIndex === (lineDir + 3) % 6;
}

/**
 * Get the direction index of a line of marbles
 */
export function getLineDirection(positions: Position[]): number {
  if (positions.length <= 1) return -1;
  
  for (let dir = 0; dir < 6; dir++) {
    let allMatch = true;
    
    for (let i = 1; i < positions.length; i++) {
      const expected = getNeighbor(positions[i - 1], dir);
      if (!positionsEqual(expected, positions[i])) {
        allMatch = false;
        break;
      }
    }
    
    if (allMatch) return dir;
  }
  
  return -1;
}

/**
 * Sort positions along a direction (for move execution)
 */
export function sortPositionsAlongDirection(
  positions: Position[],
  directionIndex: number
): Position[] {
  const dir = DIRECTION_VECTORS[directionIndex];
  
  return [...positions].sort((a, b) => {
    // Sort so that positions closer to the movement direction come last
    const aDist = a.q * dir.q + a.r * dir.r + a.s * dir.s;
    const bDist = b.q * dir.q + b.r * dir.r + b.s * dir.s;
    return aDist - bDist;
  });
}

/**
 * Get all valid board positions (61 spaces)
 */
export function getAllBoardPositions(): Position[] {
  const positions: Position[] = [];
  
  for (let q = -(BOARD_SIZE - 1); q <= BOARD_SIZE - 1; q++) {
    for (let r = -(BOARD_SIZE - 1); r <= BOARD_SIZE - 1; r++) {
      const s = -q - r;
      const pos = { q, r, s };
      if (isOnBoard(pos)) {
        positions.push(pos);
      }
    }
  }
  
  return positions;
}

/**
 * Convert position to pixel coordinates for rendering
 */
export function positionToPixel(
  pos: Position,
  hexSize: number,
  centerX: number,
  centerY: number
): { x: number; y: number } {
  const x = centerX + hexSize * (3 / 2) * pos.q;
  const y = centerY + hexSize * (Math.sqrt(3) / 2 * pos.q + Math.sqrt(3) * pos.r);
  
  return { x, y };
}

/**
 * Calculate which direction a swipe gesture corresponds to
 */
export function swipeToDirection(dx: number, dy: number): number {
  const angle = Math.atan2(dy, dx);
  const degrees = angle * (180 / Math.PI);
  
  // Normalize to 0-360
  const normalized = (degrees + 360) % 360;
  
  // Map to 6 directions (60° each)
  // EAST: 0°, NORTHEAST: 60°, NORTHWEST: 120°, WEST: 180°, SOUTHWEST: 240°, SOUTHEAST: 300°
  if (normalized >= 330 || normalized < 30) return 0; // EAST
  if (normalized >= 30 && normalized < 90) return 1; // NORTHEAST
  if (normalized >= 90 && normalized < 150) return 2; // NORTHWEST
  if (normalized >= 150 && normalized < 210) return 3; // WEST
  if (normalized >= 210 && normalized < 270) return 4; // SOUTHWEST
  return 5; // SOUTHEAST
}
