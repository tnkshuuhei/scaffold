"use client";
import React from "react";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthCoreContextProvider } from "@particle-network/auth-core-modal";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig } from "@/providers/wagmiConfig";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";

const client = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* delete if you don't want to use particle auth */}
        <AuthCoreContextProvider
          options={{
            projectId: "34c6b829-5b89-44e8-90a9-6d982787b9c9",
            clientKey: "c6Z44Ml4TQeNhctvwYgdSv6DBzfjf6t6CB0JDscR",
            appId: "ded98dfe-71f9-4af7-846d-5d8c714d63b0",
            // projectId: process.env.NEXT_PUBLIC_PARTICLE_PROJECT_ID!,
            // clientKey: process.env.NEXT_PUBLIC_PARTICLE_CLIENT_KEY!,
            // appId: process.env.NEXT_PUBLIC_PARTICLE_APP_ID!,
            customStyle: {
              zIndex: 2147483650, // must greater than 2147483646
            },
          }}
        >
          <WagmiProvider config={wagmiConfig} reconnectOnMount={true}>
            <QueryClientProvider client={client}>
              <RainbowKitProvider initialChain={wagmiConfig.chains[0]}>
                <Header />
                <Toaster />
                {children}
              </RainbowKitProvider>
            </QueryClientProvider>
          </WagmiProvider>
        </AuthCoreContextProvider>
      </body>
    </html>
  );
}
