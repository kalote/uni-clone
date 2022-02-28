/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface Window {
  ethereum: any;
}

interface TxContext {
  connectWallet: (metamask?: Window.ethereum) => Promise<void>;
  currentAccount: string;
}
