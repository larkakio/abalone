'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { COLORS } from '@/utils/constants';

interface GameControlsProps {
  onShare?: () => void;
}

export function GameControls({ onShare }: GameControlsProps) {
  const { boardState, resetGame } = useGame();

  return (
    <>
      {/* Bottom controls */}
      <div className="fixed bottom-0 left-0 right-0 pb-safe">
        <motion.div
          className="mx-4 mb-4 rounded-2xl backdrop-blur-xl px-6 py-4 flex items-center justify-between"
          style={{
            background: `${COLORS.deepSpaceBlue}80`,
            border: `1px solid ${COLORS.navyBlue}`,
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Reset button */}
          <motion.button
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              background: `${COLORS.slateGray}40`,
              color: COLORS.pureWhite,
              border: `1px solid ${COLORS.slateGray}`,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
          >
            New Game
          </motion.button>

          {/* Turn indicator */}
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60" style={{ color: COLORS.slateGray }}>
              Turn:
            </span>
            <span className="text-sm font-semibold capitalize" style={{ color: COLORS.electricCyan }}>
              {boardState.currentPlayer}
            </span>
          </div>

          {/* Share button */}
          {onShare && (
            <motion.button
              className="px-4 py-2 rounded-lg font-medium"
              style={{
                background: `linear-gradient(135deg, ${COLORS.cyberBlue}, ${COLORS.electricCyan})`,
                color: COLORS.deepBlack,
              }}
              whileTap={{ scale: 0.95 }}
              onClick={onShare}
            >
              Share
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Win/Loss overlay */}
      <AnimatePresence>
        {boardState.gameStatus !== 'playing' && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: `${COLORS.deepSpaceBlue}E6` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="mx-8 p-8 rounded-3xl text-center"
              style={{
                background: `linear-gradient(135deg, ${COLORS.navyBlue}40, ${COLORS.deepSpaceBlue}80)`,
                border: `2px solid ${COLORS.neonPurple}`,
                backdropFilter: 'blur(20px)',
                boxShadow: `0 0 50px ${COLORS.neonPurple}`,
              }}
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  color: COLORS.neonPurple,
                  textShadow: `0 0 20px ${COLORS.neonPurple}`,
                }}
              >
                {boardState.gameStatus === 'black-won' ? '🏆 Black Wins!' : '🏆 White Wins!'}
              </h2>
              
              <p className="text-lg mb-6" style={{ color: COLORS.slateGray }}>
                {boardState.gameStatus === 'black-won' 
                  ? `Black captured ${boardState.blackCaptured} white marbles!`
                  : `White captured ${boardState.whiteCaptured} black marbles!`
                }
              </p>

              <div className="flex gap-4 justify-center">
                <motion.button
                  className="px-6 py-3 rounded-xl font-semibold"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.cyberBlue}, ${COLORS.electricCyan})`,
                    color: COLORS.deepBlack,
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetGame}
                >
                  Play Again
                </motion.button>

                {onShare && (
                  <motion.button
                    className="px-6 py-3 rounded-xl font-semibold"
                    style={{
                      background: `${COLORS.neonPurple}40`,
                      color: COLORS.pureWhite,
                      border: `1px solid ${COLORS.neonPurple}`,
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onShare}
                  >
                    Share Result
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
