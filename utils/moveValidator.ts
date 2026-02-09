// Move validation logic implementing Abalone rules

import {
  Position,
  Marble,
  Player,
  MoveValidation,
  Direction,
} from './types';
import {
  positionsEqual,
  isOnBoard,
  findMarbleAt,
  isInLine,
  allSameColor,
  isParallelMove,
  getNeighbor,
  sortPositionsAlongDirection,
} from './boardUtils';
import { MAX_MARBLES_PER_MOVE } from './constants';

/**
 * Validate a move according to Abalone rules
 */
export function validateMove(
  selectedPositions: Position[],
  directionIndex: number,
  allMarbles: Marble[],
  currentPlayer: Player
): MoveValidation {
  // Check: must select at least 1 marble
  if (selectedPositions.length === 0) {
    return { valid: false, reason: 'No marbles selected' };
  }

  // Check: cannot move more than 3 marbles
  if (selectedPositions.length > MAX_MARBLES_PER_MOVE) {
    return { valid: false, reason: 'Cannot move more than 3 marbles' };
  }

  // Check: selected marbles must form a straight line
  if (!isInLine(selectedPositions)) {
    return { valid: false, reason: 'Marbles must be in a straight line' };
  }

  // Check: all marbles must belong to current player
  if (!allSameColor(selectedPositions, allMarbles)) {
    return { valid: false, reason: 'All marbles must be the same color' };
  }

  const firstMarble = findMarbleAt(allMarbles, selectedPositions[0]);
  if (!firstMarble || firstMarble.player !== currentPlayer) {
    return { valid: false, reason: 'Must move your own marbles' };
  }

  // Determine move type: in-line or broadside
  const isInlineMove = isParallelMove(selectedPositions, directionIndex);

  if (isInlineMove) {
    return validateInlineMove(selectedPositions, directionIndex, allMarbles, currentPlayer);
  } else {
    return validateBroadsideMove(selectedPositions, directionIndex, allMarbles);
  }
}

/**
 * Validate in-line move (can push opponent marbles)
 */
function validateInlineMove(
  selectedPositions: Position[],
  directionIndex: number,
  allMarbles: Marble[],
  currentPlayer: Player
): MoveValidation {
  // Sort marbles in direction of movement (front marble first)
  const sortedPositions = sortPositionsAlongDirection(selectedPositions, directionIndex);
  const frontMarble = sortedPositions[sortedPositions.length - 1];
  
  // Check what's in front
  const nextPos = getNeighbor(frontMarble, directionIndex);
  const marbleAhead = findMarbleAt(allMarbles, nextPos);

  // Case 1: Empty space ahead - move is valid
  if (!marbleAhead) {
    // Check if destination is on board
    if (!isOnBoard(nextPos)) {
      return { valid: false, reason: 'Cannot move off the board' };
    }
    return { valid: true, isInlineMove: true };
  }

  // Case 2: Our own marble ahead - invalid
  if (marbleAhead.player === currentPlayer) {
    return { valid: false, reason: 'Cannot push your own marbles' };
  }

  // Case 3: Opponent marble ahead - check Sumito rules
  return validateSumito(
    selectedPositions.length,
    nextPos,
    directionIndex,
    allMarbles,
    currentPlayer
  );
}

/**
 * Validate Sumito (pushing) according to rules:
 * - 3 marbles can push 1 or 2 opponent marbles
 * - 2 marbles can push 1 opponent marble
 * - 1 marble cannot push anything
 */
function validateSumito(
  pushingCount: number,
  opponentStartPos: Position,
  directionIndex: number,
  allMarbles: Marble[],
  currentPlayer: Player
): MoveValidation {
  // Count consecutive opponent marbles
  let opponentCount = 0;
  let currentPos = opponentStartPos;
  let lastOpponentPos = opponentStartPos;

  while (true) {
    const marble = findMarbleAt(allMarbles, currentPos);
    
    if (!marble) {
      // Empty space or off board - check if we can push
      break;
    }

    if (marble.player === currentPlayer) {
      // Hit our own marble - cannot push through our own marbles
      return { valid: false, reason: 'Cannot push through your own marbles' };
    }

    // It's an opponent marble
    opponentCount++;
    lastOpponentPos = currentPos;
    
    if (opponentCount > 2) {
      // Cannot push more than 2 opponent marbles
      return { valid: false, reason: 'Cannot push more than 2 marbles' };
    }

    currentPos = getNeighbor(currentPos, directionIndex);
  }

  // Apply Sumito rules
  if (pushingCount <= opponentCount) {
    return { valid: false, reason: 'Need more marbles to push (Sumito rule)' };
  }

  // Check if the destination for last opponent marble is valid
  const finalPos = getNeighbor(lastOpponentPos, directionIndex);
  
  if (!isOnBoard(finalPos)) {
    // Pushing opponent off the board - valid and captures the marble
    const capturedMarble = findMarbleAt(allMarbles, lastOpponentPos);
    return {
      valid: true,
      isInlineMove: true,
      capturedMarble: capturedMarble,
    };
  }

  // Destination is on board and empty - valid push
  return { valid: true, isInlineMove: true };
}

