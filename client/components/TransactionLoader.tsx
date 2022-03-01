import React from "react";
import { css } from "@emotion/react";
import { MoonLoader } from "react-spinners";

const styles = {
  wrapper: `text-white h-96 w-72 flex flex-col justify-center items-center`,
  title: `font-semibold text-xl mb-12`,
};

const cssOverride = css`
  display: block;
  margin: 0 auto;
  border-color: white;
`;

const TransactionLoader = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Transaction in progress</div>
      <MoonLoader css={cssOverride} size={50} loading={true} color={"#fff"} />
    </div>
  );
};

export default TransactionLoader;
