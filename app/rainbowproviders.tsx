"use client";
import "@rainbow-me/rainbowkit/styles.css";
import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  rabbyWallet,
  ledgerWallet,
  tahoWallet,
  zerionWallet,
  uniswapWallet,
} from "@rainbow-me/rainbowkit/wallets";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  zora,
  polygonZkEvm,
  sepolia,
  optimismGoerli,
  base,
  polygonZkEvmTestnet,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    base,
    zora,
    polygonZkEvm,
    sepolia,
    optimismGoerli,
    polygonZkEvmTestnet,
  ],
  [publicProvider()]
);
const appName: string = "RainbowKit scaffolding";
const AppInfo = { appName: appName, appURL: "" };
const projectId: string = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const { wallets } = getDefaultWallets({
  appName: appName,
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      rabbyWallet({ chains }),
      ledgerWallet({ chains, projectId }),
      tahoWallet({ chains }),
      zerionWallet({ chains, projectId }),
      uniswapWallet({ chains, projectId }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export function RainbowProviders({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={AppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
