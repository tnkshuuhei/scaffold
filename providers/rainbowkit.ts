"use client";

import {
  RainbowKitProvider,
  connectorsForWallets,
} from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  particleGoogleWallet,
  particleTwitterWallet,
  particleWallet,
} from "./particleWallet";

export const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        particleGoogleWallet,
        particleTwitterWallet,
        particleWallet,
        metaMaskWallet,
        rainbowWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    appName: "Scaffold",
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  }
);
