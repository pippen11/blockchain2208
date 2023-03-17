import React, { useEffect, useState } from "react";
import Web3 from "web3";

export const useAccount = () => {
  const [account, setAccount] = useState<string>("");

  const getAccount = async () => {
    let account: string;
    try {
      [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setAccount(account);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (window.ethereum) getAccount();
  }, []);

  return { account };
};
