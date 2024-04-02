import { http, createConfig } from "wagmi";
import { optimism, optimismSepolia } from "wagmi/chains";
import { connectors } from "./rainbowkit";

export const wagmiConfig = createConfig({
  connectors, // disable if you don't want to use Particle Auth
  chains: [
    optimism,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [optimismSepolia]
      : []),
  ],
  transports: {
    [optimism.id]: http(
      `https://optimism-mainnet.infura.io/v3/${process.env
        .NEXT_PUBLIC_INFURA_API_KEY!}`
    ),
    [optimismSepolia.id]: http(
      `https://optimism-sepolia.infura.io/v3/${process.env
        .NEXT_PUBLIC_INFURA_API_KEY!}`
    ),
  },
  ssr: true,
});
