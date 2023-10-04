"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import getChain from "../lib/Chains/getchains";

const clientId: string = (process.env.NEXT_PUBLIC_CLIENT_ID as string) || "";

const AccountAbstractionContext = createContext<any>(null);
export const AccountAbstractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>(null);

  // initial chain: goerli
  const chain = getChain("0x5");
  // safes owned by the user
  const [safes, setSafes] = useState<string[]>([]);
  // chainId should be selected by the user
  const [chainId, setChainId] = useState<any>("");

  const [web3Provider, setWeb3Provider] = useState<ethers.BrowserProvider>();
  const [signer, setSigner] = useState<any>(undefined);

  useEffect(() => {
    const init = async () => {
      if (!chain) return;
      try {
        const options: Web3AuthOptions = {
          clientId: clientId,
          web3AuthNetwork: "testnet",
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: chain.id,
            rpcTarget: chain.rpcUrl,
          },
          uiConfig: {
            loginMethodsOrder: ["google", "facebook"],
          },
        };

        const modalConfig = {
          [WALLET_ADAPTERS.TORUS_EVM]: {
            label: "torus",
            showOnModal: false,
          },
          [WALLET_ADAPTERS.METAMASK]: {
            label: "metamask",
            showOnDesktop: true,
            showOnMobile: false,
          },
        };

        const openloginAdapter = new OpenloginAdapter({
          loginSettings: {
            mfaLevel: "mandatory",
          },
          adapterSettings: {
            uxMode: "popup",
          },
        });

        const web3AuthModalPack = new Web3AuthModalPack({
          txServiceUrl: chain.transactionServiceUrl,
        });

        await web3AuthModalPack.init({
          options,
          adapters: [openloginAdapter],
          modalConfig,
        });
        setWeb3AuthModalPack(web3AuthModalPack);
        console.log("web3AuthModalPack: ", web3AuthModalPack);
      } catch (error) {
        console.error(error);
      }
    };
    init();
  }, [chain]);

  // auth-kit implementation
  const loginWeb3Auth = useCallback(async () => {
    if (!web3AuthModalPack) return;

    try {
      const { safe, eoa } = await web3AuthModalPack.signIn();
      const provider = new ethers.BrowserProvider(
        web3AuthModalPack.getProvider()
      );
      const signer = provider.getSigner();
      // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
      setChainId(chain?.id);
      setAddress(eoa);
      setSafes(safe || []);
      setWeb3Provider(provider);
      setSigner(signer);
      console.log("provider: ", provider);
      console.log("safes: ", safes);
      console.log("eoa: ", eoa);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [chain?.id, safes, web3AuthModalPack]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await loginWeb3Auth();
      })();
    }
  }, [web3AuthModalPack, loginWeb3Auth]);
  const logoutWeb3Auth = () => {
    web3AuthModalPack?.signOut();
    setAddress("");
    setSafes([]);
    setChainId(chain?.id);
    setWeb3Provider(undefined);
    setSigner(undefined);
  };

  return (
    <AccountAbstractionContext.Provider
      value={{
        address,
        web3Provider,
        signer,
        chainId,
        loginWeb3Auth,
        logoutWeb3Auth,
      }}
    >
      {children}
    </AccountAbstractionContext.Provider>
  );
};

export const useSafeAA = () => useContext(AccountAbstractionContext);
