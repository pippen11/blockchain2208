import { useState } from "react";
import Web3 from "web3";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);

  const getWeb3 = async () => {
    const web3 = new Web3(window.ethereum);
  };
};
