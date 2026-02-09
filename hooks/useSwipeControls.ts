'use client';

import { useState, useCallback, useRef, TouchEvent } from 'react';
import { swipeToDirection } from '@/utils/boardUtils';

interface SwipeState {
  isSwiping: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  direction: number | null;
}

interface UseSwipeControlsReturn {
  swipeState: SwipeState;
  handleTouchStart: (e: TouchEvent) => void;
  handleTouchMove: (e: TouchEvent) => void;
  handleTouchEnd: (e: TouchEvent) => void;
}

export function useSwipeControls(
  onSwipeComplete: (direction: number) => void,
  minSwipeDistance: number = 30
): UseSwipeControlsReturn {
  const [swipeState, setSwipeState] = useState<SwipeState>({
    isSwiping: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    direction: null,
  });

  const swipeStartTime = useRef<number>(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0];
    swipeStartTime.current = Date.now();
    
    setSwipeState({
      isSwiping: true,
      startX: touch.clientX,
      startY: touch.clientY,
      currentX: touch.clientX,
      currentY: touch.clientY,
      direction: null,
    });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!swipeState.isSwiping) return;

    const touch = e.touches[0];
    const dx = touch.clientX - swipeState.startX;
    const dy = touch.clientY - swipeState.startY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance >= minSwipeDistance) {
      const direction = swipeToDirection(dx, dy);
      
      setSwipeState((prev) => ({
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY,
        direction,
      }));
    } else {
      setSwipeState((prev) => ({
        ...prev,
        currentX: touch.clientX,
        currentY: touch.clientY,
        direction: null,
      }));
    }
  }, [swipeState.isSwiping, swipeState.startX, swipeState.startY, minSwipeDistance]);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!swipeState.isSwiping) return;

      const dx = swipeState.currentX - swipeState.startX;
      const dy = swipeState.currentY - swipeState.startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const duration = Date.now() - swipeStartTime.current;

      // Check if swipe is valid (minimum distance and reasonable duration)
      if (distance >= minSwipeDistance && duration < 1000) {
        const direction = swipeToDirection(dx, dy);
        onSwipeComplete(direction);
      }

      setSwipeState({
        isSwiping: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        direction: null,
      });
    },
    [swipeState, minSwipeDistance, onSwipeComplete]
  );

  return {
    swipeState,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}
