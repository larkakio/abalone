'use client';

import { useOpenExternalUrl } from '@/hooks/useOpenExternalUrl';

interface ShareButtonProps {
  message?: string;
}

export function ShareButton({ message }: ShareButtonProps) {
  const { openUrl } = useOpenExternalUrl();

  const handleShare = async () => {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || window.location.origin;
    const defaultMessage = 'Just played Abalone on Base! Can you beat me?';
    const shareText = message || defaultMessage;
    
    const shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
      `${shareText}\n\n${appUrl}`
    )}`;

    await openUrl(shareUrl);
  };

  return handleShare;
}
