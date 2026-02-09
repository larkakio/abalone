'use client';

import { useState } from 'react';
import { FarcasterReady } from '@/components/FarcasterReady';
import { GameBoard } from '@/components/GameBoard';
import { ScoreDisplay } from '@/components/ScoreDisplay';
import { GameControls } from '@/components/GameControls';
import { Tutorial } from '@/components/Tutorial';
import { useFarcasterSDK } from '@/hooks/useFarcasterSDK';
import { COLORS } from '@/utils/constants';

export default function Home() {
  const [showTutorial, setShowTutorial] = useState(true);
  const { openUrl } = useFarcasterSDK();

  const handleShare = async () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
      `Just played Abalone on Base! 🎯 Can you beat me?\n\n${appUrl}`
    )}`;
    await openUrl(shareUrl);
  };

  return (
    <>
      <FarcasterReady />
      
      {showTutorial && <Tutorial onComplete={() => setShowTutorial(false)} />}
      
      <main
        className="flex flex-col h-screen w-screen overflow-hidden"
        style={{ background: COLORS.deepSpaceBlue }}
      >
        {/* Top bar with score */}
        <div className="flex-shrink-0 pt-safe">
          <ScoreDisplay />
        </div>

        {/* Game board - takes remaining space */}
        <div className="flex-1 overflow-hidden">
          <GameBoard />
        </div>

        {/* Bottom controls */}
        <GameControls onShare={handleShare} />
      </main>
    </>
  );
}
