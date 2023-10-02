"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import AccountAbstraction from "@safe-global/account-abstraction-kit-poc";
import { Web3AuthModalPack } from "@safe-global/auth-kit";
import Safe, { EthersAdapter } from "@safe-global/protocol-kit";
import {
  MetaTransactionData,
  MetaTransactionOptions,
} from "@safe-global/safe-core-sdk-types";
import { ethers } from "ethers";
import getChain from "../lib/Chains/getchains";
const AccountAbstractionContext = createContext<any>(null);
const clientId: string = (process.env.NEXT_PUBLIC_CLIENT_ID as string) || "";

export const AccountAbstractionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [web3AuthModalPack, setWeb3AuthModalPack] = useState<any>(null);
  const chain = getChain("0x5");
  // owner address
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  // safes owned by the user
  const [safes, setSafes] = useState<string[]>([]);
  const [chainId, setChainId] = useState<any>("");
  const [web3Provider, setWeb3Provider] = useState<any>(null);

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
      const provider = web3AuthModalPack.getProvider(); //as ethers.providers.ExternalProvider;
      // we set react state with the provided values: owner (eoa address), chain, safes owned & web3 provider
      // setChainId(chain.id);
      setOwnerAddress(eoa);
      setSafes(safes || []);
      setWeb3Provider(provider);
      console.log("provider: ", provider);
      console.log("safes: ", safes);
      console.log("eoa: ", eoa);
    } catch (error) {
      console.log("error: ", error);
    }
  }, [safes, web3AuthModalPack]);

  useEffect(() => {
    if (web3AuthModalPack && web3AuthModalPack.getProvider()) {
      (async () => {
        await loginWeb3Auth();
      })();
    }
  }, [web3AuthModalPack, loginWeb3Auth]);
  const logoutWeb3Auth = () => {
    web3AuthModalPack?.signOut();
    setOwnerAddress("");
    setSafes([]);
    // setChainId(chain.id);
    setWeb3Provider(undefined);
    // setSafeSelected("");
    // setGelatoTaskId(undefined);
    // closeMoneriumFlow();
  };

  return (
    <AccountAbstractionContext.Provider
      value={{ ownerAddress, loginWeb3Auth, logoutWeb3Auth }}
    >
      {children}
    </AccountAbstractionContext.Provider>
  );
};

export const useSafeAA = () => useContext(AccountAbstractionContext);
