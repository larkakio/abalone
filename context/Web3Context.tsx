"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { type ReactNode, useState } from "react";
import { WagmiProvider } from "wagmi";
import { DailyCheckIn } from "@/components/DailyCheckIn";
import { WrongNetworkBanner } from "@/components/WrongNetworkBanner";
import { wagmiConfig } from "@/app/wagmi.config";

export function Web3Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <WrongNetworkBanner />
        {children}
        <DailyCheckIn />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
