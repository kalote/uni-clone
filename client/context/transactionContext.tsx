import React, { useState, useEffect, Children } from "react";

export const TransactionContext = React.createContext<TxContext | null>(null);

let eth: any;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const TransactionProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWallet = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.error(error);
      throw new Error("No ethereum object.");
    }
  };
  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
