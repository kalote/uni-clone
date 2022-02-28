import React, { useContext } from "react";
import Image from "next/image";
import { RiSettings3Fill } from "react-icons/ri";
import { AiOutlineDown } from "react-icons/ai";
import ethLogo from "../assets/eth.png";
import { TransactionContext } from "../context/transactionContext";

const styles = {
  wrapper: `w-screen flex items-center justify-center mt-14`,
  content: `bg-[#191B1F] w-[40rem] rounded-2xl p-4`,
  formHeader: `px-2 flex items-center justify-between font-semibold text-xl`,
  transferPropContainer: `bg-[#20242A] my-3 rounded-2xl p-6 text-3xl border border-[#20242A] hover:border-[#41444F] flex justify-between`,
  transferPropInput: `bg-transparent placeholder:text-[#B2B9D2] outline-none mb-6 w-full text-2xl`,
  currencySelector: `flex w-1/4`,
  currencySelectorContent: `w-full h-min flex justify-between items-center bg-[#2D2F36] hover:bg-[#41444F] rounded-2xl text-xl font-medium cursor-pointer p-2 mt-[-0.2rem]`,
  currencySelectorIcon: `flex items-center`,
  currencySelectorTicker: `mx-2`,
  currencySelectorArrow: `text-lg`,
  confirmButton: `bg-[#2172E5] my-2 rounded-2xl py-6 px-8 text-xl font-semibold flex items-center justify-center cursor-pointer border border-[#2172E5] hover:border-[#234169]`,
};

const Main = () => {
  const { formData, handleChange, sendTransaction } = useContext(
    TransactionContext
  ) as TxContext;

  const handleSubmit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { addressTo, amount } = formData;
    e.preventDefault();

    if (!addressTo || !amount) return;

    sendTransaction();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.formHeader}>
          <div>Swap</div>
          <div>
            <RiSettings3Fill />
          </div>
        </div>
        <div className={styles.transferPropContainer}>
          <input
            type="text"
            className={styles.transferPropInput}
            placeholder="0.0"
            pattern="^[0-9]*[.,]?[0-9]*$"
            onChange={(e) => handleChange(e, "amount")}
          />
          <div className={styles.currencySelector}>
            <div className={styles.currencySelectorContent}>
              <div className={styles.currencySelectorIcon}>
                <Image
                  src={ethLogo}
                  alt="Ethereum logo"
                  width={20}
                  height={20}
                />
              </div>
              <div className={styles.currencySelectorTicker}>ETH</div>
              <AiOutlineDown className={styles.currencySelectorArrow} />
            </div>
          </div>
        </div>
        <div className={styles.transferPropContainer}>
          <input
            type="text"
            className={styles.transferPropInput}
            placeholder="0x..."
            onChange={(e) => handleChange(e, "addressTo")}
          />
          <div className={styles.currencySelectorTicker}></div>
        </div>
        <div onClick={(e) => handleSubmit(e)} className={styles.confirmButton}>
          Confirm
        </div>
      </div>
    </div>
  );
};

export default Main;
