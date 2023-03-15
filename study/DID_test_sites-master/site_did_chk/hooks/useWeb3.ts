import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [account, setAccount] = useState();
  const [web3, setWeb3] = useState<Web3>();

  const getAccount = async () => {
    if (!window.ethereum) return;
    // console.log(accounts[0]);

    const address: any = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(address[0]);

    const web3 = new Web3(window.ethereum as any);
    setWeb3(web3);
  };

  useEffect(() => {
    if (!window.ethereum) return;
    getAccount();
    window.ethereum.on("accountsChanged", getAccount);

    return () => {
      window.ethereum?.removeListener("accountsChanged", getAccount);
    };
  }, []);

  return { account, web3 };
};

export default useWeb3;
