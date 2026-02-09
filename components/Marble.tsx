'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Player, Position } from '@/utils/types';
import { positionToPixel } from '@/utils/boardUtils';
import { COLORS } from '@/utils/constants';

interface MarbleProps {
  position: Position;
  player: Player;
  isSelected: boolean;
  hexSize: number;
  centerX: number;
  centerY: number;
  onClick: () => void;
}

export function Marble({
  position,
  player,
  isSelected,
  hexSize,
  centerX,
  centerY,
  onClick,
}: MarbleProps) {
  const { x, y } = positionToPixel(position, hexSize, centerX, centerY);
  const marbleRadius = hexSize * 0.35;

  const marbleColor = player === 'black' ? COLORS.deepBlack : COLORS.pureWhite;
  const glowColor = player === 'black' ? COLORS.cyberBlue : COLORS.electricCyan;

  return (
    <motion.g
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.15 : 1, 
        opacity: 1 
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 20 
      }}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      {/* Glow effect when selected */}
      {isSelected && (
        <motion.circle
          cx={x}
          cy={y}
          r={marbleRadius + 8}
          fill="none"
          stroke={glowColor}
          strokeWidth={3}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Main marble body */}
      <motion.circle
        cx={x}
        cy={y}
        r={marbleRadius}
        fill={marbleColor}
        filter={isSelected ? `url(#glow-${player})` : undefined}
      />

      {/* Highlight for 3D effect */}
      <motion.ellipse
        cx={x - marbleRadius * 0.3}
        cy={y - marbleRadius * 0.3}
        rx={marbleRadius * 0.3}
        ry={marbleRadius * 0.2}
        fill="white"
        opacity={player === 'white' ? 0.3 : 0.2}
      />

      {/* Subtle gradient overlay */}
      <defs>
        <radialGradient id={`marble-gradient-${player}`}>
          <stop offset="0%" stopColor="white" stopOpacity="0.3" />
          <stop offset="100%" stopColor="black" stopOpacity="0.1" />
        </radialGradient>
        
        <filter id={`glow-${player}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </motion.g>
  );
}
