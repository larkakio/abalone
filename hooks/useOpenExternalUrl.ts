"use client";

/** Opens external URLs in a new tab (Base App standard web). */
export function useOpenExternalUrl() {
  const openUrl = async (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return { openUrl };
}
