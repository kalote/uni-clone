/// <reference types="next" />
/// <reference types="next/image-types/global" />

interface Window {
  ethereum: any;
}

interface SwapData {
  addressTo: string;
  amount: string;
}

interface TxContext {
  connectWallet: (metamask?: Window.ethereum) => Promise<void>;
  currentAccount: string;
  sendTransaction: (metamask?: any, connectedAccount?: string) => Promise<void>;
  handleChange: (e: React.FormEvent<HTMLInputElement>, type: string) => void;
  formData: SwapData;
  isLoading: boolean;
}

interface TxItem {
  amount: string;
  toAddress: string;
  timestamp: string;
  txHash: string;
}
