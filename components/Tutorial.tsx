'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '@/utils/constants';

interface TutorialStep {
  title: string;
  description: string;
  icon: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Welcome to Abalone',
    description: 'Push 6 opponent marbles off the board to win!',
    icon: '🎯',
  },
  {
    title: 'Select Marbles',
    description: 'Tap your marbles to select them (up to 3 in a line)',
    icon: '👆',
  },
  {
    title: 'Swipe to Move',
    description: 'Swipe in any direction to move your selected marbles',
    icon: '👉',
  },
  {
    title: 'Push Opponents',
    description: '3 marbles push 2 or 1, 2 marbles push 1 (Sumito rule)',
    icon: '💪',
  },
  {
    title: 'Control the Center',
    description: 'Stay connected and control the center for maximum mobility',
    icon: '⭐',
  },
];

export function Tutorial({ onComplete }: { onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsVisible(false);
      setTimeout(() => onComplete(), 300);
    }
  };

  const handleSkip = () => {
    setIsVisible(false);
    setTimeout(() => onComplete(), 300);
  };

  const step = tutorialSteps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          style={{ background: `${COLORS.deepSpaceBlue}F0` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md p-8 rounded-3xl"
            style={{
              background: `linear-gradient(135deg, ${COLORS.navyBlue}60, ${COLORS.deepSpaceBlue}90)`,
              border: `2px solid ${COLORS.cyberBlue}`,
              backdropFilter: 'blur(20px)',
              boxShadow: `0 0 40px ${COLORS.cyberBlue}40`,
            }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            key={currentStep}
          >
            {/* Icon */}
            <motion.div
              className="text-6xl mb-6 text-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              {step.icon}
            </motion.div>

            {/* Title */}
            <h2
              className="text-2xl font-bold mb-4 text-center"
              style={{
                color: COLORS.electricCyan,
                textShadow: `0 0 10px ${COLORS.electricCyan}40`,
              }}
            >
              {step.title}
            </h2>

            {/* Description */}
            <p
              className="text-center mb-8 leading-relaxed"
              style={{ color: COLORS.slateGray }}
            >
              {step.description}
            </p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mb-6">
              {tutorialSteps.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{
                    background: i === currentStep ? COLORS.electricCyan : COLORS.slateGray,
                    opacity: i === currentStep ? 1 : 0.3,
                  }}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <motion.button
                className="flex-1 py-3 rounded-xl font-semibold"
                style={{
                  background: `${COLORS.slateGray}40`,
                  color: COLORS.pureWhite,
                  border: `1px solid ${COLORS.slateGray}`,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSkip}
              >
                Skip
              </motion.button>

              <motion.button
                className="flex-1 py-3 rounded-xl font-semibold"
                style={{
                  background: `linear-gradient(135deg, ${COLORS.cyberBlue}, ${COLORS.electricCyan})`,
                  color: COLORS.deepBlack,
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
              >
                {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Start Playing'}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
