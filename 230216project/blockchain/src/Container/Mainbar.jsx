import { useState } from "react";
import MainbarComponent from "../Components/Mainbar";

const MainbarContainer = () => {
  const [accounts, setAccounts] = useState(null);
  const [count, setCount] = useState(0);
  const [Balance, setBalance] = useState(0);
  // console.log(accounts);
  let isConnect = () => {
    if (window.ethereum) {
      const isConnected = window.ethereum.isConnected();
      console.log(isConnected);
      // window.ethereum.on("connect", async (connectInfo) => {
      //   console.log(connectInfo);
      // });
    }
  };
  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    // console.log(chainId);
    return chainId;
  };
  const getRequestAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      // console.log(accounts);
      setAccounts(accounts);
      await getBalance(accounts);
    } catch (error) {
      console.error("error");
    }
  };
  console.log(accounts);
  // if (accounts) {
  const getBalance = async (accounts) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: accounts,
    });
    setBalance(parseInt(balance, 16) / Math.pow(10, 18));
  };
  // }
  console.log(Balance);

  window.ethereum.on("accountsChanged", async (accounts) => {
    console.log(accounts);
    await getBalance(accounts);
  });

  return (
    <MainbarComponent
      getChainId={getChainId}
      isConnect={isConnect}
      getRequestAccounts={getRequestAccounts}
      accounts={accounts}
      Balance={Balance}
    ></MainbarComponent>
  );
};

export default MainbarContainer;
