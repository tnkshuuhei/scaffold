"use client";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, http } from "wagmi";
import { optimismSepolia } from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";

import React from "react";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";

const config = getDefaultConfig({
  appName: "Scaffold",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider>
              <Header />
              <Toaster />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
