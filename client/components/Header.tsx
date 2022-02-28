import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { AiOutlineDown } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ethLogo from "../assets/eth.png";
import uniswapLogo from "../assets/uniswap.png";
import { TransactionContext } from "../context/transactionContext";

const styles = {
  wrapper: `p-4 w-screen flex justify-between items-center`,
  headerLogo: `flex w-1/4 items-center justify-start`,
  nav: `flex-1 flex justify-center items-center`,
  navItemsContainer: `flex bg-[#191B1F] rounded-3xl`,
  navItem: `px-4 py-2 m-1 flex items-center text-lg font-semibold text-[0.9rem] cursor-pointer rounded-3xl`,
  activeItem: `bg-[#20242A]`,
  buttonContainer: `flex w-1/4 items-center justify-end`,
  button: `flex items-center bg-[#191B1F] rounded-2xl mx-2 font-semibold text-[0.9rem] cursor-pointer`,
  buttonPadding: `p-2`,
  buttonTextContainer: `h-8 flex items-center`,
  buttonIconContainer: `flex items-center justify-center w-8 h-8`,
  buttonAccent: `bg-[#172A42] border border-[#163256] hover:border-[#234169] h-full rounded-2xl flex items-center justify-center text-[#4F90EA]`,
};

const Header = () => {
  const [selectedNav, setSelectedNav] = useState("swap");
  const [username, setUsername] = useState<string>("");
  const { connectWallet, currentAccount } = useContext(
    TransactionContext
  ) as TxContext;

  useEffect(() => {
    if (!currentAccount) return;
    setUsername(
      `${currentAccount.substring(0, 4)} ... ${currentAccount.slice(-3)}`
    );
  }, [currentAccount]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.headerLogo}>
        <Image src={uniswapLogo} alt="uniswap" height={40} width={40} />
      </div>
      <div className={styles.nav}>
        <div className={styles.navItemsContainer}>
          <div
            onClick={() => setSelectedNav("swap")}
            className={`${styles.navItem} ${
              selectedNav === "swap" && styles.activeItem
            }`}
          >
            Swap
          </div>
          <div
            onClick={() => setSelectedNav("swap")}
            className={`${styles.navItem} ${
              selectedNav === "pool" && styles.activeItem
            }`}
          >
            Pool
          </div>
          <div
            onClick={() => setSelectedNav("swap")}
            className={`${styles.navItem} ${
              selectedNav === "vote" && styles.activeItem
            }`}
          >
            Vote
          </div>
          <a href="https://info.uniswap.org/" target="_blank" rel="noreferrer">
            <div className={styles.navItem}>
              Charts <FiArrowUpRight />
            </div>
          </a>
        </div>
      </div>
      <div className={styles.buttonContainer}>
        <div className={`${styles.button} ${styles.buttonPadding}`}>
          <div className={styles.buttonIconContainer}>
            <Image src={ethLogo} alt="ethereum" width={20} height={20} />
          </div>
          <p>Ethereum</p>
          <div className={styles.buttonIconContainer}>
            <AiOutlineDown />
          </div>
        </div>
        {currentAccount ? (
          <div className={`${styles.button} ${styles.buttonPadding}`}>
            <div className={styles.buttonTextContainer}>{username}</div>
          </div>
        ) : (
          <div
            onClick={() => connectWallet()}
            className={`${styles.button} ${styles.buttonPadding}`}
          >
            <div className={`${styles.buttonAccent} ${styles.buttonPadding}`}>
              Connect Wallet
            </div>
          </div>
        )}

        <div className={`${styles.button} ${styles.buttonPadding}`}>
          <div className={`${styles.buttonIconContainer} mx-2`}>
            <HiOutlineDotsVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
