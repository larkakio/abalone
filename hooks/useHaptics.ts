'use client';

import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error';

export function useHaptics() {
  const triggerHaptic = useCallback((type: HapticType) => {
    // Check if haptic feedback is supported
    if (!('vibrate' in navigator)) {
      return;
    }

    const patterns: Record<HapticType, number | number[]> = {
      light: 10,
      medium: 20,
      heavy: 30,
      success: [10, 50, 10],
      warning: [20, 100, 20],
      error: [50, 100, 50, 100, 50],
    };

    const pattern = patterns[type];
    
    if (Array.isArray(pattern)) {
      navigator.vibrate(pattern);
    } else {
      navigator.vibrate(pattern);
    }
  }, []);

  return {
    hapticLight: () => triggerHaptic('light'),
    hapticMedium: () => triggerHaptic('medium'),
    hapticHeavy: () => triggerHaptic('heavy'),
    hapticSuccess: () => triggerHaptic('success'),
    hapticWarning: () => triggerHaptic('warning'),
    hapticError: () => triggerHaptic('error'),
  };
}
