"use client";
import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./ui/toggle-mode";
import { Button } from "./ui/button";
import { useSafeAA } from "@/hooks/AccountAbstractionContext";

const Header = () => {
  const { loginWeb3Auth, logoutWeb3Auth, ownerAddress } = useSafeAA();
  // 0xa6Fd859Eff69aE7EB5EfcC7e2576f39fed87B1b4
  return (
    <div>
      <nav className=" border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link href="/" className="flex items-center">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </Link>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  href="/"
                  className="block py-2 pr-4 pl-3 text-gray-700 bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/user"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Account
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/tnkshuuhei"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
          <div className="flex items-center lg:order-2 gap-4">
            {/* <ConnectButton
              showBalance={false}
              accountStatus={{ smallScreen: "address", largeScreen: "full" }}
            /> */}
            {ownerAddress ? (
              <Button onClick={logoutWeb3Auth}>Disconnect</Button>
            ) : (
              <Button onClick={loginWeb3Auth}>Connect</Button>
            )}
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
