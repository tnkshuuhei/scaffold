"use client";
import "../app/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import React from "react";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { optimismSepolia } from "wagmi/chains";

const config = getDefaultConfig({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains: [optimismSepolia],
  transports: {
    [optimismSepolia.id]: http(
      `https://optimism-sepolia.infura.io/v3/${process.env
        .NEXT_PUBLIC_INFURA_API_KEY!}`
    ),
  },
  ssr: true,
});
const client = new QueryClient();

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={config} reconnectOnMount={true}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
