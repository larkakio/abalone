'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { BoardState, Marble, Player, Position, Move } from '@/utils/types';
import { INITIAL_POSITIONS, MARBLES_TO_WIN } from '@/utils/constants';
import { validateMove, executeMove } from '@/utils/moveValidator';
import { positionsEqual } from '@/utils/boardUtils';

interface GameContextType {
  boardState: BoardState;
  selectedMarbles: Position[];
  selectMarble: (position: Position) => void;
  makeMove: (directionIndex: number) => boolean;
  resetGame: () => void;
  undoMove: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

function createInitialBoard(): BoardState {
  const marbles: Marble[] = [
    ...INITIAL_POSITIONS.black.map((pos, i) => ({
      id: `black-${i}`,
      position: pos,
      player: 'black' as Player,
    })),
    ...INITIAL_POSITIONS.white.map((pos, i) => ({
      id: `white-${i}`,
      position: pos,
      player: 'white' as Player,
    })),
  ];

  return {
    marbles,
    currentPlayer: 'black',
    blackCaptured: 0,
    whiteCaptured: 0,
    moveHistory: [],
    gameStatus: 'playing',
  };
}

export function GameProvider({ children }: { children: ReactNode }) {
  const [boardState, setBoardState] = useState<BoardState>(createInitialBoard());
  const [selectedMarbles, setSelectedMarbles] = useState<Position[]>([]);

  const selectMarble = useCallback(
    (position: Position) => {
      // Check if marble belongs to current player
      const marble = boardState.marbles.find((m) => positionsEqual(m.position, position));
      
      if (!marble || marble.player !== boardState.currentPlayer) {
        setSelectedMarbles([]);
        return;
      }

      // Toggle selection
      const isSelected = selectedMarbles.some((pos) => positionsEqual(pos, position));
      
      if (isSelected) {
        setSelectedMarbles(selectedMarbles.filter((pos) => !positionsEqual(pos, position)));
      } else {
        // Add to selection (max 3 marbles)
        if (selectedMarbles.length < 3) {
          setSelectedMarbles([...selectedMarbles, position]);
        } else {
          // Replace selection with new marble
          setSelectedMarbles([position]);
        }
      }
    },
    [boardState.marbles, boardState.currentPlayer, selectedMarbles]
  );

  const makeMove = useCallback(
    (directionIndex: number): boolean => {
      if (selectedMarbles.length === 0 || boardState.gameStatus !== 'playing') {
        return false;
      }

      // Validate move
      const validation = validateMove(
        selectedMarbles,
        directionIndex,
        boardState.marbles,
        boardState.currentPlayer
      );

      if (!validation.valid) {
        console.log('Invalid move:', validation.reason);
        return false;
      }

      // Execute move
      const { newMarbles, capturedMarble } = executeMove(
        selectedMarbles,
        directionIndex,
        boardState.marbles,
        validation
      );

      // Update board state
      const newBlackCaptured = boardState.blackCaptured + (capturedMarble?.player === 'black' ? 1 : 0);
      const newWhiteCaptured = boardState.whiteCaptured + (capturedMarble?.player === 'white' ? 1 : 0);

      // Check win condition
      let gameStatus: BoardState['gameStatus'] = 'playing';
      if (newBlackCaptured >= MARBLES_TO_WIN) {
        gameStatus = 'white-won';
      } else if (newWhiteCaptured >= MARBLES_TO_WIN) {
        gameStatus = 'black-won';
      }

      const move: Move = {
        marbles: selectedMarbles,
        direction: directionIndex,
        timestamp: Date.now(),
        captured: capturedMarble,
      };

      setBoardState({
        marbles: newMarbles,
        currentPlayer: boardState.currentPlayer === 'black' ? 'white' : 'black',
        blackCaptured: newBlackCaptured,
        whiteCaptured: newWhiteCaptured,
        moveHistory: [...boardState.moveHistory, move],
        gameStatus,
      });

      setSelectedMarbles([]);
      return true;
    },
    [selectedMarbles, boardState]
  );

  const resetGame = useCallback(() => {
    setBoardState(createInitialBoard());
    setSelectedMarbles([]);
  }, []);

  const undoMove = useCallback(() => {
    // TODO: Implement undo functionality
    console.log('Undo not yet implemented');
  }, []);

  return (
    <GameContext.Provider
      value={{
        boardState,
        selectedMarbles,
        selectMarble,
        makeMove,
        resetGame,
        undoMove,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
}
