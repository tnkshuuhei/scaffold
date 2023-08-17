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
  safeWallet,
  tahoWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  zora,
  optimismGoerli,
  sepolia,
  base,
} from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, base, zora, sepolia, optimismGoerli],
  [publicProvider()]
);
const appName: string = "RainbowKit scaffolding";
const AppInfo = { appName: appName, appURL: "" };
const projectId: string = "1566a0356dfc3960638ac92753ed3c43";
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
      safeWallet({ chains }),
      tahoWallet({ chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});
export function Providers({ children }: { children: React.ReactNode }) {
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
