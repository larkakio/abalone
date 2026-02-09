'use client';

import { useEffect } from 'react';

export function FarcasterReady() {
  useEffect(() => {
    // Dynamic import to avoid SSR issues
    import('@farcaster/miniapp-sdk')
      .then(({ sdk }) => {
        sdk.actions.ready().catch(() => {
          console.log('Farcaster SDK ready() failed - might be outside Farcaster app');
        });
      })
      .catch(() => {
        console.log('Farcaster SDK not available');
      });
  }, []);

  return null;
}