/**
 * Validate broadside move (perpendicular to marble line)
 * All destination spaces must be empty
 */
function validateBroadsideMove(
  selectedPositions: Position[],
  directionIndex: number,
  allMarbles: Marble[]
): MoveValidation {
  // Check each marble's destination
  for (const pos of selectedPositions) {
    const nextPos = getNeighbor(pos, directionIndex);
    
    // Must be on board
    if (!isOnBoard(nextPos)) {
      return { valid: false, reason: 'Cannot move off the board' };
    }

    // Must be empty
    const marbleAtDest = findMarbleAt(allMarbles, nextPos);
    if (marbleAtDest) {
      return { valid: false, reason: 'Destination must be empty for broadside move' };
    }
  }

  return { valid: true, isInlineMove: false };
}

/**
 * Execute a validated move and return new marble positions
 */
export function executeMove(
  selectedPositions: Position[],
  directionIndex: number,
  allMarbles: Marble[],
  validation: MoveValidation
): { newMarbles: Marble[]; capturedMarble?: Marble } {
  const newMarbles = [...allMarbles];
  let capturedMarble: Marble | undefined;

  if (validation.isInlineMove) {
    // In-line move: handle pushing
    const result = executeInlineMove(
      selectedPositions,
      directionIndex,
      newMarbles,
      validation.capturedMarble
    );
    return result;
  } else {
    // Broadside move: move all marbles simultaneously
    return executeBroadsideMove(selectedPositions, directionIndex, newMarbles);
  }
}

/**
 * Execute in-line move with potential pushing
 */
function executeInlineMove(
  selectedPositions: Position[],
  directionIndex: number,
  marbles: Marble[],
  potentialCapture?: Marble
): { newMarbles: Marble[]; capturedMarble?: Marble } {
  const newMarbles = [...marbles];
  let capturedMarble: Marble | undefined;

  // Sort marbles so we move from front to back (avoid overwriting)
  const sortedPositions = sortPositionsAlongDirection(selectedPositions, directionIndex);
  
  // Move marbles from front to back
  for (let i = sortedPositions.length - 1; i >= 0; i--) {
    const pos = sortedPositions[i];
    const marbleIndex = newMarbles.findIndex((m) => positionsEqual(m.position, pos));
    
    if (marbleIndex !== -1) {
      const newPos = getNeighbor(pos, directionIndex);
      
      // Check if there's an opponent marble to push
      const marbleAheadIndex = newMarbles.findIndex((m) =>
        positionsEqual(m.position, newPos)
      );

      if (marbleAheadIndex !== -1 && newMarbles[marbleAheadIndex].player !== newMarbles[marbleIndex].player) {
        // Push opponent marble(s) recursively
        pushMarbleChain(newPos, directionIndex, newMarbles);
      }

      // Move our marble
      newMarbles[marbleIndex] = {
        ...newMarbles[marbleIndex],
        position: newPos,
      };
    }
  }

  // Handle capture if marble was pushed off board
  if (potentialCapture) {
    const captureIndex = newMarbles.findIndex((m) => m.id === potentialCapture.id);
    if (captureIndex !== -1) {
      const finalPos = newMarbles[captureIndex].position;
      if (!isOnBoard(finalPos)) {
        capturedMarble = newMarbles[captureIndex];
        newMarbles.splice(captureIndex, 1);
      }
    }
  }

  return { newMarbles, capturedMarble };
}

/**
 * Push a chain of marbles in direction
 */
function pushMarbleChain(
  startPos: Position,
  directionIndex: number,
  marbles: Marble[]
): void {
  const marbleIndex = marbles.findIndex((m) => positionsEqual(m.position, startPos));
  if (marbleIndex === -1) return;

  const nextPos = getNeighbor(startPos, directionIndex);
  
  // Recursively push marbles ahead
  const marbleAheadIndex = marbles.findIndex((m) => positionsEqual(m.position, nextPos));
  if (marbleAheadIndex !== -1) {
    pushMarbleChain(nextPos, directionIndex, marbles);
  }

  // Move this marble
  marbles[marbleIndex] = {
    ...marbles[marbleIndex],
    position: nextPos,
  };
}

/**
 * Execute broadside move
 */
function executeBroadsideMove(
  selectedPositions: Position[],
  directionIndex: number,
  marbles: Marble[]
): { newMarbles: Marble[]; capturedMarble?: Marble } {
  const newMarbles = [...marbles];

  // Move all selected marbles simultaneously
  for (const pos of selectedPositions) {
    const marbleIndex = newMarbles.findIndex((m) => positionsEqual(m.position, pos));
    if (marbleIndex !== -1) {
      const newPos = getNeighbor(pos, directionIndex);
      newMarbles[marbleIndex] = {
        ...newMarbles[marbleIndex],
        position: newPos,
      };
    }
  }

  return { newMarbles, capturedMarble: undefined };
}
