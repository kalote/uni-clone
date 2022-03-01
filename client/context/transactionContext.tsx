import { ethers } from "ethers";
import Router from "next/router";
import React, { useState, useEffect } from "react";
import { contractABI, contractAddress } from "../lib/constants";
import { client } from "../lib/sanityClient";
import { useRouter } from "next/router";

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

  const router = useRouter();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    if (isLoading) {
      router.push(`/?loading=${currentAccount}`);
    } else {
      router.push("/");
    }
  }, [isLoading]);

  useEffect(() => {
    if (!currentAccount) return;
    !(async () => {
      const userDoc = {
        _type: "users",
        _id: currentAccount,
        username: "Unnamed",
        address: currentAccount,
      };

      await client.createIfNotExists(userDoc);
    })();
  }, [currentAccount]);

  const connectWallet = async (metamask = eth): Promise<void> => {
    try {
      if (!metamask) return alert("install MetaMask!");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
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
      const transactionHash = await transactionContract.publishTransaction(
        addressTo,
        parsedAmount,
        `Transferring ETH ${parsedAmount} to ${addressTo}`,
        "TRANSFER"
      );
      setIsLoading(true);
      await transactionHash.wait();
      await saveTransaction(
        transactionHash.hash,
        amount,
        connectedAccount,
        addressTo
      );
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const saveTransaction = async (
    txHash: string,
    amount: string,
    fromAddress = currentAccount,
    toAddress: string
  ): Promise<void> => {
    const txDoc = {
      _type: "transactions",
      _id: txHash,
      fromAddress: fromAddress,
      toAddress: toAddress,
      timestamp: new Date(Date.now()).toISOString(),
      txHash: txHash,
      amount: parseFloat(amount),
    };

    await client.createIfNotExists(txDoc);

    await client
      .patch(currentAccount)
      .setIfMissing({ transactions: [] })
      .insert("after", "transactions[-1]", [
        {
          _key: txHash,
          _ref: txHash,
          _type: "reference",
        },
      ])
      .commit();

    return;
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
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
