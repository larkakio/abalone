'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { COLORS, MARBLES_TO_WIN } from '@/utils/constants';

export function ScoreDisplay() {
  const { boardState } = useGame();

  return (
    <div className="flex items-center justify-between w-full px-6 py-4">
      {/* Black player score */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: COLORS.deepBlack,
            border: `2px solid ${boardState.currentPlayer === 'black' ? COLORS.cyberBlue : COLORS.slateGray}`,
            boxShadow: boardState.currentPlayer === 'black' ? `0 0 15px ${COLORS.cyberBlue}` : 'none',
          }}
        />
        <div className="flex flex-col">
          <span className="text-xs opacity-60" style={{ color: COLORS.slateGray }}>
            Black
          </span>
          <span className="text-lg font-bold" style={{ color: COLORS.pureWhite }}>
            {boardState.blackCaptured} / {MARBLES_TO_WIN}
          </span>
        </div>
      </motion.div>

      {/* VS divider */}
      <motion.div
        className="px-4 py-1 rounded-full text-sm font-semibold"
        style={{
          background: `${COLORS.neonPurple}20`,
          color: COLORS.electricCyan,
          border: `1px solid ${COLORS.neonPurple}40`,
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        VS
      </motion.div>

      {/* White player score */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="flex flex-col items-end">
          <span className="text-xs opacity-60" style={{ color: COLORS.slateGray }}>
            White
          </span>
          <span className="text-lg font-bold" style={{ color: COLORS.pureWhite }}>
            {boardState.whiteCaptured} / {MARBLES_TO_WIN}
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full"
          style={{
            background: COLORS.pureWhite,
            border: `2px solid ${boardState.currentPlayer === 'white' ? COLORS.electricCyan : COLORS.slateGray}`,
            boxShadow: boardState.currentPlayer === 'white' ? `0 0 15px ${COLORS.electricCyan}` : 'none',
          }}
        />
      </motion.div>
    </div>
  );
}
