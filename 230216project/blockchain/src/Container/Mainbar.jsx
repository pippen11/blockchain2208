import { useEffect, useState } from "react";
import MainbarComponent from "../Components/Mainbar";
import axios from "axios";

const MainbarContainer = () => {
  const [accounts, setAccounts] = useState(null);
  const [count, setCount] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [chainIds, setChainids] = useState(0);

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
  // const disconnect = () => {
  //   const disConnected = window.ethereum.disConnected();
  //   console.log(disConnected);
  // };

  // const addNetwork = async (_chainId) => {
  //   // 메타마스크에서 네트워크 추가를 할 때 들어가는 속성들
  //   const network = {
  //     chainId: _chainId,
  //     chainName: "test",
  //     rpcUrls: ["http://127.0.0.1:8081"],
  //     nativeCurrency: {
  //       name: "Ethereum",
  //       symbol: "ETH", // 통화 단위
  //       decimals: 18, // 소수점 자리수
  //     },
  //   };

  //   await window.ethereum.request({
  //     method: "wallet_addEthereumChain",
  //     params: [network],
  //   });
  // };

  const getChainId = async () => {
    const chainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    setChainids(chainId);
    // console.log(chainId);
    return chainId;
  };

  // getChainId();
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
      alert("메타마스크 지갑 연결해주세요");
    }
  };
  // console.log(accounts);
  // if (accounts) {
  const getBalance = async (accounts) => {
    const balance = await window.ethereum.request({
      method: "eth_getBalance",
      params: accounts,
    });
    setBalance(parseInt(balance, 16) / Math.pow(10, 18));
  };
  // }
  // console.log(Balance);

  window.ethereum.on("accountsChanged", async (accounts) => {
    // console.log(accounts[0]);
    await getBalance(accounts);
  });

  // window.ethereum.on("disconncect", async (error) => {
  //   console.error("error");
  // });

  const sendTransaction = async (account, eth) => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(account);
      let from = accounts[0];
      const value = "0x" + (+eth * Math.pow(10, 18)).toString(16);
      console.log(value);
      console.log(from);

      const sendeth = await window.ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from,
            to: account,
            value,
          },
        ],
      });
      await getBalance([from]);

      // const data = await axios.post("http://localhost:8080/api/miner/start", {
      //   transactionminer: from,
      // });

      // console.log(data.data);

      // setAccounts(accounts);

      // await getBalance(accounts);
    } catch (error) {
      console.error("error");
    }

    // console.log(window.ethereum);
    // const init = async () => {
    //   try {
    //     const targetChainId = "0x3c";
    //     const chainId = await getChainId(); // 1234 , hex: 0x4d2
    //     console.log("체인 아이디 : ", chainId);
    //     if (targetChainId !== chainId) {
    //       // 네트워크 추가하는 코드
    //       addNetwork(targetChainId);
    //     }

    //     const [accounts] = await getRequestAccounts();

    //     // web3 라이브러리를 메타마스크에 연결 (맵핑)
    //     // const web3 = new Web3(window.ethereum);
    //     setAccounts(accounts);
    //     // setWeb3(web3);
    //   } catch (e) {
    //     console.error(e.message);
    //   }
    // };

    // if (window.ethereum) {
    //   // 메타마스크 설치된 클라이언트
    //   window.ethereum.request();

    //   init();
    // }

    // const Txsend = await window.ethereum.request({});
  };

  // useEffect =
  //   (() => {
  //     disconnect();
  //   },
  //   []);

  return (
    <MainbarComponent
      getChainId={getChainId}
      isConnect={isConnect}
      getRequestAccounts={getRequestAccounts}
      accounts={accounts}
      Balance={Balance}
      sendTransaction={sendTransaction}
    ></MainbarComponent>
  );
};

export default MainbarContainer;
