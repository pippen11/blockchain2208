import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

declare module 'web3/dist/web3.min'
