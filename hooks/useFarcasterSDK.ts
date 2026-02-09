'use client';

import { useState, useEffect } from 'react';

interface FarcasterUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

interface UseFarcasterSDKReturn {
  user: FarcasterUser | null;
  isReady: boolean;
  openUrl: (url: string) => Promise<void>;
  close: () => Promise<void>;
}

export function useFarcasterSDK(): UseFarcasterSDKReturn {
  const [user, setUser] = useState<FarcasterUser | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [sdk, setSdk] = useState<any>(null);

  useEffect(() => {
    import('@farcaster/miniapp-sdk')
      .then(({ sdk: farcasterSdk }) => {
        setSdk(farcasterSdk);
        setIsReady(true);

        // Get user context
        farcasterSdk.context
          .then((ctx: any) => {
            if (ctx.user) {
              setUser({
                fid: ctx.user.fid,
                username: ctx.user.username,
                displayName: ctx.user.displayName,
                pfpUrl: ctx.user.pfpUrl,
              });
            }
          })
          .catch(() => {
            console.log('Failed to get Farcaster context');
          });
      })
      .catch(() => {
        console.log('Farcaster SDK not available');
      });
  }, []);

  const openUrl = async (url: string) => {
    try {
      if (sdk?.actions?.openUrl) {
        await sdk.actions.openUrl(url);
      } else {
        window.open(url, '_blank');
      }
    } catch {
      window.open(url, '_blank');
    }
  };

  const close = async () => {
    try {
      if (sdk?.actions?.close) {
        await sdk.actions.close();
      }
    } catch {
      console.log('Failed to close mini app');
    }
  };

  return {
    user,
    isReady,
    openUrl,
    close,
  };
}
