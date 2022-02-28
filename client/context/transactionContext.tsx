import { ethers } from "ethers";
import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../lib/constants";

export const TransactionContext = React.createContext<TxContext | null>(null);

let eth: any;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionContract;
};

export const TransactionProvider: React.FC<React.ReactNode> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<SwapData>({
    addressTo: "",
    amount: "",
  });

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

  const sendTransaction = async (
    metamask = eth,
    connectedAccount = currentAccount
  ) => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await metamask.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: connectedAccount,
            to: addressTo,
            gas: "0x7EF40",
            value: parsedAmount._hex,
          },
        ],
      });
      const transactionHash = transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        "TRANSFER"
      );
      setIsLoading(true);
      await transactionHash.wait();
      // await saveTransaction(
      //   transactionHash.hash,
      //   amount,
      //   connectedAccount,
      //   addressTo
      // );
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    e: React.FormEvent<HTMLInputElement>,
    type: string
  ): void => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: (e.target as HTMLInputElement).value,
    }));
  };

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
