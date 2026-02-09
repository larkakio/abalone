'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { Marble } from './Marble';
import { getAllBoardPositions, positionToPixel, positionsEqual } from '@/utils/boardUtils';
import { useSwipeControls } from '@/hooks/useSwipeControls';
import { useHaptics } from '@/hooks/useHaptics';
import { COLORS } from '@/utils/constants';
import { Position } from '@/utils/types';

export function GameBoard() {
  const { boardState, selectedMarbles, selectMarble, makeMove } = useGame();
  const { hapticLight, hapticSuccess, hapticError } = useHaptics();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Calculate board dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const hexSize = Math.min(dimensions.width, dimensions.height) / 12;
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;

  const handleSwipeComplete = (direction: number) => {
    if (selectedMarbles.length === 0) {
      hapticError();
      return;
    }

    const success = makeMove(direction);
    if (success) {
      hapticSuccess();
    } else {
      hapticError();
    }
  };

  const { swipeState, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useSwipeControls(handleSwipeComplete, 40);

  const handleMarbleClick = (position: Position) => {
    hapticLight();
    selectMarble(position);
  };

  const allPositions = getAllBoardPositions();

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full touch-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <defs>
          {/* Hexagon pattern for board spaces */}
          <filter id="board-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Draw board spaces */}
        {allPositions.map((pos, i) => {
          const { x, y } = positionToPixel(pos, hexSize, centerX, centerY);
          const radius = hexSize * 0.4;

          return (
            <motion.circle
              key={`space-${i}`}
              cx={x}
              cy={y}
              r={radius}
              fill="none"
              stroke={COLORS.navyBlue}
              strokeWidth={1.5}
              opacity={0.4}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.005, duration: 0.3 }}
            />
          );
        })}

        {/* Draw marbles */}
        {boardState.marbles.map((marble) => {
          const isSelected = selectedMarbles.some((pos) =>
            positionsEqual(pos, marble.position)
          );

          return (
            <Marble
              key={marble.id}
              position={marble.position}
              player={marble.player}
              isSelected={isSelected}
              hexSize={hexSize}
              centerX={centerX}
              centerY={centerY}
              onClick={() => handleMarbleClick(marble.position)}
            />
          );
        })}

        {/* Draw swipe direction indicator */}
        {swipeState.isSwiping && swipeState.direction !== null && selectedMarbles.length > 0 && (
          <motion.line
            x1={swipeState.startX}
            y1={swipeState.startY}
            x2={swipeState.currentX}
            y2={swipeState.currentY}
            stroke={COLORS.electricCyan}
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
          />
        )}
      </svg>

      {/* Swipe hint overlay */}
      {selectedMarbles.length > 0 && !swipeState.isSwiping && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full"
          style={{
            background: `${COLORS.cyberBlue}20`,
            border: `1px solid ${COLORS.cyberBlue}`,
            backdropFilter: 'blur(10px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <p className="text-sm" style={{ color: COLORS.electricCyan }}>
            Swipe to move
          </p>
        </motion.div>
      )}
    </div>
  );
}
